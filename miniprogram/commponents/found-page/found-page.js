// commponents/lost-page/lost-page.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    }
  },
  data: {
  },
  lifetimes: {
    created() {
      this.onhandle()
    },

  },
  pageLifetimes: {
    show() {
      this.onhandle()
    },
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
  methods: {
    onhandle() {
      wx.cloud.callFunction({
        name: 'getFound',
      }).then(res => {
        this.setData({
          list: res.result
        })
      })
    },
    // 刷新监听事件
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
    // 刷新事件提示
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
  }
})
