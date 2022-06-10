// pages/friends/friends.js

Page({
  data: {
    list: []
  },
  onLoad() {
    this.friendsList();
  },
  tapfriendsList(e) {
    console.log(e);
    console.log(e.currentTarget.dataset.userImage);
    wx.navigateTo({
      url: '/pages/relation/relation?username=' + e.currentTarget.dataset.name + "&userid=" + e.currentTarget.dataset.userid + "&userimage=" + e.currentTarget.dataset.userimage,
    })
  },
  friendsList() {
    const that = this
    const db = wx.cloud.database({
      env: 'lifec-4gd9vflq226e701d'
    })
    db.collection('login').get({
      success(res) {
        for (let i = 0; i < res.data.length; i++) {
          const name = res.data[i].name;
          const _openid = res.data[i]._openid;
          const imageURL = res.data[i].imageURL;
          let list = that.data.list.push({ name: name, imageURL: imageURL, _openid: _openid })
          that.setData({
            list: that.data.list
          })
        }
      }
    })
  }

})