package com.nalu.umbrella.response;

import com.nalu.umbrella.repository.model.UmbrellaPicture;
import lombok.Data;

import java.util.List;

@Data
public class UmbrellaResponse extends BaseResponse {

    private List<UmbrellaPictureDetail> pictures;
}
