package com.nalu.umbrella.request;

import lombok.Data;

@Data
public class WeixinOpenRequest {

    private String code;

    private String nickName;

    private String avatarUrl;
}
