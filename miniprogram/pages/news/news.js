// pages/news/news.js
import request from '../../service/network.js'
Page({
  data: {
    indexChecked: 0,
    home_list: [],
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
      url: 'https://api.jisuapi.com/news/get?channel=头条&start=0&num=10&appkey=0a5c7b435f098f99',
    }).then(res => {
      this.setData({
        home_list: res.data.result.list
      })
    })
    // console.log(list); 
    //判断是用户是否绑定了
  }

})