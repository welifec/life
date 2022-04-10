// components/news_content/news_content.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      value: 0
    },
    my_list:{
      type: Array,
      value: [],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imageNotice: '/assets/news/news_notice.png',
    imageSchool:'/assets/news/news_school.png',
    imageImpotents: '/assets/news/news_impotent.png',
    imageDynamic:'/assets/news/news_dynamic.png',
    index: 0,
    textSchool:[
      {
        text_school: '【疫情防控】我校医学院学子 我年轻，我是党员，我上！',
        textTime: '2021年4月01日 医学院',
      },
      {
        text_school: '【疫情防控】我校音乐舞蹈学院师生创作舞蹈作品......',
        textTime: '2021年4月01日 音乐舞蹈学院',
      },
      {
        text_school: '信息工程学院教师参加第三届中国计算机教育大会',
        textTime: '2021年3月31日 信息工程学院',
      },
    ],
    textImpotents:[
      {
        text_impotents:'【疫情防控】新冠肺炎疫情防控&新冠疫苗接种科普知识',
        textTime:'2021年4月01日 医学院',
      },
      {
        text_impotents:'【疫情防控】感谢有你 | 学校开展第四轮全员核酸检测',
        textTime:'2021年4月02日 医学院',
      },
      {
        text_impotents:'【疫情防控】学校召开疫情防控工作专题会议',
        textTime:'2021年4月03日 医学院',
      },
    ],
    textDynamic:[
      {
        text_dynamic:'信息工程学院教师参加第三届中国计算机教育大会',
        textTime:'2022年03月27日',
      },
      {
        text_dynamic:'我校教师执裁2022北京冬奥会，贡献江科力量',
        textTime:'2022年03月29日',
      },
      {
        text_dynamic:'理学部开展作风建设学习会',
        textTime:'2022年03月11日',
      },
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleJump(e){
      //传递参数到新开页面
      const index = e.currentTarget.dataset.index;
      wx.navigateTo({
        url: '/pages/news_page/news_page?index='+ index,
      })
    }
  },
})
