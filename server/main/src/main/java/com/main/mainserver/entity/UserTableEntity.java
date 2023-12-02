package com.main.mainserver.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserTableEntity {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String fileName;
    private String filePath;

    @ManyToOne
    @JoinColumn(name="userEntity_id", nullable=false)
    UserEntity userEntity;
}
