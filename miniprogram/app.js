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
  onLaunch: function () {
    let that = this;
    request({
      url: 'https://api.jisuapi.com/news/get?channel=头条&start=0&num=10&appkey=9c4a04ec045a9a3c',
    }).then(res => {
      // console.log(res);
      that.globalData.home_list = res.data.result.list;
      // console.log(that.globalData.home_list);
    }).catch(err => {
      console.log(err);
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
  onShow() {
    console.log("lg----", this.data.lg);
    // this.getLogin()
    console.log("APP  onShow");
  },
  getLogin() {
    var boxList = wx.getStorageSync("lg");
    var isflag = wx.getStorageSync("isflag");
    console.log("app numb", boxList);
    if (boxList > 0) {
      this.setData({
        isflag: true
      })
      console.log("app存在用户:", this.data.isflag);
    } else {
      console.log("app不存在用户:", this.data.isflag);
    }
  },
  globalData: {
    home_list: [],
  }
})
