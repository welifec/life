// pages/me/me.js
const app = getApp()
Page({
  data: {
    openid: '',
    userInfoisFlag: false,
    userInfo: [],
    lg: '',
    collections: 'demo',
    name: '',
    imageURL: '',
  },
  onLoad() {
    // let s = wx.getStorageSync('userInfoisFlag');
    let that = this;
    const _userInfoisFlag = wx.getStorageSync('userInfoisFlag')
    const _openid = wx.getStorageSync('openid')
    console.log("_openid", _openid);
    console.log("_userInfoisFlag", _userInfoisFlag);
    if (_userInfoisFlag === true) {
      console.log("onLoad");
      const db = wx.cloud.database({
        env: 'lifec-4gd9vflq226e701d'
      })
      db.collection(this.data.collections).doc(_openid).get({
        success(res) {
          console.log(res);
          console.log(res.data.userInfoisFlag);
          that.setData({
            userInfoisFlag: res.data.userInfoisFlag,
            name: res.data.name,
            imageURL: res.data.imageURL
          })
        }
      })
    } else {
      that.setData({
        userInfoisFlag: false
      })
    }
  },
  // 登陆按钮：登陆成功获取openid写入数据库
  handleLogin() {
    var that = this;
    wx.getUserProfile({
      desc: '请求权限',
      success: (res) => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          lg: res.userInfo.nickName.length,
          name: res.userInfo.nickName,
          imageURL: res.userInfo.avatarUrl,
          userInfoisFlag: true
        })
        wx.setStorageSync("userInfoisFlag", this.data.userInfoisFlag);
        // 调用全局方法获取openid,数据库
        app.getopenid(that)
      },
      fail: (err) => {
        console.log("err----------", err);
      }
    })
  },
})