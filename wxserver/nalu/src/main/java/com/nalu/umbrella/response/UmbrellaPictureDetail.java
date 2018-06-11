package com.nalu.umbrella.response;

import lombok.Data;

import java.util.List;

@Data
public class UmbrellaPictureDetail {

    private String cityCode;

    private String cityName;

    private String cityRemark;

    private List<PictureDetail> imgLst;
}
