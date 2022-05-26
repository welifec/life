// pages/relation/relation.js
// const cloud = require('lifec-4gd9vflq226e701d');
const db = wx.cloud.database();
Page({

  onLoad() {

  },
  data: {
    list: []
  },
  addFriends() {
    wx.navigateTo({
      url: '/pages/relation/addfriends/addfriends',
    }),
      wx.showToast({
        title: '点击了',
      })
  },
  relationInput(event) {
    this.setData({
      content: event.detail.value
    })
    console.log(event.detail.value);
  },
  relationSend() {
    wx.showToast({
      title: '点击了',
    })
    let list = this.data.list;
    let info = [];
    info.push(this.data.content)
    list.push({ time: "12123", id: "525", info: info });
    this.setData({
      list: list,
      // 'list.content': this.data.list
    })
    // db.collection('demo').add({
    //   data:{
    //     info:[]
    //   }
    // })
    wx.setStorageSync("content", this.data.content);

  }
})