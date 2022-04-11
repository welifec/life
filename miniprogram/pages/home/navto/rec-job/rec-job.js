// pages/home/navto/rec-job/rec-job.js
const app = getApp()
Page({
  data: {
    imagePath: [],
    openid: '',
    list: [],
  },
  onLoad() {
    // this.handlelogin()
  },

  handlelogin() {
    let that = this;
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log('云函数获取到的openid:', res.result.openid)
        var openid = res.result.openid;
        that.setData({
          openid: openid
        })
      }
    })
  },
  handleadd() {
    const db = wx.cloud.database({
      env: 'lifec-4gd9vflq226e701d'
    })
    console.log("----", db);
    // const _ = db.command
    // const openid = this.data.openid
    // console.log(openid);
    // db.collection('demo').where({
    //   _id: openid
    // }).get({
    //   success(res) {
    //     console.log("---------", res.data.length);
    //     if (res.data.length > 0) {
    //       db.collection('demo').doc(openid).update({
    //         data: {
    //           list: _.push({ name: "bljboy", age: 18 })
    //         }
    //       })
    //     } else {
    //       console.log("无openid");
    //       db.collection('demo').add({
    //         data: {
    //           _id: openid,
    //           list: [{
    //             name: 'bljboy',
    //             age: 18
    //           }]
    //         },
    //         success(res) {
    //           console.log(res);
    //         }
    //       })
    //     }
    //   }
    // })
  },
  handlebt() {
    const openid = this.data.openid;
    console.log(openid);
    const db = wx.cloud.database({
      env: 'lifec-4gd9vflq226e701d'
    })

    db.collection('demo').doc(openid).get({
      success: (res) => {
        console.log(res);
        console.log(res.data.list);
        this.setData({
          list: res.data.list
        })
      },
    })
  },
  handle() {
    // console.log("点击");
    wx.cloud.callFunction({
      name: 'getAll',
    }).then(res => {
      console.log("---", res.result);
    })
    const db = wx.cloud.database({
      env: 'lifec-4gd9vflq226e701d'
    })
    db.collection('demo').get({
      success(res) {
        console.log(res);
      }
    })
  }
})