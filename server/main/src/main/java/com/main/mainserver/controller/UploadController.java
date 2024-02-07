package com.main.mainserver.controller;

import com.main.mainserver.dao.UploadStatus;
import com.main.mainserver.entity.UserEntity;
import com.main.mainserver.entity.VideosEntity;
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
    private @ResponseBody List<VideosEntity> getUserTable(@RequestParam String userName){
        UserEntity user = userService.findUser(userName);
        return uploadTableRepository.findByUserEntity(user);
    }

    @PostMapping("/api/updateUploadTable")
    private String upload(@RequestBody UploadStatus uploadStatus){
        VideosEntity temp = uploadTableRepository.findByFileName(uploadStatus.getFileName());
        if(temp != null)
            return "same data exist";

        UserEntity user = userService.findUser(uploadStatus.getUserName());
        VideosEntity videosEntity = new VideosEntity();
        videosEntity.setUserEntity(user);
        videosEntity.setFileName(uploadStatus.getFileName());
        videosEntity.setFilePath(uploadStatus.getFilePath());

        uploadTableRepository.save(videosEntity);

        return "uploaded";
    }

    @GetMapping("/api/getAllVideos")
    private List<VideosEntity> getAllVideos(){
        List<VideosEntity> userEntityList;
        userEntityList = uploadTableRepository.findAll();

        return userEntityList;
    }
}
