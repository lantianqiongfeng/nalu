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
    imagePath: "",
    imageQR: "",
    cityLst:[
     /* { "cityCode": "1", "cityName": "北京", "cityRemark": "明天北京下大雨啦！", "imgLst":[
        { "originUrl": "../../images/cityitem1.jpg", "smallUrl":"../../images/cityitem1.jpg"},
        { "originUrl": "../../images/cityitem1.jpg", "smallUrl": "../../images/cityitem1.jpg" },
        { "originUrl": "../../images/cityitem1.jpg", "smallUrl": "../../images/cityitem1.jpg" }
      ]} ,
      { "cityCode": "2", "cityName": "上海", "cityRemark": "明天上海下大雨啦！", "imgLst":[
        { "originUrl": "../../images/cityitem2.jpg", "smallUrl": "../../images/cityitem2.jpg" },
        { "originUrl": "../../images/cityitem2.jpg", "smallUrl": "../../images/cityitem2.jpg" },
        { "originUrl": "../../images/cityitem2.jpg", "smallUrl": "../../images/cityitem2.jpg" }
      ]  }*/
    ],
    canvasHidden:false,
    actionSheetHidden: true,
    actionSheetItems: ['转发', '保存图片分享到朋友圈'],
    totalJoinAmt:"",//'2100', //已参与人
    selCityItem:"",//"1",
    selCityRemark:"明天北京下大雨啦！",
    selCityImgLst: [/*
      { "originUrl": "../../images/cityitem2.jpg", "smallUrl": "../../images/cityitem2.jpg" },
      { "originUrl": "../../images/cityitem2.jpg", "smallUrl": "../../images/cityitem2.jpg" },
      { "originUrl": "../../images/cityitem2.jpg", "smallUrl": "../../images/cityitem2.jpg" }*/
    ]
  },
  cityItemTap:function(e){
    var selImgLst=[];
    if (this.data.cityLst && this.data.cityLst.length>0){
      for (var i in this.data.cityLst){
        if (this.data.cityLst[i].cityCode==e.currentTarget.id){
          this.setData({
            selCityItem: e.currentTarget.id,
            selCityImgLst: this.data.cityLst[i].imgLst,
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
          console.log("转发按钮",res)
        }
      })
    
    }
    else if (e.currentTarget.dataset.name && e.currentTarget.dataset.name == "保存图片分享到朋友圈") {
      wx.navigateTo({
        url: '../share/share'
      })
    }
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
    var that= this;
    // 页面初始化 options为页面跳转所带来的参数
    wx.setNavigationBarTitle({
      title: "伞主页",
      success: function (res) {
        // success
      }
    });
    var Id = options.id;
    if (options.from) {
      this.setData({
        fromSource: options.from,
      });
    }
    network.GetUserInfo({
      success: function () {
        that.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        });
      }
    })
    
    network.GET({
      url: 'umbrella/total',
      data: { },
      success: function (res) {
        if(res.total){
          that.setData({
            totalJoinAmt: res.total
          });
        }
        else{
          that.setData({
            totalJoinAmt: '0'
          });
        }
      },
      fail: function (err) {
        //失败后的逻辑  
        console.log(err);
      },
    });
    network.GET({
      url: 'umbrella/ALL',
      data: {},
      success: function (res) {
        if (res.data.pictures ) {
          that.setData({
            cityLst: res.data.pictures,
            selCityImgLst: res.data.pictures[0].imgLst,
            selCityItem: res.data.pictures[0].cityCode
          });
        }
        else {
          that.setData({
            totalJoinAmt: '0'
          });
        }
      },
      fail: function (err) {
        //失败后的逻辑  
        console.log(err);
      },
    });
  }, getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShareAppMessage: (res) => {
    
    if (res.from === 'button') {
      console.log("来自页面内转发按钮");
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
    var that = this;
    var url= e.currentTarget.id;
    if (that.data.selCityImgLst){
      for (var i in that.data.selCityImgLst){
        if (that.data.selCityImgLst[i].smallUrl==url){
          url = that.data.selCityImgLst[i].originUrl;
        }
      }
    }
    //保存用户记录
    network.SaveCustomerRecord({
      cityCode: that.data.selCityItem,
      pictureUrl: url,
      path: app.globalData.share_Url,//pages/index/index
      success: function (res) {
        console.log("SaveCustomerRecord ", res)
        var postData = {
          selCityItem: that.data.selCityItem,
          selCityImgLst: that.data.selCityImgLst,
          selCurImg: url,
          qrImgPath: res.data.qrcodUrl,
          recordId: res.data.recordId
        }
        wx.navigateTo({
          url: '../sharemain/sharemain?selData=' + JSON.stringify(postData)
        })
      },
      fail: function (err) {
        //失败后的逻辑
        console.log("SaveCustomerRecord 失败", err);
      },
    });
    
    
  }


})
