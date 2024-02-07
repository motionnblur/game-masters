package com.main.mainserver.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VideosEntity {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String fileName;
    private String filePath;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name="userEntity_id", nullable=false)
    UserEntity userEntity;
}
