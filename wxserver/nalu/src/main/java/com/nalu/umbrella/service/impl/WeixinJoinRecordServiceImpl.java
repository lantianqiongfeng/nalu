package com.nalu.umbrella.service.impl;

import com.nalu.umbrella.common.eum.ErrorEnum;
import com.nalu.umbrella.repository.mapper.WeixinJoinRecordMapper;
import com.nalu.umbrella.repository.model.WeixinJoinRecord;
import com.nalu.umbrella.request.WeixinJoinRecordRequest;
import com.nalu.umbrella.response.BaseResponse;
import com.nalu.umbrella.service.WeixinJoinRecordService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@Slf4j
public class WeixinJoinRecordServiceImpl implements WeixinJoinRecordService {

    @Autowired
    private WeixinJoinRecordMapper weixinJoinRecordMapper;

    @Override
    public BaseResponse joinRecord(WeixinJoinRecordRequest request) {
        BaseResponse response = new BaseResponse();
        try{
            WeixinJoinRecord record = new WeixinJoinRecord();
            record.setOpenId(request.getOpenId());
            record.setCityCode(request.getCityCode());
            record.setRecordId(request.getRecordId());
            record.setIsdeleted(0);
            Date currentDate = new Date();
            record.setCreatedDate(currentDate);
            record.setUpdateDate(currentDate);
            weixinJoinRecordMapper.insertSelective(record);
            response.setRespCode(ErrorEnum.SYSTEM_SUCCESS.getErrorCode());
        }catch (Exception e){
            log.info("update winxin record error == [{}]",e);
            response.setRespCode(ErrorEnum.SYSTEM_SUCCESS.getErrorCode());
            response.setRespMessage(e.getMessage());
        }
        return response;
    }
}
