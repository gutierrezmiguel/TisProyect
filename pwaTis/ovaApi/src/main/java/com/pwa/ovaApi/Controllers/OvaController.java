package com.pwa.ovaApi.Controllers;

import com.pwa.ovaApi.Entities.Ova;
import com.pwa.ovaApi.Services.OvaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping(path = "/ova")
public class OvaController {
    private final OvaService ovaService;

    @Autowired
    public OvaController(OvaService ovaService) {
        this.ovaService = ovaService;
    }

    @GetMapping(path = "/list")
    public ResponseEntity<List<Ova>> listOva(){
        List<Ova> ovas = ovaService.getAllOvas();
        if(ovas.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(ovas,HttpStatus.OK);
    }

    @GetMapping(path = "/{idOva}")
    public ResponseEntity<Ova> getOvaById(@PathVariable Long idOva){
        Optional<Ova> ova = ovaService.getOvaById(idOva);
        if(ova.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(ova.get(),HttpStatus.OK);
    }
}
