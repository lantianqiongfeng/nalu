package com.nalu.umbrella.service;

import com.nalu.umbrella.repository.model.WeixinShareRecord;

public interface QrCodeService {

    String queryOpenId(String jsCode);

    String generateQrCode(String url);

    String generateUnlimitCode(WeixinShareRecord record, String path);

    String refreshAccessToken(String url,String appId,String appsecret);
}
