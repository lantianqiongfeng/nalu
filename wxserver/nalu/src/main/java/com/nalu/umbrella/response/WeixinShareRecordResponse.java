package com.nalu.umbrella.response;

import lombok.Data;

@Data
public class WeixinShareRecordResponse extends BaseResponse {

    private String recordId;

    private String qrcodUrl;
}
