const openid = wx.getStorageSync('openid');
const imageURL = wx.getStorageSync('imageURL');
const db = wx.cloud.database({
  env: 'lifec-4gd9vflq226e701d'
})
Page({
  data: {
    scrollTop: 0,
    scrollBottom: "",
    input: "",
    username: "",
    userid: "",
    records: [],
    inputData: "",
    openid: "",
    imageURL: "",
    name: "王力宏",
    records: []
  },
  onShow() {
    this.showChat()
  },
  // onChange(e) {
  //   const that = this
  //   console.log("e", e);
  //   if (e.type == "init") {
  //     that.initchats(e.docs[0].records)
  //   } else {
  //     let i = that.data.records.length
  //     const news_chats = [...that.data.records]
  //     if (e.docs.length) {
  //       news_chats.push(e.docs[0].records[i])
  //       that.setData({
  //         records: news_chats
  //       })
  //     }
  //   }

  // },
  onReady() {
    // const that = this
    // db.collection('chatroom').where({
    //   openid: that.data.openid
    // }).watch({
    //   onChange: this.onChange.bind(this),
    //   onError(err) {
    //     console.log(err);
    //   }
    // })
  },
  onLoad(options) {
    this.showChat()
    console.log(options);
    this.setData({
      username: options.username,
      userid: options.userid,
      userimage: options.userimage,
      openid: openid,
      imageURL: imageURL
    })
  },
  // 点击发送按钮
  relationSend() {
    const that = this
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    if (that.data.input.length > 0) {
      const _ = db.command;
      let doc = {};
      doc.imageURL = that.data.imageURL;
      doc.name = that.data.name;
      doc.username = that.data.username;
      doc.openid = that.data.openid;
      doc.sendTime = that._handleTime(timestamp);
      doc.input = that.data.input;
      doc.userimage = that.data.userimage;
      doc.status = false
      let records = that.data.records;
      records.push(doc);
      db.collection('chatroom').doc(openid).update({
        data: {
          records: that.data.records
        },
        success(res) {
          that.showChat(),
            that.addList()
        }
      })
      that.setData({
        inputData: ""
      })
    }

    // db.collection('chatroom').add({
    //   data: {
    //     _id: openid,
    //     name: that.data.name,
    //     username: that.data.username,
    //     userid: that.data.userid,
    //     records: that.data.records
    //   }
    // })
  },
  // 输入框文字
  relationInput(event) {
    this.setData({
      input: event.detail.value
    })
  },
  showChat() {
    // 通过云函数遍历集合getInfo
    const db = wx.cloud.database({
      env: 'lifec-4gd9vflq226e701d'
    })
    const that = this;
    const _ = db.command;
    db.collection('chatroom').doc(openid).get({
      success(res) {
        console.log("res", res.data.records);
        that.setData({
          records: res.data.records
        })
      }
    })
  },

  _handleTime: function (timestamp) {

    //获取当前时间  
    var n = timestamp * 1000;
    var date = new Date(n);
    //年  
    var Y = date.getFullYear();
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //时  
    var h = date.getHours();
    //分  
    var m = date.getMinutes();
    //秒  
    var s = date.getSeconds();

    console.log("当前时间：" + Y + '/' + M + '/' + D + ' ' + h + ":" + m + ":" + s);
    return Y + '/' + M + '/' + D + ' ' + h + ":" + m + ":" + s
  },

})