export default function request(options) {
  return new Promise((resolve,reject)=>{
    wx.request({
      url: options.url,
      success:resolve,
      fail:reject,
    })
  })
}