package com.main.mainserver.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.redis.core.RedisHash;

import java.io.Serializable;

@RedisHash(value = "User", timeToLive = 3600)
@Getter
@Setter
public class SessionEntity implements Serializable {
    private String id;
    private String name;
}
