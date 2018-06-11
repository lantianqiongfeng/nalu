package com.nalu.umbrella.service.impl;

import com.nalu.umbrella.repository.mapper.UmbrellaPictureMapper;
import com.nalu.umbrella.repository.model.UmbrellaPicture;
import com.nalu.umbrella.repository.model.UmbrellaPictureExample;
import com.nalu.umbrella.response.PictureDetail;
import com.nalu.umbrella.response.UmbrellaPictureDetail;
import com.nalu.umbrella.response.UmbrellaResponse;
import com.nalu.umbrella.service.UmbrellaPictureService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class UmbrellaPictureServiceImpl implements UmbrellaPictureService {

    @Autowired
    private UmbrellaPictureMapper umbrellaPictureMapper;

    @Override
    public UmbrellaResponse listPictures(String address) {
        UmbrellaPictureExample example = new UmbrellaPictureExample();
        UmbrellaPictureExample.Criteria criteria = example.createCriteria();
        if(!"ALL".equals(address)) {
            criteria.andUmbrellaAddressEqualTo(address);
        }
        List<UmbrellaPicture> pictures = umbrellaPictureMapper.selectByExample(example);
        UmbrellaResponse response = new UmbrellaResponse();
        List<UmbrellaPictureDetail> details = new ArrayList<>();
        if(pictures != null && pictures.size() > 0) {
            Map<String,List<UmbrellaPicture>> map = new HashMap<>();
            for(UmbrellaPicture picture : pictures) {
                String addressCode = picture.getUmbrellaAddress();
                if(map.containsKey(addressCode)) {
                    List<UmbrellaPicture> list = map.get(addressCode);
                    list.add(picture);
                }else {
                    List<UmbrellaPicture> list = new ArrayList<>();
                    list.add(picture);
                    map.put(addressCode,list);
                }
            }
            for(Map.Entry<String,List<UmbrellaPicture>> entry : map.entrySet()) {
                List<UmbrellaPicture> list = entry.getValue();
                UmbrellaPictureDetail detail = new UmbrellaPictureDetail();
                UmbrellaPicture picture = list.get(0);
                detail.setCityCode(picture.getUmbrellaAddress());
                detail.setCityName(picture.getAddressName());
                detail.setCityRemark(picture.getCityRemark());
                List<PictureDetail> pictureUrls = new ArrayList<>();
                for(UmbrellaPicture picture1 : list) {
                    PictureDetail pictureUrl = new PictureDetail();
                    pictureUrl.setOriginUrl(picture1.getPictureUrl());
                    pictureUrl.setSmallUrl(picture1.getPictureSmallUrl());
                    pictureUrls.add(pictureUrl);
                }
                detail.setImgLst(pictureUrls);
                details.add(detail);
            }
        }
        response.setPictures(details);
        return response;
    }
}
