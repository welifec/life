// pages/news/news.js
import request from '../../service/network.js'
Page({
  data: {
    indexChecked: 0,
    notice: [],
    media:[],
    news:[],
    dynamic:[],
    test: false,
  },
  handleText(e) {
    //传递对应下标到tab里操作
    const index = e.detail.index;
    this.setData({
      indexChecked: index,
      
    })
  },
  onLoad: function() {
    request({
      url: 'http://114.132.247.227/notice.json',
    }).then(res => {
      this.setData({
        notice: res.data.notice,
        media: res.data.media,
        news: res.data.news,
        dynamic: res.data.dynamic,
      })
    })
    // console.log(list); 
    //判断是用户是否绑定了
  }

})