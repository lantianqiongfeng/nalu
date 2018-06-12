//index.js
//获取应用实例
const app = getApp()
var network = require('../../utils/network.js');
Page({
  data: {
    postImgUrl:'',
    initImgUrls: [],
    initSize:'',
    compressSize:'',
    showCanvas:false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    wx.setNavigationBarTitle({
      title: "伞编辑页",
      success: function (res) {
        // success
      }
    })
  },
  bindAddImgTap:function(){
    var that = this;
    var urls = that.data.postImgUrls;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有 //'original',
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var filePaths = res.tempFilePaths;
        that.setData({
          initImgUrls: filePaths,
          initSize:res.tempFiles[0].size,
        });
        //for (var i = 0; i < filePaths.length;i++){
        //var compressImg = network.CompressImg(filePaths[0]);
        var filePath ='';
        that.setData({
          showCanvas:true
        });
        wx.showToast({
          title: '分享图片生成中...',
          icon: 'loading',
          duration: 1500
        });
         network.CompressImg({
            url:filePaths[0],
            success: function (compres) {
              wx.hideToast()
              that.setData({
                postImgUrl: compres.tempFilePath,
                showCanvas:false
              });
              wx.getImageInfo({
                src: compres.tempFilePath,
                success: function (imgRes) {
                  that.setData({
                    compressSize: imgRes.width * imgRes.height,
                    
                  });
                }
              });
            },
            
          });
        
          var Key = filePath.substr(filePath.lastIndexOf('/') + 1); // 这里指定上传的文件名
          /*wx.uploadFile({
            url: 'http://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
            filePath: filePath,
            name: 'file',
            formData: {
              'user': 'test'
            },
            success: function (res) {
              var data = res.data
              //do something
            }
          })*/
        //}
      }
    })
  }


})