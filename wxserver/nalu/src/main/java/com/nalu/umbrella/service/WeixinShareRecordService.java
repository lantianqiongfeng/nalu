package com.nalu.umbrella.service;

import com.nalu.umbrella.request.WeixinShareRecordRequest;
import com.nalu.umbrella.request.WeixinShareRecordUpdateRequest;
import com.nalu.umbrella.response.BaseResponse;
import com.nalu.umbrella.response.WeixinShareRecordQueryResponse;
import com.nalu.umbrella.response.WeixinShareRecordResponse;

public interface WeixinShareRecordService {

    public WeixinShareRecordResponse saveRecord(WeixinShareRecordRequest request);

    public BaseResponse updateRecord(WeixinShareRecordUpdateRequest request);

    public WeixinShareRecordQueryResponse queryTotal();
}
