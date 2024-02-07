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
public class ThumbnailsEntity {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String ownerId;
    private String thumbnailName;
    private String thumbnailPath;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name="userEntity_id", nullable=false)
    UserEntity userEntity;
}
