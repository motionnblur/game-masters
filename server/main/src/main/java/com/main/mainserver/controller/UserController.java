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
        if(userEntity.getUserName() == null || userEntity.getPassw() == null || userEntity.getMail() == null || userEntity.getLastName() == null)
            return "null";
        if(!userService.validateEmail(userEntity.getMail()))
            return "please write a correct mail";
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
        if(loginDao.getPassw() == null || loginDao.getMail() == null)
            return "null";
        if(!userService.validateEmail(loginDao.getMail()))
            return "please write a correct mail";

        String userMail = loginDao.getMail();
        String userPassw = loginDao.getPassw();

        UserEntity user = userService.findByUserMail(userMail);

        if(user == null) return "user could not be found";
        if(!passwordEncoder.matches(userPassw,user.getPassw()))
            return "password is wrong";

        return "successful";
    }
}
