// components/news_tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      value: 0,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    news: ['通知公告','媒体视角','江科要闻','江科动态'],
    indexChecked: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 传递方法和数据到news页面
    textControl(e){
      const index = e.currentTarget.dataset.index;
      this.triggerEvent('textControl',{index},{}),
      this.setData({
        indexChecked: index
      })
    }
  },
})
