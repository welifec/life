Page({

  data: {
    list: [],
    navState: 0,
    swiperHeight: 0
  },
  onLoad() {
    this.getSwiperHeight()
    this.onhandle()
  },
  onShow() {
    console.log(this.data.list);
    this.onhandle()
  },
  onhandle() {
    wx.cloud.callFunction({
      name: 'getFound',
    }).then(res => {
      this.setData({
        list: res.result
      })
    })
  },
  onPullDownRefresh() {
    wx.cloud.callFunction({
      name: 'getFound',
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

  handlePush() {
    console.log("handlePush");
    const userInfoisFlag = wx.getStorageSync('userInfoisFlag')
    if (userInfoisFlag === true) {
      this.fabutton()
    } else {
      wx.showToast({
        title: "请授权登录账号",
        duration: 3000,
        icon: 'none',
        mask: false
      })
    }
  },


  fabutton(e) {
    if (e.currentTarget.dataset.index == 0) {
      wx.navigateTo({
        url: "/pages/home/navto/rec-found/found-push/found-push"
      })
    } else {
      wx.navigateTo({
        url: "/pages/home/navto/rec-found/lost-push/lost-push"
      })
    }
  },
  navSwitch(e) {
    // console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index;
    this.setData({
      navState: index
    })
  }, //监听滑块
  bindchange(e) {
    // console.log(e.detail.current)
    let index = e.detail.current;
    this.setData({
      navState: index
    })
  },
  getSwiperHeight() {
    let that = this;//将this另存为
    wx.getSystemInfo({
      success(res) {
        let clientHeight = res.windowHeight
        let clientWidth = res.windowWidth
        let ratio = 750 / clientWidth;//计算为百分比
        let rpxHeight = ratio * clientHeight
        that.setData({
          swiperHeight: rpxHeight//将计算好的高度给定义好的值
        })
      }
    })
  }
})