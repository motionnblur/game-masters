package com.main.mainserver.controller;

import com.main.mainserver.dao.LoginDao;
import com.main.mainserver.entity.UserEntity;
import com.main.mainserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
    UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @PostMapping("/api/create_user")
    private String createUser(@RequestBody UserEntity userEntity) {
        try {
            String hashedPassword = passwordEncoder.encode(userEntity.getPassw());

            UserEntity newUser = new UserEntity();
            newUser.setUserName(userEntity.getUserName());
            newUser.setLastName(userEntity.getLastName());
            newUser.setMail(userEntity.getMail());
            newUser.setPassw(hashedPassword);

            return userService.saveUser(newUser);
        } catch (Exception e) {
            return "error";
        }
    }
    @PostMapping("/api/login_user")
    private String loginUser(@RequestBody LoginDao loginDao){
        String userMail = loginDao.getMail();
        String userPassw = loginDao.getPassw();

        UserEntity user = userService.findByUserMail(userMail);

        if(user == null) return "user could not be found";
        if(!passwordEncoder.matches(userPassw,user.getPassw()))
            return "password is wrong";

        return "successful";
    }
}
