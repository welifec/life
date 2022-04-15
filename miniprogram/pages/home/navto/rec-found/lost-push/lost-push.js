Page({
  data: {

    list:
    {
      images: ['/assets/nav_to/found-push.png'],
      title: '',
      place: '',
      time: '',
      phone: '',
      money: '',
      createTime: '',
      mold: '',
      des: '',
    }

  },
  // wx.cloud.uploadFile({
  //   cloudPath: "photo/" + Date.now() + ".jpg",
  //   filePath: this.data.list[0].images[0]
  // }).then(res => {
  //   console.log(res);
  // })
  _handlePush() {
    const that = this
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    // 设置时间戳，时间格式
    let pages = getCurrentPages().length - 2;
    const openid = wx.getStorageSync('openid');
    that.setData({
      'list.createTime': that._handleTime(timestamp)
    })
    const db = wx.cloud.database({
      env: 'lifec-4gd9vflq226e701d'
    })
    const _ = db.command
    // 判断是否处于登陆状态，数据库是否完整
    if (openid.length > 0) {
      db.collection('lost').where({
        _id: openid
      }).get({
        success(res) {
          console.log(res);
          // 判断数据库是否有集合，否则添加一个id
          if (res.data.length > 0) {
            db.collection('lost').doc(openid).update({
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
            db.collection('lost').add({
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
  upload() {
    let that = this
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        let i = that.data.list.length - 1
        that.setData({
          'list.images':
            // 'list.images':
            res.tempFilePaths
        })
      }
    })
  },

  _inputTitle(e) {
    let i = this.data.list.length - 1
    this.setData({
      'list.title': e.detail.value
    })
  },
  _inputMold(e) {
    let i = this.data.list.length - 1
    this.setData({
      'list.mold': e.detail.value
    })
  },
  _inputTime(e) {
    let i = this.data.list.length - 1
    console.log(typeof e.detail.value);
    this.setData({
      'list.time': e.detail.value

    })
  },
  _handleDes(e) {
    let i = this.data.list.length - 1
    this.setData({
      'list.des': e.detail.value
    })
  },
  _inputPlace(e) {
    let i = this.data.list.length - 1
    this.setData({
      'list.place': e.detail.value
    })
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