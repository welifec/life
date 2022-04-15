// pages/home/childCpns/child-schollcard/child-schollcard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTo(e) {
      wx.navigateTo({
        url: '/pages/home/navto/web-view/web-view',
      })
    },
    handleTo2(e) {
      wx.navigateTo({
        url: '/pages/home/navto/web-view2/web-view2',
      })
    }
  }
})
