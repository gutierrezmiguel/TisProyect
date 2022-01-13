package com.proyect.webapp.controlers;


import com.proyect.webapp.entities.LoginForm;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.ui.Model;

@Controller
public class LoginController {

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String getLoginForm(){
        return "login";
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String login(@ModelAttribute(name = "loginForm")LoginForm loginForm, Model model){

        String username = null;
        model.addAttribute("username",username);
        String password = null;
        model.addAttribute("username",password);

        if("admin".equals(username) && "admin".equals(password)){
            return "index";
        }
        model.addAttribute("invalid credentials", true);
        return "login";

    }

}
