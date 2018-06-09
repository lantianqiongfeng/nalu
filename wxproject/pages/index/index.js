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
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
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
      console.log(curPage);
      if (curPage == "pages/index/index") {
        wx.navigateTo({
          url: '../main/main?id=1234567&from=index'
          //url: '../share/share'
        })
      }
    }, 3000);
  } ,
  onLoad: function () {
    console.log(app.globalData.userInfo);
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
      this.autoToMain();
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      console.log("this.data.canIUse");
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
        this.autoToMain();
      }
    } else {
      console.log("else");
      console.log(app.globalData.userInfo);
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        },
        fail:err=>{
          console.log(err);
          wx.navigateTo({
            url: '../../pages/auth/auth'
          });
        }
      })
    }
    
    //network.GetACode();
    //this.getInitData("asdfasdf");
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getInitData:function(p){
    console.log(p);
    var that = this;
    network.UploadLocalImage();
      
    network.POST({
      url: 'Lib2/TK/testpost',
      data: { CustomerNo: 'cus1234' },
      success: function (res) {
        console.log(res);
        that.setData({
          motto: res.data
        });
        console.log("成功了");
      },
      fail: function (err) {
        //失败后的逻辑  
        console.log(err);
        console.log("失败了");
      },
    })  


    
    network.GET({
      url: 'Lib1/test/SayHello',
        data: {s:p},
        success: function (res) {
          console.log(res);
          that.setData({
            motto: res.data
          });
          console.log("成功了");
        },
        fail: function (err) {
          //失败后的逻辑  
          console.log(err);
          console.log("失败了");
        },
    });  
  }
  
})
