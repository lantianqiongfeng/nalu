package com.nalu.umbrella.service;


import org.springframework.http.HttpMethod;

import java.util.Map;

/**
 * Created by admin on 2017/6/6.
 */
public interface HttpService {

    public String doRequest(String url, Map<String, Object> map, HttpMethod httpMethod);

    public String doRequest(String url, String json, HttpMethod httpMethod) throws Exception;

    public byte[] doQrCodeRequest(String url, Map<String, Object> map);

}
