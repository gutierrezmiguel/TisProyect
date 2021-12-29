package com.pwa.ovaApi.Interfaces;

import com.pwa.ovaApi.Entities.Dto.LoginUser;
import com.pwa.ovaApi.Entities.User;

import java.util.Optional;

public interface IUser {
    void createUser (User user);

    void updateUser (User user);

    Optional<User> getUserById(Long idUser);

    Optional<User> login(LoginUser user);

}
