package com.nalu.umbrella.request;

import lombok.Data;

@Data
public class WeixinUserRequest {

    private String nickName;

    private String avatarUrl;

    private String openId;
}
