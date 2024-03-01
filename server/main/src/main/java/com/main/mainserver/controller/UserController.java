package com.main.mainserver.controller;

import com.main.mainserver.dto.AuthenticateDto;
import com.main.mainserver.dto.LoginDto;
import com.main.mainserver.entity.SessionEntity;
import com.main.mainserver.entity.UserEntity;
import com.main.mainserver.helper.HttpHelper;
import com.main.mainserver.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.main.mainserver.helper.UserHelper;

@CrossOrigin(value = "http://localhost:3000", allowCredentials = "true")
@RestController
public class UserController {
    @Autowired
    UserService userService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/api/create_user")
    private ResponseEntity<String> createUser(@RequestBody UserEntity userEntity) {
        try {
            UserHelper.validateUserEntityDtoIfAnyEmptyField(userEntity, userService);
            UserHelper.checkIfUserExistsInDb(userEntity, userService);

            UserEntity newUserTemplate = UserHelper.createNewUserTemplate(userEntity);
            String hashedUserPassword = UserHelper.hashUserPassword(userEntity.getPassw(), passwordEncoder);
            newUserTemplate.setPassw(hashedUserPassword);

            UserHelper.saveUserToDb(userEntity, userService);
            return new ResponseEntity<>("User has been created", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/api/login_user")
    private ResponseEntity<String> loginUser(@RequestBody LoginDto loginDao, HttpServletResponse response) {
        try{
            UserHelper.validateUserLoginDtoIfAnyEmptyField(loginDao, userService);
            UserHelper.validateUserMailSyntax(loginDao.getMail(), userService);
            UserEntity userFromDb = UserHelper.getUserFromDbByUserMail(loginDao.getMail(), userService);
            UserHelper.continueIfUserPasswordInDbMatchesWithThat(loginDao.getPassw(), userFromDb.getPassw());

            String randomUserId = UserHelper.generateRandomUserId();
            ResponseCookie cookie = HttpHelper.generateResponseCookieFromUserId(randomUserId);
            response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());

            SessionEntity sEntity = UserHelper.generateUserSessionEntity(randomUserId, userFromDb.getUserName());
            UserHelper.saveUserSession(sEntity, userService);

            return new ResponseEntity<>("login is successful", HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
        }
    }
    @PostMapping("/api/authenticate")
    private ResponseEntity<String> authenticateUser(@RequestBody AuthenticateDto autDao) {
        try{
            UserHelper.checkIfUserCookieIsNull(autDao.getCookieData());
            UserHelper.checkIfUserSessionAlreadyExists(autDao.getCookieData(), userService);

            String authenticatedUsername = UserHelper.getUsernameByUserCookie(autDao.getCookieData(), userService);

            return new ResponseEntity<>(authenticatedUsername, HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
        }
    }
}
