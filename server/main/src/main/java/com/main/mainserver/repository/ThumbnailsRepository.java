package com.main.mainserver.repository;

import com.main.mainserver.entity.ThumbnailsEntity;
import com.main.mainserver.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ThumbnailsRepository extends JpaRepository<ThumbnailsEntity, Long> {
    List<ThumbnailsEntity> findByUserEntity(UserEntity userEntity);
}
