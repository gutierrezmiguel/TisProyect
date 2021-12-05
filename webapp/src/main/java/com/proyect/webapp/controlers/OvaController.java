package com.proyect.webapp.controlers;

import com.proyect.webapp.entities.Ova;
import com.proyect.webapp.interfaces.IOva;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

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
    public String save(Ova o, Model model){
        iOva.save(o);
        return "redirect:/listar";
    }

    @GetMapping("/editar/{idOva}")
    public String editar(@PathVariable int idOva, Model model) {
        Optional<Ova> ova = iOva.listarid(idOva);
        model.addAttribute("ova",ova);
        return "form";
    }

    @GetMapping("/eliminar/{idOva}")
    public String eliminar(@PathVariable int idOva, Model model) {
        iOva.delete(idOva);
        return "redirect:/listar";
    }

}
