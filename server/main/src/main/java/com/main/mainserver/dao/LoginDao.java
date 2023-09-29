package com.main.mainserver.dao;

import jakarta.persistence.Entity;
import lombok.*;

@Getter
@Setter
public class LoginDao {
    private String mail;
    private String passw;
}
