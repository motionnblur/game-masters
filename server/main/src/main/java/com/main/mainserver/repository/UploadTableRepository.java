package com.main.mainserver.repository;

import com.main.mainserver.entity.UserEntity;
import com.main.mainserver.entity.VideosEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UploadTableRepository extends JpaRepository<VideosEntity, Long> {
    List<VideosEntity> findByUserEntity(UserEntity userEntity);
    VideosEntity findByFileName(String fileName);
}
