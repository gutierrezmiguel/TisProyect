package com.pwa.ovaApi.Interfaces;

import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

public interface AWSS3Service {

    String uploadFile(MultipartFile file);
    InputStream downloadFile(String key);


}
