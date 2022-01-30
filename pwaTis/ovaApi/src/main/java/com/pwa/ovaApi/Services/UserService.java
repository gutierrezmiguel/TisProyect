package com.pwa.ovaApi.Services;

import com.pwa.ovaApi.Entities.Dto.LoginUser;
import com.pwa.ovaApi.Entities.User;
import com.pwa.ovaApi.Interfaces.IUser;
import com.pwa.ovaApi.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements IUser {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User createUser(User user) {

        return userRepository.save(user);
    }

    @Override
    public void updateUser(User user) {
        Optional<User> userToUpdate = getUserById(user.getIdUser());
        if(userToUpdate.isPresent()){
            userToUpdate.get().setUsername(user.getUsername());
            userToUpdate.get().setPassword(user.getPassword());
            userRepository.save(userToUpdate.get());
        }

    }

    @Override
    public Optional<User> getUserById(Long idUser) {
       return userRepository.findById(idUser);
    }

    @Override
    public Optional<User> login(LoginUser user) {
        Optional<User> userByPassword = userRepository.getUserByUsernameAndPassword(user.getUsername(),user.getPassword());
        return userByPassword;
    }
}
