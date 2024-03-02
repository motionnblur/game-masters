package com.main.mainserver.helper;

import com.main.mainserver.entity.SessionEntity;
import org.springframework.http.ResponseCookie;

import java.time.Duration;

public class HttpHelper {
    public static ResponseCookie generateResponseCookieFromUserId(String randomId){
        return ResponseCookie.from("user-id", randomId) // key & value
                .httpOnly(false)
                .secure(false)
                .domain("localhost")
                .path("/")
                .maxAge(Duration.ofHours(1))
                .sameSite("Strict")  // sameSite
                .build()
                ;
    }
}
