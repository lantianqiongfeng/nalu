package com.nalu.umbrella.service;

import com.nalu.umbrella.repository.model.UmbrellaPicture;
import com.nalu.umbrella.response.UmbrellaResponse;

import java.util.List;

public interface UmbrellaPictureService {

    UmbrellaResponse listPictures(String address);
}
