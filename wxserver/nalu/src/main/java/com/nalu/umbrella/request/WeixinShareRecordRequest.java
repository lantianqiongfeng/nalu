package com.nalu.umbrella.request;

import lombok.Data;

@Data
public class WeixinShareRecordRequest {

    private String openId;

    private String cityCode;

    private String pictureUrl;

    private String path = "pages/index/index";
}
