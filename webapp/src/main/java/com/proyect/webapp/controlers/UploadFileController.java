package com.proyect.webapp.controlers;

import com.proyect.webapp.entities.Ova;
import com.proyect.webapp.services.OvaService;
import com.proyect.webapp.services.api.AWSS3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Controller
@RequestMapping("/s3")
public class UploadFileController {

    @Autowired
    private AWSS3Service awss3Service;
    @Autowired
    private OvaService ovaService;

    @PostMapping(value = "/upload/{idOva}")
    public String uploadFile(@RequestPart(value = "file")MultipartFile file, @PathVariable Long idOva, Model model){
        String key = awss3Service.uploadFile(file);
        String response = "El archivo "+file.getOriginalFilename()+" fue cargado existosamente";
        Optional<Ova> ova = ovaService.listarid(idOva);
        if (ova.isPresent()){
            Ova ovaToEdit = ova.get();
            ovaService.editkey(key,ovaToEdit);
        }
        return "redirect:/listar";
    }
}
