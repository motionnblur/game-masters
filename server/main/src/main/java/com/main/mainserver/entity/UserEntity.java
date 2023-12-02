package com.main.mainserver.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserEntity {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String userName;
    private String lastName;
    private String mail;
    private String passw;

    @OneToMany(mappedBy = "userEntity", cascade = CascadeType.ALL)
    private List<UserTableEntity> userTableEntity;
}
