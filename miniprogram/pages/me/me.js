// pages/me/me.js
const app = getApp()
Page({
  data: {
    openid: '',
    isflag: false,
    userInfo: [],
    lg: ''
  },
  onLoad() {
    console.log("onShow");
    wx.setStorageSync("lg", this.data.lg);
    if (this.data.lg > 0) {
      this.setData({
        // this.data.isflag: true
        lg: 1000
      })

      // wx.setStorageSync("isflag", this.data.isflag);
      console.log("存在用户:", this.data.isflag);
    } else {
      // wx.setStorageSync("isflag", this.data.isflag);
      console.log("不存在用户:", this.data.isflag);
    }
  },
  handleLogin() {
    wx.getUserProfile({
      desc: '请求权限',
      success: (res) => {
        // console.log(res.userInfo.nickName.length);
        this.setData({
          userInfo: res.userInfo,
          lg: res.userInfo.nickName.length
        })
        // this.onLoad()
      }
    })
  },
  getopenid() {
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log('云函数获取到的openid:', res.result.openid)
        var openid = res.result.openid;
        that.setData({
          openid: openid
        })
      }
    })
  },
  get() {
    var num = 5;
    wx.setStorageSync("num", num);
  }
})