// pages/home/navto/rec-chat/chat-push/chat-push.js
Page({

  data: {
    collections: 'chat',
    list:
    {
      name: '',
      time: '',
      headimage: '',
      imageList: ['/assets/nav_to/found-push.png'],
      text: ''
    }

  },
  handleImage() {
    const that = this
    let detailPics = []
    //声明this，这里面嵌套的太多，里面拿不到this
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        var imgs = res.tempFilePaths;
        let i = that.data.list.length - 1
        that.setData({
          'list.imageList':
            // ['list[' + i + '].imageList']:
            res.tempFilePaths
        })
      }
    })
  },
  /**上传 */
  //多张图片上传
  upLode: function () {
    wx.showLoading({
      title: '上传中...',
      mask: true,
    })
    for (let i = 0; i < this.data.list.imageList.length; i++) {
      wx.cloud.uploadFile({
        cloudPath: 'manage/record/' + i + '.png', // 上传至云端的路径
        filePath: this.data.list.imageList[i], // 小程序临时文件路径
        success: res => {
          console.log("上传成功" + res.fileID)
        },
        fail: console.error
      })
    }
    wx.hideLoading()
  },


  handleInput(e) {
    console.log(e.detail.value);
    const that = this
    that.setData({
      'list.text': e.detail.value
    })
  },
  handlePush() {
    const that = this
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    // 设置时间戳，时间格式
    let pages = getCurrentPages().length - 2;
    const openid = wx.getStorageSync('openid');
    that.setData({
      'list.time': that._handleTime(timestamp)
    })
    const db = wx.cloud.database({
      env: 'lifec-4gd9vflq226e701d'
    })
    const _ = db.command
    // 判断是否处于登陆状态，数据库是否完整
    if (openid.length > 0) {
      db.collection('login').doc(openid).get({
        success(res) {
          wx.setStorageSync('name', res.data.name)
          wx.setStorageSync('headimage', res.data.imageURL)
          let name = wx.getStorageSync('name')
          let headimage = wx.getStorageSync('headimage')
          that.setData({
            'list.name': name,
            'list.headimage': headimage,
          })
        }
      })
      db.collection("chat").where({
        _id: openid
      }).get({
        success(res) {
          console.log(res);
          for (let i = 0; i < this.data.list.imageList.length; i++) {
            wx.cloud.uploadFile({
              cloudPath: 'manage/record/' + i + '.png', // 上传至云端的路径
              filePath: this.data.list[0].imageList[i], // 小程序临时文件路径
              success: res => {
                console.log("上传成功" + res.fileID)
              },
              fail: console.error
            })
          }
          // 判断数据库是否有集合，否则添加一个id
          if (res.data.length > 0) {
            db.collection("chat").doc(openid).update({
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
            db.collection("chat").add({
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