const util = require('../../utils/util.js');
var network = require('../../utils/network.js');
const app = getApp();
Page({
  data:{
    userInfo: null,
    hasUserInfo: false,
    qrImgPath:'',
      cityImgPath:'',
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
    var that = this;
    that.setData({
      cityImgPath:e.currentTarget.id
    })
  },
  saveUserRecord:function(options){
    var that =this;
    network.SaveCustomerRecord({
      cityCode: that.data.selCityItem,
      pictureUrl: that.data.cityImgPath,
      path: app.globalData.share_Url,//pages/index/index
      success: function (res) {
        if(options&& options.success && typeof(options.success)=="function"){
          options.success(res);
        }
      },
      fail: function (err) {
        //失败后的逻辑
        console.log("SaveCustomerRecord 失败", err);
        if (options && options.fail && typeof (options.fail) == "function") {
          options.fail(err);
        }
      },
    });
  },
  onShareAppMessage: (res) => {
    var that = this;
    if (res.from === 'button') {
      console.log("来自页面内转发按钮",res.target);
    }
    else {
      console.log("来自右上角转发菜单", res.target)
    }
    return {
      title: '',
      path: '/pages/main/main?id=12345&from=' + app.globalData.userInfo.nickName,
      //imageUrl: app.globalData.mainShareImgUrl,//'/images/main0.jpg',
      success: (res) => {
        //保存用户记录
        that.saveUserRecord({
          success: function (res) {
            
          },
          fail: function (err) {
            //失败后的逻辑
            console.log("SaveCustomerRecord 失败", err);
          },
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
    var that=this;
    if (e.currentTarget.dataset.name && e.currentTarget.dataset.name == "转发") {
      
      wx.showShareMenu({
        withShareTicket: true,
        success: function (res) {
          console.log("转发按钮成功后返回消息",res)
        }
      })

    }
    else if (e.currentTarget.dataset.name && e.currentTarget.dataset.name == "保存图片分享到朋友圈") {
      that.saveUserRecord({
        success: function (res) {
          wx.navigateTo({
            url: '../share/share'
          })
        },
        fail: function (err) {
          //失败后的逻辑
          console.log("SaveCustomerRecord 失败", err);
        },
      });
      
    }
    console.log("保存图片分享到朋友圈",e);
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
        console.log("seldata",selData)
        that.setData({
          selCityItem: selData.selCityItem,
          cityImgPath: selData.selCurImg,
          imgLst: selData.selCityImgLst,
          qrImgPath: selData.qrImgPath,
          recordId: selData.recordId
        })
        console.log("onLoad seldata",that.data);
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
          console.log("downloadFile success",res)
          if (res.statusCode === 200) {
            app.globalData.userIcon = res.tempFilePath;
            that.setData({
              userIconPath: res.tempFilePath
            })
          }

        },
        fail:function(err){
          console.log("initData downloadFile下载用户头像失败",err)
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