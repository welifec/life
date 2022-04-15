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
    triggered: false
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
  async onRefresh() {
    let that = this
    await this.setData({
      triggered: true,//测试下拉triggered不会自动变为true，需要强制设置一下，不然下面复位无效，真神奇
    })
    setTimeout(function () {

      that.setData({
        triggered: false,//1.5秒后复位
      })
    }, 1500);
  },
  onPullDownRefresh() {
    wx.cloud.callFunction({
      name: 'getLost',
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
        name: 'getLost',
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
