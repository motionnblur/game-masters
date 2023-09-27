package com.main.mainserver.service;

import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Set;

@Service
public class RedisService {

    private final RedisConnectionFactory redisConnectionFactory;

    public RedisService(RedisConnectionFactory redisConnectionFactory) {
        this.redisConnectionFactory = redisConnectionFactory;
    }

    public void saveBasicVariable(String key, String value) {
        RedisConnection redisConnection = redisConnectionFactory.getConnection();
        redisConnection.stringCommands().set(key.getBytes(), value.getBytes());
        redisConnection.close();
    }

    public boolean isThere(String key) {
        RedisConnection redisConnection = redisConnectionFactory.getConnection();
        boolean bool= Boolean.TRUE.equals(redisConnection.setCommands().sIsMember("users".getBytes(), key.getBytes()));
        //System.out.println(values.stream().count());
        redisConnection.close();

        return bool;
    }
}
