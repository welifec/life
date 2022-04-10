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
    this.setData({
      url: app.globalData.home_list[index].url,
    })   
  },
})