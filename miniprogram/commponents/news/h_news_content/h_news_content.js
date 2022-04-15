// components/news_content/news_content.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      value: 0
    },
    notice:{
      type: Array,
      value: [],
    },
    media:{
      type: Array,
      value: [],
    },
    news:{
      type: Array,
      value: [],
    },
    dynamic:{
      type: Array,
      value: [],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imageNotice: '/assets/news/news_notice.png',
    imageMedia:'/assets/news/news_media.png',
    imageImpotents: '/assets/news/news_impotent.png',
    imageDynamic:'/assets/news/news_dynamic.png',
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
        url: '/pages/news/news_page/news_page?index='+ index + '&num=' + 1,
      })
    },
    handleJump1(e){
      //传递参数到新开页面
      const index = e.currentTarget.dataset.index;
      wx.navigateTo({
        url: '/pages/news/news_page/news_page?index='+ index + '&num=' + 2,
      })
    },
    handleJump2(e){
      //传递参数到新开页面
      const index = e.currentTarget.dataset.index;
      wx.navigateTo({
        url: '/pages/news/news_page/news_page?index='+ index + '&num=' + 3,
      })
    },
    handleJump3(e){
      //传递参数到新开页面
      const index = e.currentTarget.dataset.index;
      wx.navigateTo({
        url: '/pages/news/news_page/news_page?index='+ index + '&num=' + 4,
      })
    }
  },
})
