package com.main.mainserver.service;

import com.main.mainserver.entity.UserEntity;
import com.main.mainserver.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;
    public String saveUser(UserEntity userEntity){
        return userRepository.save(userEntity).getUserName();
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
}
