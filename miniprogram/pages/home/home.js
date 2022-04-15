// pages/home/home.js
import request from '../../service/network.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    media: [],
    indexChecked: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    request({
      url: 'http://114.132.247.227/notice.json',
    }).then(res => {
      this.setData({
        media: res.data.media,
      })
    })
  },
})