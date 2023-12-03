package com.main.mainserver.repository;

import com.main.mainserver.entity.UserEntity;
import com.main.mainserver.entity.UserTableEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UploadTableRepository extends JpaRepository<UserTableEntity, Long> {
    List<UserTableEntity> findByUserEntity(UserEntity userEntity);
    UserTableEntity findByFileName(String fileName);
}
