//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      '/images/main0.jpg',
      '/images/main0.jpg',
      '/images/main0.jpg',
      '/images/main0.jpg',
      '/images/main0.jpg'
    ]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    wx.setNavigationBarTitle({
      title: "伞详情页",
      success: function (res) {
        // success
      }
    })
  },
  

})
