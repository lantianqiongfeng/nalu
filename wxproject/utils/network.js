/*
var network = require('../../utils/network.js');
压缩图片示例
that.setData({
          showCanvas:true
        });
        wx.showToast({
          title: '分享图片生成中...',
          icon: 'loading',
          duration: 1000
        });
         network.CompressImg({
            url:filePaths[0],
            success: function (compres) {
              wx.hideToast()
              console.log("compres.tempFilePath:" + compres.tempFilePath);
              that.setData({
                postImgUrl: compres.tempFilePath,
                showCanvas:false
              });
              wx.getImageInfo({
                src: compres.tempFilePath,
                success: function (imgRes) {
                  console.log(imgRes);
                  that.setData({
                    compressSize: imgRes.width * imgRes.height,

                  });
                }
              });
            },

          });

上传自选图片示例 不压缩
network.UploadLocalImage();
post调用示例
 network.POST({
      url: 'Lib2/TK/testpost',
      data: { CustomerNo: 'cus1234' },
      success: function (res) {
        console.log(res);
        that.setData({
          motto: res.data
        });
        console.log("成功了");
      },
      fail: function (err) {
        //失败后的逻辑
        console.log(err);
        console.log("失败了");
      },
    })
get调用示例
    network.GET({
      url: 'Lib1/test/SayHello',
        data: {s:p},
        success: function (res) {
          console.log(res);
          that.setData({
            motto: res.data
          });
          console.log("成功了");
        },
        fail: function (err) {
          //失败后的逻辑
          console.log(err);
          console.log("失败了");
        },
    });
 */
const app = getApp();
var Util = require('../utils/util.js');  
var requestHandler = {
  data: {},
  url:'',
  contentType:'application/json',
  success: function (res) {
    // success
  },
  fail: function (err) {
    // fail
  },
  complete: function (res) {
    // complete
  }
}
var uploadHandler = {
  params: {},
  url: '',
  filePath:'',
  fileName:'',
  success: function (res) {
    // success
  },
  fail: function (err) {
    // fail
  },
  complete: function (res) {
    // complete
  }
}
//GET请求
function GET(requestHandler) {
  request('GET', requestHandler)
}
//POST请求
function POST(requestHandler) {
  request('POST', requestHandler)
}
function UploadFile(uploadHandler) {
  wx.uploadFile({
    url: uploadHandler.url,
    filePath: uploadHandler.filePath,
    name: uploadHandler.fileName,
    formData: uploadHandler.data,
    success: function (res) {
      if (uploadHandler.success && typeof (uploadHandler.success) == "function")
      {
        uploadHandler.sucess(res);
      }
    },
    fail: function (err) {
      if (uploadHandler.fail && typeof (uploadHandler.fail) == "function")
      {
        uploadHandler.fail(err);
      }
    },
    complete: function (res) {
      if (uploadHandler.complete && typeof (uploadHandler.complete) == "function")
      {
        uploadHandler.complete(res);
      }
      // complete
    }
  })

}
function DownloadFile(url, typ, success) {
  wx.downloadFile({
    url: url,
    type: typ,
    success: function (res) {
      // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
      if (res.statusCode === 200) {
        if (success){
          success(res);
        } 
      }
    },
    fail: function (err) {
      console.log("DownloadFile err",err)
    }
  })
}

function SaveFile(tempFile, success) {
  wx.saveFile({
    tempFilePath: tempFile,
    success: function (res) {
      var savedFile = res.savedFilePath;
      if (success) {
        success(saveFile);
      }
    }
  })

}
function request(method, requestHandler) {
  //注意：可以对params加密等处理
  var params = requestHandler.data;
  var contentType=null;
  if (requestHandler.contentType){
    contentType = requestHandler.contentType;
  }
  var API_URL = app.globalData.API_HOST ;
  if (requestHandler.host){
    API_URL = requestHandler.host;
  }
  if (requestHandler.url && requestHandler.url!=undefined)
  {
    if (requestHandler.ignoreHost && requestHandler.ignoreHost=="1"){
      API_URL = requestHandler.url;
    }
    else{
      API_URL +=requestHandler.url;
    }
  }
  wx.request({
    url: API_URL,
    data: params,
    method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      'content-type': contentType ? contentType :'application/json;charset=UTF-8' // 默认值
    }, // 设置请求的 header
    success: function (res) {
      //注意：可以对参数解密等处理
      if (requestHandler.success && typeof (requestHandler.success) == "function")
      requestHandler.success(res)
    },
    fail: function (err) {
      if (requestHandler.fail && typeof (requestHandler.fail) == "function")
      requestHandler.fail(err)
    },
    complete: function (res) {
      if (requestHandler.complete && typeof (requestHandler.complete)=="function")
        requestHandler.complete(res);
      // complete
    }
  })
}


function uploadImage(filePaths, successUp, failUp, i, length) {
  wx.uploadFile({
    url: app.globalData.API_UploadURL,
    filePath: filePaths[i],
    name: 'files',
    formData: {
      CustomerNo:'12313'
      //'pictureUid': owerId,
      //'pictureAid': albumId
    },
    success: (resp) => {
      successUp++;
      console.log("successUp:"+successUp);
    },
    fail: (res) => {
      failUp++;
      console.log("failUp:"+failUp);
    },
    complete: () => {
      i++;
      if (i == length) {
        console.log('总共' + successUp + '张上传成功,' + failUp + '张上传失败！');
      }
      else {  //递归调用上传函数
        uploadImage(filePaths, successUp, failUp, i, length);
      }
    },
  });
}
function UploadLocalImage() {
  
  wx.chooseImage({
    count: 9,
    sizeType: ['compressed'],//'original',
    sourceType: ['album', 'camera'],
    success: (res) => {
      var successUp = 0; //成功个数
      var failUp = 0; //失败个数
      var length = res.tempFilePaths.length; //总共个数
      var i = 0; //第几个
      // 上传图片
      var canvasTempFilePaths = [];
      
      uploadImage(res.tempFilePaths, successUp, failUp, i, length);
    },
  });
}
/* 压缩图片大小 start*/
function CompressImg(compressHandle){
  var model = "";
  wx.getSystemInfo({
    success: function (res) {
      model = res.model;
     
    }
  });
  if (model.indexOf("iPhone") >= 0) {
    //that.uploadFileOpt(that.data.attendSuccessImg);
  } else {
    drawCanvas({
      urlpath:compressHandle.url,
      success:function(res){
        if (compressHandle && compressHandle.success && typeof (compressHandle.success) == "function"){
          compressHandle.success(res);
        }
        
      },
      fail:function(err){
      },
      complete: function complete(e) {
      }
    });
  }
  return '';
}
function drawCanvas(drawHandle) {
  const ctx = wx.createCanvasContext('attendCanvasId');
  ctx.drawImage(drawHandle.urlpath, 0, 0, 100, 100);
  ctx.draw(true,()=>{
    wx.canvasToTempFilePath({
      canvasId: 'attendCanvasId',
      success: function success(res) {
        console.log("compress success");
        if (drawHandle && drawHandle.success && typeof (drawHandle.success) == "function") {
          drawHandle.success(res);

        }

      },
      fail: function (err) {
        console.log("canvasToTempFilePath fail!");
        if (drawHandle && drawHandle.fail && typeof (drawHandle.fail) == "function")
          drawHandle.fail(err);
      },
      complete: function complete(e) {
        console.log("canvasToTempFilePath complete!");
        if (drawHandle && drawHandle.complete && typeof (drawHandle.complete) == "function")
          drawHandle.complete(e);
      }
    });

  });
  
      
  
  
}
/* 压缩图片大小 end */
//生成小程序码
function GetACode(cb){
  GetAccess_token({
    success:function(res){
      var purl = app.globalData.WXACode_URL.replace(/placeholder/, res.access_token);
      
      POST({
        url: purl,
        ignoreHost: "1",
        data: { 
          scene:'12345',
          page:Util.getCurrentPageUrl(),
          width:430,
          is_hyaline:true
        },
        success: function (ACoderes) {
          if (ACoderes.statusCode && ACoderes.statusCode == "200") {
            if ( cb && cb.success && typeof (cb.success) == "function") {
              cb.success(ACoderes);
            }
          }
          console.log("ACoderes成功了");
        },
        fail: function (err) {
          //失败后的逻辑  
          console.log("GetACode 失败",err);
        },
      })  
    }
  });
}
//获取当前用户访问token
function GetAccess_token(cb) {
  GET({
    url: app.globalData.WXToken_URL,
    ignoreHost:"1",
    data: { },
    success: function (res) {
      if (res.statusCode && res.statusCode=="200"){
        if (res.data && cb&&cb.success && typeof (cb.success)=="function"){
          cb.success(res.data);
        }
      }
    },
    fail: function (err) {
      //失败后的逻辑  
      console.log("GetAccess_token err",err);
    },
  });  
}
function GetUserOpenId(options){
  wx.login({
    success: function (res) {
      console.log("wx.login res.code", res.code)
      if (res.code) {
        POST({
          url: 'weixin/openId',
          data: {
            code:res.code,
            nickName: app.globalData.userInfo.nickName,
            avatarUrl: app.globalData.userInfo.avatarUrl
          },
          success: function (res) {
            console.log("weixin openId", res)
            if (res.statusCode && res.statusCode == "200" && res.data.openId && res.data.openId!='') {
              app.globalData.userOpenId = res.data.openId; //获取openid 
              if (options && options.success && typeof (options.success) == "function") {
                options.success();
              }
              
            }
          },
          fail: function (err) {
            //失败后的逻辑  
            console.log("weixin get openId fail",err);
            
          },
        });  
        
      } else {
        console.log('wx.login fail' + res.errMsg)
      }
    }
  });
}

function GetUserInfo(options)
{
  var that = this;
  var canIUse =wx.canIUse('button.open-type.getUserInfo');
  
  if (app.globalData.userInfo) {
    console.log("app.globalData.userInfo is valid")
    if (!app.globalData.userOpenId || app.globalData.userOpenId==''){
        if (options && options.success && typeof (options.success) == "function") {
          GetUserOpenId({
            success: options.success
          });
        }
        else{
          GetUserOpenId();
        }
    }
    else{
      if (options && options.success && typeof (options.success) == "function") {
        options.success(app.globalData.userInfo);
      }
    } 
    

  } else if (canIUse) {
    console.log("main this.data.canIUse");
    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    // 所以此处加入 callback 以防止这种情况
    app.userInfoReadyCallback = function(res) {
      app.globalData.userInfo = res.userInfo;
      if (!app.globalData.userOpenId || app.globalData.userOpenId == '') {
        if (options && options.success && typeof (options.success) == "function") {
          GetUserOpenId({
            success: options.success
          });
        }
        else {
          GetUserOpenId();
        }
      }
      else{
        if (options && options.success && typeof (options.success) == "function") {
          options.success(app.globalData.userInfo);
        }
      }
    }
  } else {
    console.log("main !this.data.canIUse");
    // 在没有 open-type=getUserInfo 版本的兼容处理
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        if (!app.globalData.userOpenId || app.globalData.userOpenId == '') {
          if (options && options.success && typeof (options.success) == "function") {
            GetUserOpenId({
              success: options.success
            });
          }
          else {
            GetUserOpenId();
          }
        }
        else{
          if (options && options.success && typeof (options.success) == "function") {
            options.success(app.globalData.userInfo);
          }
        }
        
      },
      fail: err => {
        console.log("wx.getUserInfo fail",err);
        app.globalData.authReferURL = util.getCurrentPageUrlWithArgs();
        wx.navigateTo({
          url: '../../pages/auth/auth'
        });
      }
    })
  }

}
function SaveCustomerRecord(options){
  POST({
    url: 'weixin/record',
    data: {
      openId: app.globalData.userOpenId,
      cityCode: options.cityCode,
      pictureUrl: options.pictureUrl,
      path: options.path
    },
    success: function (res) {
      if (options && options.success && typeof (options.success)=="function"){
        options.success(res);
      }
    },
    fail: function (err) {
      //失败后的逻辑
      console.log(" SaveCustomerRecord err", err);
    }
  })

}

module.exports = {
  GET: GET,
  POST: POST,
  UploadFile: UploadFile,
  DownloadFile: DownloadFile,
  SaveFile: SaveFile,
  UploadLocalImage: UploadLocalImage,
  CompressImg: CompressImg,
  GetAccess_token: GetAccess_token,
  GetACode: GetACode,
  GetUserInfo: GetUserInfo,
  SaveCustomerRecord: SaveCustomerRecord
}
