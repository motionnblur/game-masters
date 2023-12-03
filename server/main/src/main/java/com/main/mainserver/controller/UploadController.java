package com.main.mainserver.controller;

import com.main.mainserver.dao.UploadStatus;
import com.main.mainserver.entity.UserEntity;
import com.main.mainserver.entity.UserTableEntity;
import com.main.mainserver.repository.UploadTableRepository;
import com.main.mainserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(value = "http://localhost:3000", allowCredentials = "true")
@RestController
public class UploadController {
    @Autowired
    UserService userService;
    @Autowired
    UploadTableRepository uploadTableRepository;
    @GetMapping("/api/getUploadTable")
    private @ResponseBody List<UserTableEntity> getUserTable(@RequestParam String userName){
        UserEntity user = userService.findUser(userName);
        return uploadTableRepository.findByUserEntity(user);
    }

    @PostMapping("/api/updateUploadTable")
    private String upload(@RequestBody UploadStatus uploadStatus){
        UserEntity user = userService.findUser(uploadStatus.getUserName());
        UserTableEntity userTableEntity = new UserTableEntity();
        userTableEntity.setUserEntity(user);
        userTableEntity.setFileName(uploadStatus.getFileName());
        userTableEntity.setFilePath(uploadStatus.getFilePath());

        uploadTableRepository.save(userTableEntity);

        return "uploaded";
    }
}
