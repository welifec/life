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

  // 通过云函数遍历集合getLsot
  onhandle() {
    wx.cloud.callFunction({
      name: 'getFound',
    }).then(res => {
      this.setData({
        list: res.result
      })
    })
  },

  // 点击发布按钮，判断账号是否登陆
  handlePush() {
    // console.log("handlePush");
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
  // fab悬浮按钮判断根据当前跳转相应页面页面
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
  // 监听点击tabbar
  navSwitch(e) {
    // console.log(e.currentTarget.dataset.index)
    let index = e.currentTarget.dataset.index;
    this.setData({
      navState: index
    })
  },
  //监听滑块
  bindchange(e) {
    // console.log(e.detail.current)
    let index = e.detail.current;
    this.setData({
      navState: index
    })
  },
  // 自适应Swiper高度
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