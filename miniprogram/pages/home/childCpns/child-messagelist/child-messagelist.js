// pages/home/childCpns/child-messagelist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    media:{
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    index: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleJump(e){
      //传递参数到新开页面
      const index = e.currentTarget.dataset.index;
      wx.navigateTo({
        url: '/pages/news/news_page/news_page?index='+ index + '&num=' + 2,
      })
    },
  }
})
