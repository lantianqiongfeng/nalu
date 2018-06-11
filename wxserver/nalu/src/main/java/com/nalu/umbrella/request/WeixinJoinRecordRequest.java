package com.nalu.umbrella.request;

import lombok.Data;

@Data
public class WeixinJoinRecordRequest {

    private String openId;

    private String cityCode;

    private String recordId;
}
