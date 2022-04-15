// pages/home/navto/rec-job/job-Push/job-push.js
Page({
  data: {
    list:
    {
      title: '',
      place: '',
      time: '',
      des: '',
      createTime: ''
    }
  },
  _inputMoney(e) {
    const that = this
    that.setData({
      'list.money': e.detail.value,
    })
  },
  _inputPhone(e) {
    const that = this
    that.setData({
      'list.phone': e.detail.value,
    })
  },
  _inputTime(e) {
    const that = this
    that.setData({
      'list.time': e.detail.value,
    })
  },
  _inputPlace(e) {
    const that = this
    that.setData({
      'list.place': e.detail.value,
    })
  },
  _inputTitle(e) {
    const that = this
    that.setData({
      'list.title': e.detail.value,
    })
  },
  _handlePush() {
    const that = this
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    let pages = getCurrentPages().length - 2;
    const openid = wx.getStorageSync('openid');
    that.setData({
      'list.createTime': that._handleTime(timestamp)
    })
    const db = wx.cloud.database({
      env: 'lifec-4gd9vflq226e701d'
    })
    const _ = db.command
    if (openid.length > 0) {
      db.collection('job').where({
        _id: openid
      }).get({
        success(res) {
          if (res.data.length > 0) {
            db.collection('job').doc(openid).update({
              data: {
                list: _.unshift(that.data.list)
              },
              success(res) {
                wx.navigateBack({
                  delta: pages,
                })
                wx.showToast({
                  title: "发布成功",
                  duration: 3000,
                  icon: 'none',
                  mask: false,
                })

              }
            })
          } else {
            db.collection('job').add({
              data: {
                _id: openid,
                list: [that.data.list]
              }
            }).then(res => {
              wx.navigateBack({
                delta: pages,
              })
              wx.showToast({
                title: "发布成功",
                duration: 3000,
                icon: 'none',
                mask: false,
              })
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: "登陆异常，请重新登陆",
        duration: 3000,
        icon: 'none',
        mask: false
      })
    }
  },

  _handleTime: function (timestamp) {

    //获取当前时间  
    var n = timestamp * 1000;
    var date = new Date(n);
    //年  
    var Y = date.getFullYear();
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //时  
    var h = date.getHours();
    //分  
    var m = date.getMinutes();
    //秒  
    var s = date.getSeconds();

    console.log("当前时间：" + Y + '/' + M + '/' + D + ' ' + h + ":" + m + ":" + s);
    return Y + '/' + M + '/' + D + ' ' + h + ":" + m + ":" + s
  },
})