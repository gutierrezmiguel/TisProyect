package com.proyect.webapp.controlers;

import com.proyect.webapp.entities.Ova;
import com.proyect.webapp.interfaces.IOva;
import com.proyect.webapp.services.api.AWSS3Service;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import com.proyect.webapp.services.api.AWSS3Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping
public class OvaController {


    private final IOva iOva;
    private final AWSS3Service awss3Service;

    public OvaController(IOva iOva, AWSS3Service awss3Service) {
        this.iOva = iOva;
        this.awss3Service = awss3Service;
    }

    @GetMapping("/listar")
    public String listar(Model model){

        List<Ova> ovas = iOva.listar();
        model.addAttribute("ovas", ovas);

        return "index";
    }

    @GetMapping("/new")
    public String agregar(Model model){
        model.addAttribute("ova",new Ova());
        return "form";
    }
    @PostMapping("/save")
    public String save(Ova o, Model model){
        iOva.save(o);
        return "redirect:/listar";
    }

    @GetMapping("/editar/{idOva}")
    public String editar(@PathVariable Long idOva, Model model) {
        Optional<Ova> ova = iOva.listarid(idOva);
        model.addAttribute("ova",ova);
        return "form";
    }

    @GetMapping("/eliminar/{idOva}")
    public String eliminar(@PathVariable Long idOva, Model model) {
        iOva.delete(idOva);
        return "redirect:/listar";
    }

    @GetMapping("/fileS3/{idOva}")
    public String fileS3(@PathVariable Long idOva, Model model) {
        model.addAttribute("idova",idOva);
        return "fileform";
    }



}
