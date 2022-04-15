// pages/home/childCpns/recommend/recommend.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    imagePath: [
      {
        image: "/assets/mode/mode_job.png",
        name: "兼职",
        bgcolor: "#FFAC53",
        url: "/pages/home/navto/rec-job/rec-job"
      }, {
        image:
          "/assets/mode/mode_chat.png",
        name: "闲聊",
        bgcolor: "#8260FC",
        url: "/pages/home/navto/rec-chat/rec-chat"
      }, {
        image:
          "/assets/mode/mode_found.png",
        name: "失物招领",
        bgcolor: "#EA2272",
        url: "/pages/home/navto/rec-found/rec-found"
      },
      {
        image: "/assets/mode/mode_buy.png",
        name: "闲置买卖",
        bgcolor: "#01E493",
        url: "/pages/home/navto/rec-buy/rec-buy"
      },
      {
        image:
          "/assets/mode/mode_more.png",
        name: "更多",
        bgcolor: "#079BFB",
        url: ""
      }
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handlejob(e) {
      var url = e.currentTarget.dataset.bean.url;
      wx.navigateTo({
        url: url
      })
    }
  }
})
