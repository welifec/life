// pages/news_page/news_page.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //控制新开页面显示的网页链接
    let index = options.index;
    let app = getApp();
    if(options.num == 1){
      this.setData({
        url: app.globalData.notice[index].url
      })
    }
    if(options.num == 2){
      this.setData({
        url: app.globalData.media[index].url
      })
    }
    if(options.num == 3){
      this.setData({
        url: app.globalData.news[index].url
      })
    }
    if(options.num == 4){
      this.setData({
        url: app.globalData.dynamic[index].url
      })
    }
  },
})