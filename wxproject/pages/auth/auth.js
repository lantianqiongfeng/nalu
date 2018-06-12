const app = getApp();
var network = require('../../utils/network.js');
var util = require('../../utils/util.js'); 
Page({
  data:{
  },
  onLoad:function(options){
  },
  onGetUserinfo: function (e) {
    var curUrl = util.getCurrentPageUrlWithArgs();
    
    var transferUrl = '../../pages/index/index';
    if (app.globalData &&app.globalData.authReferURL && app.globalData.authReferURL != '' && app.globalData.authReferURL != undefined) {
      transferUrl = '../../' + app.globalData.authReferURL;
    }
    console.log(app.globalData.authReferURL)
    app.globalData.authReferURL = '';
    console.log(transferUrl)
   
      wx.navigateTo({
        url: transferUrl
      });
    
    
  },
})