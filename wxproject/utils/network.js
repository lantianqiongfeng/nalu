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
      console.log(res.data)
      if (uploadHandler.success && typeof (uploadHandler.success) == "function")
      {
        uploadHandler.sucess(res);
      }
    },
    fail: function (err) {
      console.log(err)
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
      console.log(err)
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
  console.log("api_url:"+API_URL);
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
      console.log(resp);
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
      console.log(res);
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
  console.log(model);
  if (model.indexOf("iPhone") >= 0) {
    //that.uploadFileOpt(that.data.attendSuccessImg);
    console.log("noiphone")
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
      console.log("page" + Util.getCurrentPageUrl());
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
          console.log(ACoderes);
          if (ACoderes.statusCode && ACoderes.statusCode == "200") {
            if ( cb && cb.success && typeof (cb.success) == "function") {
              cb.success(ACoderes);
            }
          }
          console.log("ACoderes成功了");
        },
        fail: function (err) {
          //失败后的逻辑  
          console.log(err);
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
        console.log(cb);
        if (res.data && cb&&cb.success && typeof (cb.success)=="function"){
          cb.success(res.data);
        }
      }
    },
    fail: function (err) {
      //失败后的逻辑  
      console.log(err);
    },
  });  
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
  GetACode: GetACode
}
