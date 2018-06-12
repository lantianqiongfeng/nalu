//index.js
//获取应用实例
const app = getApp();
var network = require('../../utils/network.js');
var Util = require('../../utils/util.js');  
Page({
  data: {
    title:"雨伞",
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    imagewidth: 0,//缩放后的宽  
    imageheight: 0,//缩放后的高  
    imagefirstsrc:'../../images/index_bg.jpg',//背景图片地址
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../main/main?id=1234567&from=index'
      //url: '../share/share'
    })
  },
  imageLoad: function (e) {
    var imageSize = Util.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })  
  },
  autoToMain: () => {
    setTimeout(() => {
      var curPage = Util.getCurrentPageUrl();
      if (curPage == "pages/index/index") {
        wx.navigateTo({
          url: '../../pages/main/main'
          //url: '../share/share'
        })
      }
    }, 3000);
  } ,
  onLoad: function () {
    var that =this;
    network.GetUserInfo({
      success: function (res) {
        that.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        });
        that.autoToMain();
      }
    })
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
  
  
})
