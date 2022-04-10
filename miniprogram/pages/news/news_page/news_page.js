// pages/news_page/news_page.js
import request from '../../../service/network.js'
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
    console.log(options);
    let index = options.index;
    request({
      url: 'https://api.jisuapi.com/news/get?channel=头条&start=0&num=10&appkey=9c4a04ec045a9a3c',
    }).then(res => {
      console.log(res);
      this.setData({
        url: res.data.result.list[index].weburl,
      })
    })  
  },
})