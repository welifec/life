// app.js
import request from './service/network.js'
App({
  data: {

    openid: '',
    isflag: false,
    userInfo: [],
    lg: '',
    checkLogin: false

  }, 
   globalData: {
    notice: [],
    media:[],
    news:[],
    dynamic:[],
  },
  // 云函数环境
  onLaunch: function () {
    let that = this;
    request({
      url: 'http://114.132.247.227/notice.json',
    }).then(res => {
      that.globalData.notice = res.data.notice;
      that.globalData.media = res.data.media;
      that.globalData.news = res.data.news;
      that.globalData.dynamic = res.data.dynamic;
      // console.log(that.globalData.home_list);
    }).catch(err => {
      console.log(err,'获取接口错误');
    })
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: "lifec-4gd9vflq226e701d",//这个就是环境id
        traceUser: true,
      })
    }
  },
  // 获取openid
  getopenid: function (that) {
    const openid = that.data.openid //获取openid默认值
    const collections = that.data.collections
    const name = that.data.name
    const imageURL = that.data.imageURL
    const userInfoisFlag = that.data.userInfoisFlag
    wx.cloud.callFunction({
      name: 'getOpenid',
    }).then(res => {
      that.setData({
        openid: res.result.openid
      })
      wx.setStorageSync("openid", that.data.openid);
      // 调用数据库
      this.getdatabase(collections, that.data.openid, userInfoisFlag, name, imageURL)//接收赋值的openid
      console.log(that.data.openid);
    })
  },
  // 登陆成功，查询数据库是否存在openid
  getdatabase(collections, openid, userInfoisFlag, name, imageURL) {
    const db = wx.cloud.database({
      env: 'lifec-4gd9vflq226e701d'
    })
    const _ = db.command
    db.collection(collections).where({
      _id: openid
    }).get({
      success(res) {
        // console.log(res.data.length);
        if (res.data.length > 0) {
          console.log("存在");
          db.collection(collections).doc(openid).get({
            success(res) {
              console.log(res.data.userInfoisFlag);
              this.setData({
                userInfoisFlag: res.data.userInfoisFlag
              })
            }
          })
        } else {
          console.log("不存在");
          db.collection(collections).add({
            data: {
              _id: openid,
              userInfoisFlag: true,
              name: name,
              imageURL: imageURL
            },
            success(res) {
              console.log(res);
            }
          })
        }
      },
    })
  },
})
