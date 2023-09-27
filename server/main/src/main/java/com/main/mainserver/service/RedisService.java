package com.main.mainserver.service;

import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.stereotype.Service;

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
    public String getValue(String key) {
        RedisConnection redisConnection = redisConnectionFactory.getConnection();
        byte[] value = redisConnection.stringCommands().get(key.getBytes());
        redisConnection.close();
        return value.toString();
    }
}
