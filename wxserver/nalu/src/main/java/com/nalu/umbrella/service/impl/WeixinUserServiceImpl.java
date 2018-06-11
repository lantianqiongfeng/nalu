package com.nalu.umbrella.service.impl;

import com.nalu.umbrella.common.eum.ErrorEnum;
import com.nalu.umbrella.repository.mapper.WeixinUserInfoMapper;
import com.nalu.umbrella.repository.model.WeixinUserInfo;
import com.nalu.umbrella.repository.model.WeixinUserInfoExample;
import com.nalu.umbrella.request.WeixinOpenRequest;
import com.nalu.umbrella.request.WeixinUserRequest;
import com.nalu.umbrella.response.WeixinResponse;
import com.nalu.umbrella.service.QrCodeService;
import com.nalu.umbrella.service.WeixinUserService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.omg.PortableServer.REQUEST_PROCESSING_POLICY_ID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Slf4j
public class WeixinUserServiceImpl implements WeixinUserService {

    @Autowired
    private WeixinUserInfoMapper weixinUserInfoMapper;

    @Autowired
    private QrCodeService qrCodeService;

    @Override
    public WeixinResponse saveUserInfo(WeixinUserRequest request) {
        WeixinResponse response = new WeixinResponse();
        try{
            WeixinUserInfo userInfo = queryUserInfo(request.getOpenId());
            if(userInfo == null) {
                WeixinUserInfo record = new WeixinUserInfo();
                record.setNickName(request.getNickName());
                record.setAvatarUrl(request.getAvatarUrl());
                record.setOpenId(request.getOpenId());
                Date currentDate = new Date();
                record.setCreatedDate(currentDate);
                record.setUpdateDate(currentDate);
                record.setIsdeleted(0);
                weixinUserInfoMapper.insertSelective(record);
            }
            response.setRespCode(ErrorEnum.SYSTEM_SUCCESS.getErrorCode());
        }catch (Exception e) {
            log.info("save user info error====[{}]",e);
            response.setRespCode(ErrorEnum.SYSTEM_FAILURE.getErrorCode());
            response.setRespMessage(ErrorEnum.SYSTEM_FAILURE.getErrorMessage());
        }
        return response;
    }

    @Override
    public WeixinResponse saveUserByOpenId(WeixinOpenRequest request) {
        String openId = qrCodeService.queryOpenId(request.getCode());
        WeixinResponse response = new WeixinResponse();
        if(StringUtils.isNotBlank(openId)) {
            WeixinUserRequest wxRequest = new WeixinUserRequest();
            wxRequest.setNickName(request.getNickName());
            wxRequest.setAvatarUrl(request.getAvatarUrl());
            wxRequest.setOpenId(openId);
            response = saveUserInfo(wxRequest);
            response.setOpenId(openId);
        }else {
            response.setRespCode(ErrorEnum.SYSTEM_SUCCESS.getErrorCode());
        }
        return response;
    }

    private WeixinUserInfo queryUserInfo(String openId) {
        WeixinUserInfoExample example = new WeixinUserInfoExample();
        WeixinUserInfoExample.Criteria criteria = example.createCriteria();
        criteria.andOpenIdEqualTo(openId);
        List<WeixinUserInfo> userInfos = weixinUserInfoMapper.selectByExample(example);
        if(userInfos != null && userInfos.size() > 0) {
            return userInfos.get(0);
        }
        return null;
    }
}
