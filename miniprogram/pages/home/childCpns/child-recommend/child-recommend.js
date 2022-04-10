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
        bgcolor: "#FFAC53"
      }, {
        image:
          "/assets/mode/mode_chat.png",
        name: "闲聊",
        bgcolor: "#8260FC"
      }, {
        image:
          "/assets/mode/mode_found.png",
        name: "失物招领",
        bgcolor: "#EA2272"
      },
      {
        image: "/assets/mode/mode_buy.png",
        name: "闲置买卖",
        bgcolor: "#01E493"
      },
      {
        image:
          "/assets/mode/mode_more.png",
        name: "更多",
        bgcolor: "#079BFB"
      }
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handlejob() {
      wx.navigateTo({
        url: '/pages/home/navto/rec-job/rec-job',
      })
    }
  }
})
