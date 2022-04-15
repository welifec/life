// pages/home/navto/rec-chat/rec-chat.js
Page({

  data: {
    list: [],
  },
  onShow() { this.onhandle() },
  onLoad() { this.onhandle() },
  // 通过云函数遍历集合getLsot
  onhandle() {
    wx.cloud.callFunction({
      name: 'getChat',
    }).then(res => {
      this.setData({
        list: res.result
      })
    })
  },
  onPullDownRefresh() {
    wx.cloud.callFunction({
      name: 'getChat',
    }).then(res => {
      this.setData({
        list: res.result
      })
      this.handlePullRefresh()
    })
  },
  handlePullRefresh() {
    wx.stopPullDownRefresh({
      success: (res) => {
        wx.showToast({
          title: '刷新成功',
          duration: 3000,
          icon: "none"
        })
      },
    })
  },
  fabutton() {
    const userInfoisFlag = wx.getStorageSync('userInfoisFlag')
    if (userInfoisFlag === true) {
      wx.navigateTo({
        url: '/pages/home/navto/rec-chat/chat-push/chat-push',
      })
    } else {
      wx.showToast({
        title: "请授权登录账号",
        duration: 3000,
        icon: 'none',
        mask: false
      })
    }
  }
})