package com.nalu.umbrella.contoller;

import com.alibaba.fastjson.JSON;
import com.nalu.umbrella.repository.model.WeixinShareRecord;
import com.nalu.umbrella.request.WeixinOpenRequest;
import com.nalu.umbrella.request.WeixinShareRecordRequest;
import com.nalu.umbrella.request.WeixinShareRecordUpdateRequest;
import com.nalu.umbrella.request.WeixinUserRequest;
import com.nalu.umbrella.response.*;
import com.nalu.umbrella.service.QrCodeService;
import com.nalu.umbrella.service.UmbrellaPictureService;
import com.nalu.umbrella.service.WeixinShareRecordService;
import com.nalu.umbrella.service.WeixinUserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/nalu")
@Slf4j
public class NaluController {

    @Autowired
    private UmbrellaPictureService umbrellaPictureService;

    @Autowired
    private WeixinShareRecordService weixinShareRecordService;

    @Autowired
    private WeixinUserService weixinUserService;

    @Autowired
    private QrCodeService qrCodeService;

    @RequestMapping(value="/umbrella/total",method= RequestMethod.GET)
    public WeixinShareRecordQueryResponse queryTotalUser() {
        WeixinShareRecordQueryResponse response = weixinShareRecordService.queryTotal();
        return response;
    }

    @RequestMapping(value="/umbrella/{address}",method= RequestMethod.GET)
    public UmbrellaResponse queryUmbrella(@PathVariable String address) {
        UmbrellaResponse response = umbrellaPictureService.listPictures(address);
        return response;
    }

    @RequestMapping(value="/weixin/openId", method= RequestMethod.POST)
    public WeixinResponse getOpenId(@RequestBody String requestString) {
        WeixinOpenRequest request = JSON.parseObject(requestString,WeixinOpenRequest.class);
        WeixinResponse response = weixinUserService.saveUserByOpenId(request);
        return response;
    }

    @RequestMapping(value="/weixin/userinfo", method= RequestMethod.POST)
    public WeixinResponse saveUserInfo(@PathVariable String requestString){
        WeixinUserRequest request = JSON.parseObject(requestString,WeixinUserRequest.class);
        WeixinResponse response = weixinUserService.saveUserInfo(request);
        return response;
    }

    @RequestMapping(value="/weixin/record", method= RequestMethod.POST)
    public WeixinShareRecordResponse saveWeixinRecord(@RequestBody String requestString){
        WeixinShareRecordRequest request = JSON.parseObject(requestString,WeixinShareRecordRequest.class);
        WeixinShareRecordResponse response = weixinShareRecordService.saveRecord(request);
        return response;
    }

    @RequestMapping(value="/weixin/updateRecord", method= RequestMethod.POST)
    public BaseResponse updateRecord(@RequestBody String requestString) {
        WeixinShareRecordUpdateRequest request = JSON.parseObject(requestString,WeixinShareRecordUpdateRequest.class);
        BaseResponse response = weixinShareRecordService.updateRecord(request);
        return response;
    }

    @RequestMapping(value="/weixin/join", method= RequestMethod.POST)
    public void joinUmbrella(@RequestBody String requestString) {

    }

    @RequestMapping(value="/weixin/qrCode", method= RequestMethod.POST)
    public String getQrCode(@RequestBody String requestString) {
        WeixinShareRecord record = new WeixinShareRecord();
        record.setId(10l);
        record.setOpenId("oZrnl5eqyR70bYArZRqBBzchKpy4");
        record.setCityCode("shanghai");
        String response = qrCodeService.generateUnlimitCode(record,requestString);
        return response;
    }

}
