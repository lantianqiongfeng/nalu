package com.nalu.umbrella.service;

import com.nalu.umbrella.request.WeixinOpenRequest;
import com.nalu.umbrella.request.WeixinUserRequest;
import com.nalu.umbrella.response.WeixinResponse;

public interface WeixinUserService {

    public WeixinResponse saveUserInfo(WeixinUserRequest request);

    public WeixinResponse saveUserByOpenId(WeixinOpenRequest request);
}
