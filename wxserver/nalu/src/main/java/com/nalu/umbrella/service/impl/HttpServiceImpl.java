package com.nalu.umbrella.service.impl;

import com.nalu.umbrella.service.HttpService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Map;

/**
 * Created by admin on 2017/6/6.
 */
@Slf4j
@Service
public class HttpServiceImpl implements HttpService {
    @Autowired
    private RestTemplate restTemplate;

    @Override
    public String doRequest(String url, Map<String, Object> map,HttpMethod httpMethod) {
        RequestEntity<String> requestEntity = enrichRequestEntity(url,map,httpMethod);
        ResponseEntity<String> responseEntity = doRequest(requestEntity);
        return responseEntity.getBody();
    }
    @Override
    public String doRequest(String url, String json,HttpMethod httpMethod) throws Exception {
        RequestEntity<String> requestEntity = enrichRequestEntity(url,json,httpMethod);
        ResponseEntity<String> responseEntity = doRequest(requestEntity);
        return responseEntity.getBody();
    }

    @Override
    public byte[] doQrCodeRequest(String url, Map<String, Object> map) {
        MultiValueMap<String, String> headers = new LinkedMultiValueMap<>();
        headers.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON.toString());
        HttpEntity requestEntity = new HttpEntity(map, headers);
        ResponseEntity<byte[]> entity = restTemplate.exchange(url, HttpMethod.POST, requestEntity, byte[].class);
        log.info("调用小程序生成微信永久二维码URL接口返回结果:" + entity.getBody());
        byte[] result = entity.getBody();
        return result;
    }

    public ResponseEntity<String> doRequest(RequestEntity<String> requestEntity) {
        log.info("do request:{}", requestEntity);
        ResponseEntity<String> responseEntity = restTemplate.exchange(requestEntity, String.class);
        log.info("response body:" + responseEntity.getBody());
        return responseEntity;
    }

    public RequestEntity enrichRequestEntity(String url, Map<String, Object> map, HttpMethod httpMethod) {
        URI uri = null;
        if(!map.isEmpty()) {
            StringBuffer sb = new StringBuffer("");
            for (String key:map.keySet()) {
                sb.append(key).append("=").append(map.get(key)).append("&");
            }
            String query = sb.substring(0,sb.length()-1);
            uri = UriComponentsBuilder.fromHttpUrl(url).query(query).build().encode().toUri();
        }else {
            uri = UriComponentsBuilder.fromHttpUrl(url).build().encode().toUri();
        }
        return new RequestEntity(httpMethod,uri);

    }
    public RequestEntity enrichRequestEntity(String url, String json, HttpMethod httpMethod) {
        URI uri = UriComponentsBuilder.fromHttpUrl(url).build().encode().toUri();
        MultiValueMap headers = new LinkedMultiValueMap();
        headers.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON.toString());
        return new RequestEntity<String>(json,headers,httpMethod,uri);

    }

}
