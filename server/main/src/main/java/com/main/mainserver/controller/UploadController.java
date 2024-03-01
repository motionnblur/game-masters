package com.main.mainserver.controller;

import com.main.mainserver.dto.UploadStatusDto;
import com.main.mainserver.entity.ThumbnailsEntity;
import com.main.mainserver.entity.UserEntity;
import com.main.mainserver.entity.VideosEntity;
import com.main.mainserver.repository.ThumbnailsRepository;
import com.main.mainserver.repository.VideosRepository;
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
    VideosRepository videosRepository;
    @Autowired
    ThumbnailsRepository thumbnailsRepository;
    @GetMapping("/api/getUploadTable")
    private @ResponseBody List<VideosEntity> getUserTable(@RequestParam String userName){
        UserEntity user = userService.findUser(userName);
        return videosRepository.findByUserEntity(user);
    }
    @PostMapping("/api/updateUploadTable")
    private String upload(@RequestBody UploadStatusDto uploadStatus){
        VideosEntity temp = videosRepository.findByFileName(uploadStatus.getFileName());
        if(temp != null)
            return "same data exist";

        UserEntity user = userService.findUser(uploadStatus.getUserName());
        VideosEntity videosEntity = new VideosEntity();
        videosEntity.setUserEntity(user);
        videosEntity.setFileName(uploadStatus.getFileName());
        videosEntity.setFilePath(uploadStatus.getFilePath());

        videosRepository.save(videosEntity);

        ThumbnailsEntity thumbnailEntity = new ThumbnailsEntity();
        thumbnailEntity.setUserEntity(user);
        thumbnailEntity.setUserName(user.getUserName());
        thumbnailEntity.setThumbnailName(uploadStatus.getFileName());
        thumbnailEntity.setThumbnailPath(uploadStatus.getFilePath());

        thumbnailsRepository.save(thumbnailEntity);

        return "uploaded";
    }
    @GetMapping("/api/getAllVideos")
    private List<VideosEntity> getAllVideos(){
        List<VideosEntity> userEntityList;
        userEntityList = videosRepository.findAll();

        return userEntityList;
    }
    @GetMapping("/api/getAllThumbnails")
    private List<ThumbnailsEntity> getAllThumbnails(){
        List<ThumbnailsEntity> thumbnailsEntityList;
        thumbnailsEntityList = thumbnailsRepository.findAll();

        return thumbnailsEntityList;
    }
}
