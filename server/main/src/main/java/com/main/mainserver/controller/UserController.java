package com.main.mainserver.controller;

import com.main.mainserver.entity.UserEntity;
import com.main.mainserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
    UserService userService;
    @PostMapping("/api/create_user")
    private String createUser(@RequestBody UserEntity userEntity) {
        try {
            return userService.saveUser(userEntity);
        } catch (Exception e) {
            return "error";
        }
    }
}
