package com.pwa.ovaApi.Controllers;

import com.pwa.ovaApi.Interfaces.AWSS3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/s3")
public class AWSS3Controller {

    @Autowired
    private AWSS3Service awss3Service;

    @GetMapping(value = "/download/{key}")
    public ResponseEntity<Resource> download(@PathVariable("key") String key) {
        InputStreamResource resource  = new InputStreamResource(awss3Service.downloadFile(key));
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\""+key+"\"").body(resource);
    }
}
