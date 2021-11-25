package com.proyect.webapp.controlers;

import com.proyect.webapp.entities.Ova;
import com.proyect.webapp.interfaces.IOva;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping
public class OvaController {

    private final IOva iOva;

    public OvaController(IOva iOva) {
        this.iOva = iOva;
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
    public String save(@Validated Ova o, Model model){
        iOva.save(o);
        return "redirect:/listar";
    }

}
