// pages/home/navto/rec-job/rec-job.js
const app = getApp()
Page({
  data: {
    list: [],
  },
  onLoad() {
    this.onhandle()
  },
  onShow() {
    this.onhandle()
  },

  handlePush() {
    console.log("handlePush");
    const userInfoisFlag = wx.getStorageSync('userInfoisFlag')
    if (userInfoisFlag === true) {
      wx.navigateTo({
        url: '/pages/home/navto/rec-job/job-push/job-push',
      })
    } else {
      wx.showToast({
        title: "请授权登录账号",
        duration: 3000,
        icon: 'none',
        mask: false
      })
    }
  },
  //获取数据库所有数据
  onhandle() {
    wx.cloud.callFunction({
      name: 'getAll',
    }).then(res => {
      this.setData({
        list: res.result
      })
    })
  },
  onPullDownRefresh() {
    wx.cloud.callFunction({
      name: 'getAll',
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
  }
})