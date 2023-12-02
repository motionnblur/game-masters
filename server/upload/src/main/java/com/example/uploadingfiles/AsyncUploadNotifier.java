package com.example.uploadingfiles;

import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.net.URI;
import java.util.HashMap;
import java.util.Map;

@Service
public class AsyncUploadNotifier {
    String url = "http://spring:8080/api/updateUploadTable";
    @Async
    public void sendAsyncNotification(String fileName, String filePath, String userName){
        RestTemplate restTemplate = new RestTemplate();
        Map<String, Object> requestBody = new HashMap<>();

        requestBody.put("fileName", fileName);
        requestBody.put("filePath", filePath);
        requestBody.put("userName", userName);

        ResponseEntity<String> response = restTemplate.postForEntity(url, requestBody, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            System.out.println("User table updated successfully");
        } else {
            System.out.println("Failed to update user table: " + response.getStatusCode());
        }
    }
}
