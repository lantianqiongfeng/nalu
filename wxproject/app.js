//app.js
App({
 
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
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
    userIcon:'',
    API_HOST: 'http://localhost:8070/nalu/',
    API_UploadURL:'http://localhost:53414/api/Lib2/TK/testUploadPost',
    AppSecret:'a32f7126897b28a6d16ea96121411238',
    AppID:'wx61b4da199d1ef172',
    WXToken_URL:'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx61b4da199d1ef172&secret=a32f7126897b28a6d16ea96121411238',
    WXACode_URL:'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=placeholder',
    authReferURL:'',
    mainShareImgUrl:''
  }
  
})