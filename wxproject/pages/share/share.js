//share.js
var util = require('../../utils/util.js');  
const app = getApp();
Page({
  data: {
    imagePath: '../../images/shareimg_bg.jpg',
    GenPath: '../../images/share_bottom.jpg',
    imageQR: "../../images/qrcode.jpg",
    maskHidden: false,
    canvasHidden: false,
    imageWidth:0,
    imageHeigth:0,
    GenImgHeight:0,
    GenImgWidth:0
  },
  genImage:function(){
    var that =this;
    wx.getImageInfo({
      src: that.data.GenPath,
      success:function(res){
        that.setData({
          GenImgHeight: res.height,
          GenImgWidth: res.width
        })
        if (!app.globalData.userIcon || app.globalData.userIcon == '') {
          wx.downloadFile({
            url: app.globalData.userInfo.avatarUrl, //仅为示例，并非真实的资源
            success: function (res) {
              // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容

              if (res.statusCode === 200) {
                app.globalData.userIcon = res.tempFilePath;
                that.createNewImg();
              }

            }
          })
        }
        else {
          that.createNewImg();
        }
      },
      fail:function(err){
        console.log(err);
      }
    })
    
  },
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      console.log("app.globalData.userInfo:" + app.globalData.userInfo.nickName);
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      // 页面初始化 options为页面跳转所带来的参数
      //var size = this.setCanvasSize();//动态设置画布大小
      this.genImage();
    //创建初始化图片
    } else if (this.data.canIUse) {
      console.log("main this.data.canIUse");
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        // 页面初始化 options为页面跳转所带来的参数
        //var size = this.setCanvasSize();//动态设置画布大小
        this.genImage();
    //创建初始化图片
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
          // 页面初始化 options为页面跳转所带来的参数
          //var size = this.setCanvasSize();//动态设置画布大小
          this.genImage();
    //创建初始化图片
        },
        fail: err => {
          console.log(err);
          app.globalData.authReferURL = util.getCurrentPageUrlWithArgs();
          console.log("refer:" + util.getCurrentPageUrlWithArgs());
          wx.navigateTo({
            url: '../../pages/auth/auth'
          });
        }
      })
    }
    
  },
  //适配不同屏幕大小的canvas 
  setCanvasSize: function () {
    var size = {};
    try {
      var res = wx.getSystemInfoSync();
      var scale = 1080;//画布宽度
      var scaleH = 1919 / 1080;//生成图片的宽高比例
      var width = res.screenWidth;//res.windowWidth;//画布宽度
      var height = width*scaleH;//res.windowWidth * scaleH;//画布的高度
      size.w = width;
      size.h = height;
    } catch (e) {
      // Do something when catch error
      console.log("获取设备信息失败" + e);
    }
    return size;
  },
  //将1绘制到canvas的固定
  setUserInfos: function (context) {
    
    context.drawImage(app.globalData.userIcon , 20, 20, 50, 50);
    let that = this;
    context.setFontSize(14);
    context.setTextAlign("left");
    context.setFillStyle("#A5A69C");
    context.fillText(app.globalData.userInfo.nickName, 10, 85);
    context.stroke();
  },
  //将2绘制到canvas的固定
  settextLocation: function (context) {
    let that = this;
    var textLocationUp = "我在";
    var textLocationDown = "北京";
    context.setFontSize(16);
    context.setTextAlign("center");
    context.setFillStyle("#63696B");
    context.fillText(textLocationUp, 100,40);
    context.fillText(textLocationDown, 100, 60);
    context.stroke();
  },
  //将canvas转换为图片保存到本地，然后将图片路径传给image图片的src
  createNewImg: function () {
    var that = this;
    
    var size = that.setCanvasSize();
    var context = wx.createCanvasContext('myCanvas');
    context.setFillStyle("white");
    context.fillRect(0,0,420,747);
    
    var path = that.data.GenPath;// "../../images/share_bottom.jpg";
   // var imageTx = that.data.imageTx;
    var imageQR = that.data.imageQR;
    //var imageZw = "/images/xcxewm.png";
    context.drawImage(path, 0, 110, size.w, that.data.GenImgHeigth);
    //context.drawImage(imageTx, size.w / 2 - 25, size.h * 0.02, size.w * 0.14, size.w * 0.14);
    context.drawImage(imageQR, size.w  - 70, 15, 70, 70);
    //context.drawImage(imageZw, size.w / 2 - 25, size.h * 0.7, size.w * 0.14, size.w * 0.14);
    this.settextLocation(context);
    this.setUserInfos(context);
    console.log(size.w, size.h)
    //绘制图片
    context.draw();
    //将生成好的图片保存到本地，需要延迟一会，绘制期间耗时
    wx.showToast({
      title: '正在生成分享图中...',
      icon: 'loading',
      duration: 2000
    });
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        success: function (res) {
          var tempFilePath = res.tempFilePath;
          console.log(tempFilePath);
          that.setData({
            imagePath: tempFilePath,
            canvasHidden: false,
            maskHidden: false,
          });
         //将生成的图片放入到《image》标签里
          var img = that.data.imagePath;
          wx.getImageInfo({
            src: img,
            success:function(res){
              
              var viewSize = {};
              var originalWidth = res.width;//图片原始宽
              var originalHeight = res.height;//图片原始高
              wx.getSystemInfo({
                success: function (res) {
                  //读取系统宽度和高度
                  var viewWidth = res.screenWidth;
                  var viewHeight = res.screenHeight;
                  viewSize.width = viewWidth;
                  viewSize.height = (originalHeight / originalWidth)*viewWidth;
                  that.setData({
                    imageWidth: viewWidth,
                    imageHeigth: viewHeight
                  });
                }
              });
              wx.saveImageToPhotosAlbum({
                filePath: that.data.imagePath,
                success: (res) => {
                  console.log(res)
                },
                fail: (err) => {
                  console.log(err)
                }
              })
            }
          })
          /*wx.previewImage({
            current: img, // 当前显示图片的http链接
            urls: [img] // 需要预览的图片http链接列表
          })*/
        },
        fail: function (res) {
          console.log(res);
        }
      });
    }, 2000);
  },

})