package com.nalu.umbrella.job;

import com.alibaba.fastjson.JSON;
import com.nalu.umbrella.service.QrCodeService;
import com.nalu.umbrella.utils.DateUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * 刷新小程序TOKEN
 */
@Component
@EnableScheduling
@Slf4j
public class RefreshTokenJob {

    @Autowired
    private QrCodeService qrCodeService;

    @Autowired
    private ConfigHolder configHolder;


    /**
     * 获取token值，每隔50分钟重新获取一次
     */
    @Scheduled(initialDelay=0,fixedDelay =3000000)
    public void oneHourTask() {
        log.info("定时任务执行:"+ DateUtils.getCurrentDate());
        String url = configHolder.getTokenUrl();
        String appId = configHolder.getAppId();
        String appsecret = configHolder.getAppSecret();
        String result = qrCodeService.refreshAccessToken(url,appId,appsecret);
        if(StringUtils.isNotBlank(result)) {
            Map map = JSON.parseObject(result,Map.class);
            String accessToken = (String)map.get("access_token");
            configHolder.setAccessToken(accessToken);
        }
    }
}
