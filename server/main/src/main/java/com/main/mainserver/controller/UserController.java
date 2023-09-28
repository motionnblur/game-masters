package com.main.mainserver.controller;

import com.main.mainserver.dao.LoginDao;
import com.main.mainserver.entity.UserEntity;
import com.main.mainserver.service.RedisService;
import com.main.mainserver.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(value = "http://localhost:3000", allowCredentials = "true")
@RestController
public class UserController {
    @Autowired
    UserService userService;
    @Autowired
    RedisService redisService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/api/create_user")
    private String createUser(@RequestBody UserEntity userEntity) {
        if (userEntity.getUserName() == null || userEntity.getPassw() == null || userEntity.getMail() == null || userEntity.getLastName() == null)
            return "null";
        if (!userService.validateEmail(userEntity.getMail()))
            return "please write a correct mail";
        try {
            if (userService.findByUserMail(userEntity.getMail()) != null)
                return "user with that mail already exists";

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
    private String loginUser(@RequestBody LoginDao loginDao, HttpServletResponse response) {
        if (loginDao.getPassw() == null || loginDao.getMail() == null)
            return "null";
        if (!userService.validateEmail(loginDao.getMail()))
            return "please write a correct mail";

        String userMail = loginDao.getMail();
        String userPassw = loginDao.getPassw();

        UserEntity user = userService.findByUserMail(userMail);

        if (user == null) return "user could not be found";
        if (!passwordEncoder.matches(userPassw, user.getPassw()))
            return "password is wrong";

        Cookie jwtTokenCookie = new Cookie("user-id", userMail);
        response.addCookie(jwtTokenCookie);

        //response.addHeader("Access-Control-Allow-Credentials: true",
        //        "Access-Control-Allow-Origin: http://localhost:3000");

        redisService.saveBasicVariable(userMail);

        return "successful";
    }

    @GetMapping("/api/authenticate")
    private Boolean authenticateUser(HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();

        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("user-id")) {
                String val = cookie.getValue();

                if (redisService.isThere(val))
                    return true;
            }
        }
        return false;
    }
}
