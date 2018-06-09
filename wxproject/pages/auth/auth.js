const app = getApp();
Page({
  data:{
  },
  onLoad:function(options){
    console.log("app.globalData");
    console.log(app.globalData);
  },
  onGetUserinfo: function (e) {
    var transferUrl = '../../pages/index/index';
    console.log("app.globalData.authReferURL:"+app.globalData.authReferURL);
    if (app.globalData.authReferURL && app.globalData.authReferURL != '' && app.globalData.authReferURL!=undefined){
      transferUrl = '../../'+app.globalData.authReferURL;
    }
    app.globalData.authReferURL='';
    console.log('transferUrl:'+transferUrl);
    wx.navigateTo({
      url: transferUrl
    });
  },
})