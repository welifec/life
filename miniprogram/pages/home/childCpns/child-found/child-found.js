// pages/home/childCpns/child-found/child-found.js
Component({
  properties: {
  },
  data: {
    navState: 0,
    swiperHeight: 0
  },
  lifetimes: {
    attached() {
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
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
  }
})
