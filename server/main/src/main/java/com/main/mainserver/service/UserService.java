package com.main.mainserver.service;

import com.main.mainserver.entity.UserEntity;
import com.main.mainserver.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
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

    public boolean validateEmail(String email) {
        Pattern pattern = Pattern.compile("^[\\w.]+@gmail\\.com$");
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }
}
