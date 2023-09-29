package com.main.mainserver.controller;

import com.main.mainserver.dao.AuthenticateDao;
import com.main.mainserver.dao.LoginDao;
import com.main.mainserver.entity.SessionEntity;
import com.main.mainserver.entity.UserEntity;
import com.main.mainserver.repository.SessionRepository;
import com.main.mainserver.service.RedisService;
import com.main.mainserver.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

import java.time.Duration;

@CrossOrigin(value = "http://localhost:3000", allowCredentials = "true")
@RestController
public class UserController {
    @Autowired
    UserService userService;
    @Autowired
    RedisService redisService;
    @Autowired
    SessionRepository sessionRepository;
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

        String userId = UUID.randomUUID().toString();

        ResponseCookie cookie = ResponseCookie.from("user-id", userId) // key & value
                .httpOnly(false)
                .secure(false)
                .domain("localhost")
                .path("/")
                .maxAge(Duration.ofHours(1))
                .sameSite("Strict")  // sameSite
                .build()
                ;
        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        SessionEntity sEntity = new SessionEntity();
        sEntity.setId(userId);
        sEntity.setName("Hasan");

        sessionRepository.save(sEntity);

        return "successful";
    }

    @PostMapping("/api/authenticate")
    private String authenticateUser(@RequestBody AuthenticateDao autDao) {
        if(autDao.getCookieData() == null) return "null";
        if(!sessionRepository.existsById(autDao.getCookieData())) return "null";
        String userName = sessionRepository.findById(autDao.getCookieData()).get().getName();

        if(userName == null) return "null";
        return userName;
    }
}
