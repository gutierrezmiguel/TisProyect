package com.pwa.ovaApi.Controllers;

import com.pwa.ovaApi.Entities.Dto.LoginUser;
import com.pwa.ovaApi.Entities.User;
import com.pwa.ovaApi.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping(path = "/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping(path = "/create")
    public ResponseEntity<User> createUser(@RequestBody User user){
        User newUser= userService.createUser(user);
        return new ResponseEntity<>(newUser,HttpStatus.CREATED);
    }

    @PutMapping(path = "/update")
    public ResponseEntity<User> updateUser(@RequestBody User user){
        userService.updateUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(path = "/{idUser}")
    public ResponseEntity<User> getUserById(@PathVariable Long idUser){
        Optional<User> user = userService.getUserById(idUser);
        if(user.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(user.get(),HttpStatus.OK);
    }
    @PostMapping(path = "/login")
    public ResponseEntity<User> login(@RequestBody LoginUser loginUser){
        Optional<User> userByPassword = userService.login(loginUser);
        if (userByPassword.isEmpty()){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return  new ResponseEntity<>(userByPassword.get(),HttpStatus.OK);
    }
}
