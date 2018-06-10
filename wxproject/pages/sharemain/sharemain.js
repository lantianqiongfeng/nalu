const util = require('../../utils/util.js');
var network = require('../../utils/network.js');
const app = getApp();
Page({
  data:{
    userInfo: null,
    hasUserInfo: false,
    qrImgPath:'',
      cityImgPath:'',//../../images/share_bottom.jpg',
      userIconPath:'',
      userNickName:'',
      txtLocation:'北京',
      recordId:'',
      actionSheetHidden:true,
      selCityItem:'',
      recordId: '',
      imgLst: {
        /*orgLst: ["../../images/cityitem1.jpg", "../../images/cityitem1.jpg", "../../images/cityitem1.jpg", "../../images/cityitem1.jpg", "../../images/cityitem1.jpg"], 
        previewLst: ["../../images/cityitem1.jpg", "../../images/cityitem1.jpg", "../../images/cityitem1.jpg", "../../images/cityitem1.jpg", "../../images/cityitem1.jpg"] 
    */
      }
  },
  swiperImgTap:function(e){

  },
  sendShareSuccessData:function(p){//分享成功保存相关数据

  },
  onShareAppMessage: (res) => {
    var that = this;
    console.log("aa");
    if (res.from === 'button') {
      console.log("来自页面内转发按钮");
      console.log(res.target);
    }
    else {
      console.log("来自右上角转发菜单")
    }
    return {
      title: '',
      path: '/pages/main/main?id=12345&from=' + app.globalData.userInfo.nickName,
      //imageUrl: app.globalData.mainShareImgUrl,//'/images/main0.jpg',
      success: (res) => {
        that.sendShareSuccessData({
          selImg: that.data.cityImgPath,
          selCityCode: that.data.selCityItem,
          userNickName: app.globalData.userInfo.nickName,
          userIconPath: app.globalData.userInfo.avatarUrl,
          userOpenId:''
        });
        /* wx.showShareMenu({
           withShareTicket: true,
           success: function (res) {
             // 分享成功
             console.log('shareMenu share success')
             console.log(res)
           },
           fail: function (res) {
             // 分享失败
             console.log(res)
           }
         })
         console.log("转发成功", res);*/
        wx.hideShareMenu();
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
  },
  actionSheetTap: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    });
  },
  actionSheetChange: function (e) {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    });
  },
  bindsharetap:function(e){
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    });
  },
  bindItemTap: function (e) {
    if (e.currentTarget.dataset.name && e.currentTarget.dataset.name == "转发") {
      
      wx.showShareMenu({
        withShareTicket: true,
        success: function (res) {
          console.log(res)
        }
      })

    }
    else if (e.currentTarget.dataset.name && e.currentTarget.dataset.name == "保存图片分享到朋友圈") {
      wx.navigateTo({
        url: '../share/share'
      })
    }
    console.log(e);
    console.log('tap ' + e.currentTarget.dataset.name);
  },
  onLoad: function (options) {
    var that =this;
    // options 中的 scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    if (options && options.scene && options.scene!='')
    {
      var scene = decodeURIComponent(options.scene);
    }
    
    if (options && options.selData){
      var selData = JSON.parse(options.selData);
      if(selData){
        that.setData({
          selCityItem: selData.selCityItem,
          cityImgPath: selData.selCurImg,
          imgLst: selData.selCityImgLst,
          qrImgPath: selData.qrcodUrl,
          recordId: selData.recordId
        })
      }
      
    }
    network.GetUserInfo({
      success: function () {
        that.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
        that.initData();
      }
    })
    
  },
  initData:function(p){
    var that = this;
    if (!app.globalData.userIcon || app.globalData.userIcon == '') {
      wx.downloadFile({
        url: app.globalData.userInfo.avatarUrl, 
        success: function (res) {
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
console.log(res)
          if (res.statusCode === 200) {
            app.globalData.userIcon = res.tempFilePath;
            that.setData({
              userIconPath: res.tempFilePath
            })
          }

        },
        fail:function(err){
          console.log(err)
        }
      })
    }
    else{
      that.setData({
        userIconPath: app.globalData.userIcon
      })
    }
  }
})