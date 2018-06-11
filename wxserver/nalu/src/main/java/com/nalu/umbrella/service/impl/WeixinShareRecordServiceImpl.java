package com.nalu.umbrella.service.impl;

import com.alibaba.fastjson.JSON;
import com.nalu.umbrella.common.eum.ErrorEnum;
import com.nalu.umbrella.repository.mapper.WeixinShareRecordMapper;
import com.nalu.umbrella.repository.mapper.WeixinUserInfoMapper;
import com.nalu.umbrella.repository.model.WeixinShareRecord;
import com.nalu.umbrella.repository.model.WeixinShareRecordExample;
import com.nalu.umbrella.repository.model.WeixinUserInfoExample;
import com.nalu.umbrella.request.WeixinShareRecordRequest;
import com.nalu.umbrella.request.WeixinShareRecordUpdateRequest;
import com.nalu.umbrella.response.BaseResponse;
import com.nalu.umbrella.response.WeixinShareRecordQueryResponse;
import com.nalu.umbrella.response.WeixinShareRecordResponse;
import com.nalu.umbrella.service.QrCodeService;
import com.nalu.umbrella.service.WeixinShareRecordService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class WeixinShareRecordServiceImpl implements WeixinShareRecordService {

    @Autowired
    private WeixinShareRecordMapper weixinShareRecordMapper;

    @Autowired
    private QrCodeService qrCodeService;

    @Override
    public WeixinShareRecordResponse saveRecord(WeixinShareRecordRequest request) {
        WeixinShareRecordResponse response = new WeixinShareRecordResponse();
        try{
            WeixinShareRecord record = queryShare(request.getOpenId(),request.getCityCode());
            if(record == null) {
                record = new WeixinShareRecord();
                record.setOpenId(request.getOpenId());
                record.setCityCode(request.getCityCode());
                record.setPictureUrl(request.getPictureUrl());
                record.setIsdeleted(0);
                Date currentDate = new Date();
                record.setCreatedDate(currentDate);
                record.setUpdateDate(currentDate);
                weixinShareRecordMapper.insertSelective(record);
                String scene = String.valueOf(record.getId());
                String path = request.getPath();
                String qrcodeUrl =  qrCodeService.generateUnlimitCode(record,path);
                record.setQrcodeUrl(qrcodeUrl);
                weixinShareRecordMapper.updateByPrimaryKeySelective(record);
            }
            response.setRecordId(String.valueOf(record.getId()));
            response.setQrcodUrl(record.getQrcodeUrl());
            response.setRespCode(ErrorEnum.SYSTEM_SUCCESS.getErrorCode());
        }catch (Exception e){
            log.info("save winxin record error == [{}]",e);
            response.setRespCode(ErrorEnum.SYSTEM_SUCCESS.getErrorCode());
            response.setRespMessage(e.getMessage());
        }
        return response;
    }

    @Override
    public BaseResponse updateRecord(WeixinShareRecordUpdateRequest request) {
        BaseResponse response = new BaseResponse();
        try{
            WeixinShareRecord record = queryRecord(request.getRecordId());
            if(record != null) {
                record.setPictureUrl(request.getPictureUrl());
                record.setUpdateDate(new Date());
                weixinShareRecordMapper.updateRecord(record);
            }
        }catch (Exception e){
            log.info("update winxin record error == [{}]",e);
            response.setRespCode(ErrorEnum.SYSTEM_SUCCESS.getErrorCode());
            response.setRespMessage(e.getMessage());
        }
        return response;
    }

    public WeixinShareRecord queryRecord(String recordId) {
        WeixinShareRecord record = weixinShareRecordMapper.selectByPrimaryKey(Long.valueOf(recordId));
        return record;
    }

    @Override
    public WeixinShareRecordQueryResponse queryTotal() {
        WeixinShareRecordQueryResponse response = new WeixinShareRecordQueryResponse();
        long count = weixinShareRecordMapper.countTotal();
        response.setTotal(String.valueOf(count));
        return response;
    }

    private WeixinShareRecord queryShare(String openId,String cityCode) {
        WeixinShareRecordExample example = new WeixinShareRecordExample();
        WeixinShareRecordExample.Criteria criteria = example.createCriteria();
        criteria.andOpenIdEqualTo(openId);
        criteria.andCityCodeEqualTo(cityCode);
        List<WeixinShareRecord> records = weixinShareRecordMapper.selectByExample(example);
        if(records != null && records.size() > 0) {
            return records.get(0);
        }
        return null;
    }

}
