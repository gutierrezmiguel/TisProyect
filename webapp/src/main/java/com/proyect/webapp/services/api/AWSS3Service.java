package com.proyect.webapp.services.api;

import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;

public interface AWSS3Service {

    void uploadFile(MultipartFile file);
    InputStream downloadFile(String key);


}