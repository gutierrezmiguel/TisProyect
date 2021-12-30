package com.proyect.webapp.controlers;

import com.proyect.webapp.services.api.AWSS3Service;
import org.apache.http.protocol.HTTP;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/s3")
public class UploadFileController {

    @Autowired
    private AWSS3Service awss3Service;

    @PostMapping(value = "/upload")
    public ResponseEntity<String> uploadFile(@RequestPart(value = "file")MultipartFile file){
        awss3Service.uploadFile(file);
        String response = "El archivo "+file.getOriginalFilename()+" fue cargado existosamente";
        return new ResponseEntity<String>(response, HttpStatus.OK);
    }
    @GetMapping(value = "/download")
    public ResponseEntity<Resource> download(@RequestParam("key") String key) {
        InputStreamResource resource  = new InputStreamResource(awss3Service.downloadFile(key));
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\""+key+"\"").body(resource);
    }


}
