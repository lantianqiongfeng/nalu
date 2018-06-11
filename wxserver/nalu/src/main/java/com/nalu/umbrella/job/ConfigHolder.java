package com.nalu.umbrella.job;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * @author dlee
 */
@Component
@Data
public class ConfigHolder {

    @Value("${nalu.tokenUrl}")
    private String tokenUrl;

    @Value("${nalu.appId}")
    private String appId;

    @Value("${nalu.appSecret}")
    private String appSecret;

    @Value("${nalu.qrCodeUrl}")
    private String naluQrcodeUrl;

    @Value("${nalu.qrCodePath}")
    private String naluQrCodePath;

    @Value("${nalu.viewCodeUrl}")
    private String naluViewCodeUrl;

    @Value("${nalu.unlimitCodeUrl}")
    private String naluUnlimitCodeUrl;

    @Value("${nalu.openIdUrl}")
    private String naluOpenIdUrl;

    private String accessToken;

}