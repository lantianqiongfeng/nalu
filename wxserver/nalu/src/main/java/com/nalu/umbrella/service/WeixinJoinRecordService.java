package com.nalu.umbrella.service;

import com.nalu.umbrella.request.WeixinJoinRecordRequest;
import com.nalu.umbrella.response.BaseResponse;

public interface WeixinJoinRecordService {

    public BaseResponse joinRecord(WeixinJoinRecordRequest request);
}
