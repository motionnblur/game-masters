package com.main.mainserver.helper;

import com.main.mainserver.dto.AuthenticateDto;
import com.main.mainserver.dto.LoginDto;
import com.main.mainserver.entity.SessionEntity;
import com.main.mainserver.entity.UserEntity;
import com.main.mainserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.UUID;

public class UserHelper {
    @Autowired
    private PasswordEncoder passwordEncoder;

    public static void validateUserEntityDtoIfAnyEmptyField(UserEntity userEntity, UserService userService) throws Exception {
        if (userEntity.getUserName() == null || userEntity.getPassw() == null || userEntity.getMail() == null || userEntity.getLastName() == null)
            throw new Exception("please fill all the fields");
        if (!userService.validateEmail(userEntity.getMail()))
            throw new Exception("please write a valid mail");
    }
    public static void validateUserLoginDtoIfAnyEmptyField(LoginDto loginDto, UserService userService) throws Exception {
        if (loginDto.getMail() == null || loginDto.getPassw() == null)
            throw new Exception("please fill all the fields");
    }
    public static void validateUserMailSyntax(String mail, UserService userService) throws Exception {
        if (!userService.validateEmail(mail))
            throw new Exception("please write a valid mail");
    }
    public static void checkIfUserExistsInDb(UserEntity userEntity, UserService userService) throws Exception {
        if (userService.findByUserMail(userEntity.getMail()) != null)
            throw new Exception("user with that mail already exists");
    }
    public static UserEntity createNewUserTemplate(UserEntity userEntity) {
        UserEntity newUser = new UserEntity();
        newUser.setUserName(userEntity.getUserName());
        newUser.setLastName(userEntity.getLastName());
        newUser.setMail(userEntity.getMail());
        newUser.setPassw(userEntity.getPassw());
        return newUser;
    }
    public static String hashUserPassword(String passwordToHash, PasswordEncoder passwordEncoder) {
        return passwordEncoder.encode(passwordToHash);
    }
    public static void saveUserToDb(UserEntity userEntity, UserService userService) throws Exception {
        UserEntity savedUserEntity = userService.saveUser(userEntity);
        if(savedUserEntity == null)
            throw new Exception("user could not be saved");
    }
    public static void continueIfUserPasswordInDbMatchesWithThat(String pwCurrent, String pwFromUser) throws Exception {
        if(!pwCurrent.matches(pwFromUser))
            throw new Exception("password could not matched");
    }
    public static UserEntity getUserFromDbByUserMail(String userMail, UserService userService) throws Exception {
        UserEntity userEntity = userService.findByUserMail(userMail);
        if (userEntity == null)
            throw new Exception("user with that mail could not be founded");
        return userEntity;
    }
    public static String generateRandomUserId(){
        return UUID.randomUUID().toString();
    }
    public static SessionEntity generateUserSessionEntity(String userId, String userName){
        SessionEntity sEntity = new SessionEntity();
        sEntity.setId(userId);
        sEntity.setName(userName);
        return sEntity;
    }
    public static void saveUserSession(SessionEntity sEntity, UserService userService){
        userService.saveUserSession(sEntity);
    }
    public static void checkIfUserCookieIsNull(String userCookieData) throws Exception {
        if(userCookieData == null)
            throw new Exception("user cookie is null");
    }
    public static void checkIfUserSessionAlreadyExists(String userCookieData, UserService userService) throws Exception {
        if(!userService.isUserSessionExists(userCookieData))
            throw new Exception("user session could not be found");
    }
    public static String getUsernameByUserCookie(String userName, UserService userService) throws Exception {
        if(userName == null)
            throw new Exception("user session could not be found");

        return userService.findUserNameByCookieData(userName);
    }
}
