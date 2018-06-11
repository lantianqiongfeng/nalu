package com.nalu.umbrella.service.impl;

import com.alibaba.fastjson.JSON;
import com.nalu.umbrella.job.ConfigHolder;
import com.nalu.umbrella.repository.model.WeixinShareRecord;
import com.nalu.umbrella.service.HttpService;
import com.nalu.umbrella.service.QrCodeService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class QrCodeServiceImpl implements QrCodeService {

    @Autowired
    private HttpService httpService;

    @Autowired
    private ConfigHolder configHolder;

    @Override
    public String queryOpenId(String jsCode) {
        String openUrl = configHolder.getNaluOpenIdUrl()
                  + "?appid=" + configHolder.getAppId() + "&"
                  + "secret=" + configHolder.getAppSecret() + "&"
                  + "js_code=" + jsCode + "&grant_type=authorization_code";
        try {
            Map<String,Object> map = new HashMap<>();
            String response = httpService.doRequest(openUrl,map,HttpMethod.GET);
            log.info("============" + response);
            if(StringUtils.isNotBlank(response)) {
                Map resMap = JSON.parseObject(response,Map.class);
                if(resMap.containsKey("openid")) {
                    String openId = (String)resMap.get("openid");
                    return openId;
                }
            }
            return null;
        }catch (Exception e) {
            log.info("get openId error===[{}]",e);
        }
        return null;
    }

    @Override
    public String generateQrCode(String url) {
        // https://developers.weixin.qq.com/miniprogram/dev/api/qrcode.html 文档
        String accessToken = configHolder.getAccessToken();
        String qrUrl = configHolder.getNaluQrcodeUrl() + "?access_token=" + accessToken;
        try{
            Map<String,Object> map = new HashMap<>();
            map.put("path",url);
            map.put("width",430);
            map.put("auto_color",false);
            Map<String,Object> line_color = new HashMap<>();
            line_color.put("r", 0);
            line_color.put("g", 0);
            line_color.put("b", 0);
            map.put("line_color", line_color);
            map.put("is_hyaline",false);
            byte[] result = httpService.doQrCodeRequest(qrUrl,map);
            String viewPath = "/base/index.png";
            String path = saveQrCode(result,viewPath);
            return configHolder.getNaluViewCodeUrl() +"/img"+ path;
        } catch (Exception e) {
            log.info("get qrcode error===[{}]",e);
        }
        return null;
    }

    @Override
    public String generateUnlimitCode(WeixinShareRecord record,String path) {
        String accessToken = configHolder.getAccessToken();
        String qrUrl = configHolder.getNaluUnlimitCodeUrl() + "?access_token=" + accessToken;
        try{
            Map<String,Object> param = new HashMap<>();
            param.put("scene", String.valueOf(record.getId()));
            param.put("page", path);
            param.put("width", 430);
            param.put("auto_color", false);
            Map<String,Object> line_color = new HashMap<>();
            line_color.put("r", 0);
            line_color.put("g", 0);
            line_color.put("b", 0);
            param.put("line_color", line_color);
            param.put("is_hyaline",false);
            log.info("调用生成微信URL接口传参:" + param);
            byte[] result = httpService.doQrCodeRequest(qrUrl,param);
            String viewPath = "/" + record.getOpenId() + "/" + record.getCityCode()+"/qrcode.jpg";
            String resPath = saveQrCode(result,viewPath);
            return configHolder.getNaluViewCodeUrl() +"/img"+ resPath;
        } catch (Exception e) {
            log.info("get qrcode error===[{}]",e);
        }
        return null;
    }

    @Override
    public String refreshAccessToken(String url, String appId, String appsecret) {
        //https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
        Map<String,Object> map = new HashMap<>();
        map.put("grant_type","client_credential");
        map.put("appid",appId);
        map.put("secret",appsecret);
        String response = httpService.doRequest(url,map,HttpMethod.GET);
        return response;
    }

    private String saveQrCode(byte[] result,String viewPath) {
        InputStream inputStream = null;
        OutputStream outputStream = null;
        try{
            inputStream = new ByteArrayInputStream(result);
            String path = configHolder.getNaluQrCodePath() + viewPath;
            File file = new File(path);
            File fileParent = file.getParentFile();
            if(!fileParent.exists()){
                fileParent.mkdirs();
            }
            if (!file.exists()){
                file.createNewFile();
            }
            outputStream = new FileOutputStream(file);
            int len = 0;
            byte[] buf = new byte[8192];
            while ((len = inputStream.read(buf, 0, 1024)) != -1) {
                outputStream.write(buf, 0, len);
            }
            outputStream.flush();
            return viewPath;
        }catch (IOException e) {
            log.info("create qrcode error===[{}]",e);
        }finally {
            if (inputStream != null) {
                try {
                    inputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (outputStream != null) {
                try {
                    outputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return null;
    }
}
