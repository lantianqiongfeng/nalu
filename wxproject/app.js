//app.js
var util = require('/utils/util.js');  
App({
 
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    /*wx.login({ 
      success: res => {
        
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })*/
    var that = this;
    // 获取用户信息
    wx.getSetting({
      success: function(res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: function(res) {
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo
              console.log("that.globalData.userInfo", that.globalData.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            },
            fail:function(e){
              console.log("getUserInfo fail",e)
            }
          })
        }
        else{
          //that.globalData.authReferURL = util.getCurrentPageUrlWithArgs();
          wx.navigateTo({
            url: '/pages/auth/auth'
          });
          console.log("!authSetting fail")
        }
      }
    })
  },
  onShow: function (options) {
    // Do something when show.
  },
  onHide: function () {
    // Do something when hide.
  },
  onError: function (msg) {
    console.log(msg)
  },
  globalData: {
    userInfo: null,
    userOpenId:'',
    userIcon:'',
    API_HOST: 'http://47.96.149.158:8070/nalu/',
    API_UploadURL:'http://localhost:53414/api/Lib2/TK/testUploadPost',
    AppSecret:'5e4615344fa12a261c290174c6b27859',//AppSecret:'a32f7126897b28a6d16ea96121411238',
    AppID:'wx37a4793cc1cb39fb',//AppID:'wx61b4da199d1ef172',
    WXToken_URL:'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx37a4793cc1cb39fb&secret=5e4615344fa12a261c290174c6b27859',
    WXACode_URL:'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=placeholder',
    authReferURL:'',
    mainShareImgUrl:'',
    share_Url:''//pages/index/index
  }
  
})