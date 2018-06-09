//logs.js
const util = require('../../utils/util.js')
var network = require('../../utils/network.js');
const app = getApp()
function getRandomColor() {
  let rgb = []
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}
Page({
  data: {
    currentTab: 0,
    src: '',
    aCodeImg: '/images/main0.jpg',
    swiperImgs: [
      '/images/main0.jpg',
      '/images/main0.jpg',
      '/images/main0.jpg',
      '/images/main0.jpg',
      '/images/main0.jpg'],
    danmuList: [
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
      }],
    fromSource: "",
    imagePath: "../../images/share_bottom.jpg",
    imageQR: "../../images/qrcode.jpg",
    cityLst:[
      { "cityCode": "1", "cityName": "北京", "cityRemark": "明天北京下大雨啦！", "imgLst": { "orgLst": ["../../images/cityitem1.jpg", "../../images/cityitem1.jpg", "../../images/cityitem1.jpg"], "previewLst": ["../../images/cityitem1.jpg", "../../images/cityitem1.jpg", "../../images/cityitem1.jpg"] } },
      { "cityCode": "2", "cityName": "上海", "cityRemark": "明天上海下大雨啦！", "imgLst": { "orgLst": ["../../images/cityitem2.jpg", "../../images/cityitem2.jpg", "../../images/cityitem2.jpg"], "previewLst": ["../../images/cityitem2.jpg", "../../images/cityitem2.jpg", "../../images/cityitem2.jpg"] } },
      { "cityCode": "3", "cityName": "深圳", "cityRemark": "明天深圳下大雨啦！", "imgLst": { "orgLst": ["../../images/cityitem1.jpg", "../../images/cityitem1.jpg", "../../images/cityitem1.jpg"], "previewLst": ["../../images/cityitem1.jpg", "../../images/cityitem1.jpg", "../../images/cityitem1.jpg"] } },
      { "cityCode": "4", "cityName": "广州", "cityRemark": "明天广州下大雨啦！", "imgLst": { "orgLst": ["../../images/cityitem2.jpg", "../../images/cityitem2.jpg", "../../images/cityitem2.jpg"], "previewLst": ["../../images/cityitem2.jpg", "../../images/cityitem2.jpg", "../../images/cityitem2.jpg"] } },
      { "cityCode": "5", "cityName": "成都", "cityRemark": "明天成都下大雨啦！", "imgLst": { "orgLst": ["../../images/cityitem1.jpg", "../../images/cityitem1.jpg", "../../images/cityitem1.jpg"], "previewLst": ["../../images/cityitem1.jpg", "../../images/cityitem1.jpg", "../../images/cityitem1.jpg"] } },
      { "cityCode": "6", "cityName": "杭州", "cityRemark": "明天杭州下大雨啦！", "imgLst": { "orgLst": ["../../images/cityitem2.jpg", "../../images/cityitem2.jpg", "../../images/cityitem2.jpg"], "previewLst": ["../../images/cityitem2.jpg", "../../images/cityitem2.jpg", "../../images/cityitem2.jpg"] } },
      { "cityCode": "7", "cityName": "厦门", "cityRemark": "明天厦门下大雨啦！", "imgLst": { "orgLst": ["../../images/cityitem1.jpg", "../../images/cityitem1.jpg", "../../images/cityitem1.jpg"], "previewLst": ["../../images/cityitem1.jpg", "../../images/cityitem1.jpg", "../../images/cityitem1.jpg"] } },
      { "cityCode": "8", "cityName": "香港", "cityRemark": "明天香港下大雨啦！", "imgLst": { "orgLst": ["../../images/cityitem2.jpg", "../../images/cityitem2.jpg", "../../images/cityitem2.jpg"], "previewLst": ["../../images/cityitem2.jpg", "../../images/cityitem2.jpg", "../../images/cityitem2.jpg"] } },
      { "cityCode": "0", "cityName": "其他", "cityRemark": "明天全国下大雨啦！", "imgLst": { "orgLst": ["../../images/cityitem1.jpg", "../../images/cityitem1.jpg", "../../images/cityitem1.jpg"], "previewLst": ["../../images/cityitem1.jpg", "../../images/cityitem1.jpg", "../../images/cityitem1.jpg"] } }
    ],
    canvasHidden:false,
    actionSheetHidden: true,
    actionSheetItems: ['转发', '保存图片分享到朋友圈'],
    totalJoinAmt:2100, //已参与人
    selCityItem:"1",
    selCityRemark:"明天北京下大雨啦！",
    selCityImgLst: ["../../images/cityitem1.jpg", "../../images/cityitem1.jpg", "../../images/cityitem1.jpg"]
  },
  cityItemTap:function(e){
    console.log(typeof(this.data.cityLst))
    var selImgLst=[];
    if (this.data.cityLst && this.data.cityLst.length>0){
      for (var i in this.data.cityLst){
        console.log(this.data.cityLst[i])
        if (this.data.cityLst[i].cityCode==e.currentTarget.id){
          this.setData({
            selCityItem: e.currentTarget.id,
            selCityImgLst: this.data.cityLst[i].imgLst.previewLst,
            selCityRemark:this.data.cityLst[i].cityRemark
          })
          break;
        }
      }
    }
    this.setData({
      selCityItem:e.currentTarget.id
    })
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
  bindItemTap: function (e) {
    if (e.currentTarget.dataset.name && e.currentTarget.dataset.name=="转发"){
      wx.showShareMenu({
        withShareTicket: true,
        success:function(res){
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
  bindInputBlur: function (e) {
    this.inputValue = e.detail.value
  },
  bindButtonTap: function () {
    var that = this;
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success: function (res) {
        that.setData({
          src: res.tempFilePath
        })
      }
    })
  },
  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    })
  },
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  inputValue: '',
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    wx.setNavigationBarTitle({
      title: "伞主页",
      success: function (res) {
        // success
      }
    });
    console.log(options);
    var Id = options.id;
    if (options.from) {
      this.setData({
        fromSource: options.from,
      });
    }
    console.log("url id:" + Id);
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      
    } else if (this.data.canIUse) {
      console.log("main this.data.canIUse");
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        
      }
    } else {
      console.log("main !this.data.canIUse");
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          
          console.log(res);
        },
        fail:err=>{
          console.log(err);
          app.globalData.authReferURL = util.getCurrentPageUrlWithArgs();
          console.log("refer:"+ util.getCurrentPageUrlWithArgs());
          wx.navigateTo({
            url: '../../pages/auth/auth'
          });
        }
      })
    }
  }, getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShareAppMessage: (res) => {
    
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
  //滑动切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  //事件处理函数
  bindStoryTap: function () {
    wx.navigateTo({
      url: '../story/detail'
    })
  }
  ,
  bindStoryEditTap: function () {
    wx.navigateTo({
      url: '../EditStory/edit'
    })
  },
  imgItemtag:function(e){
    console.log(e)
    var url= e.currentTarget.id;
    wx.navigateTo({
      url: '../sharemain/sharemain'
    })
  }


})
