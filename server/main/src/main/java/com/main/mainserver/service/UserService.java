package com.main.mainserver.service;

import com.main.mainserver.entity.SessionEntity;
import com.main.mainserver.entity.UserEntity;
import com.main.mainserver.entity.VideosEntity;
import com.main.mainserver.repository.SessionRepository;
import com.main.mainserver.repository.VideosRepository;
import com.main.mainserver.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    SessionRepository sessionRepository;
    VideosRepository videosRepository;
    public UserEntity saveUser(UserEntity userEntity){
        return userRepository.save(userEntity);
    }
    public void deleteUser(UserEntity userEntity){
        userRepository.delete(userEntity);
    }
    public void updateUser(UserEntity userEntity){
        userRepository.save(userEntity);
    }
    public UserEntity findUser(String userName){
        return userRepository.findByUserName(userName);
    }
    public UserEntity findByUserMail(String userMail){
        return userRepository.findByMail(userMail);
    }
    public void createUserDirectory(Long userId){
        File directory = new File("/media/chill/D/game-masters/users/"+userId);
        directory.mkdirs();
    }
    public List<VideosEntity> getAllUsers(){
        return videosRepository.findAll();
    }

    public boolean validateEmail(String email) {
        Pattern pattern = Pattern.compile("^[\\w.]+@gmail\\.com$");
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }
    public void saveUserSession(SessionEntity sessionEntity){
        sessionRepository.save(sessionEntity);
    }
    public boolean isUserSessionExists(String sessionId){
        return sessionRepository.existsById(sessionId);
    }
    public String findUserNameByCookieData(String sessionId){
        return sessionRepository.findById(sessionId).get().getName();
    }
}
