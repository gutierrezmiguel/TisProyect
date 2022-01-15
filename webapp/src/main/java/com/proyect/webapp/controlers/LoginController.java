package com.proyect.webapp.controlers;


import com.proyect.webapp.entities.LoginForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.ui.Model;

@Controller
public class LoginController {

    @Autowired
    private OvaController ovaController;


    @RequestMapping("/")
    public String index(){
        return "login";
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String getLoginForm(){
        return "login";
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String login(@ModelAttribute(name = "loginForm")LoginForm loginForm, Model model){
        String username = loginForm.getUsername();
        String password = loginForm.getPassword();

        if("admin".equals(username) && "admin".equals(password)){

            return "redirect:/listar";
        }
        model.addAttribute("invalid credentials", true);
        return "login";

    }

}
