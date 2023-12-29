package com.example.uploadingfiles.Controllers;

import com.example.uploadingfiles.Configs.UploadGuard;
import com.example.uploadingfiles.Core.storage.AsyncUploadNotifier;
import com.example.uploadingfiles.Core.storage.StorageProperties;
import com.example.uploadingfiles.Core.storage.StorageService;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;

@CrossOrigin(value = "http://localhost:3000", allowCredentials = "true")
@Controller
public class FileSendController {
    private final StorageService storageService;
    private final StorageProperties storageProperties;

    @Autowired
    public FileSendController(
            StorageService storageService,
            StorageProperties storageProperties
    ) {
        this.storageService = storageService;
        this.storageProperties = storageProperties;
    }
    @GetMapping("/video")
    @ResponseBody
    public ResponseEntity<Resource> getVideo() throws IOException {
        Resource file = storageService.loadAsResource("A.webm", "can");
        if(file==null)
            return ResponseEntity.notFound().build();
        return ResponseEntity.ok(new ByteArrayResource(file.getContentAsByteArray()));
    }
    @GetMapping("/getFile/{fileName}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String fileName) {

        Resource file = storageService.loadAsResource(fileName, "can");

        if (file == null)
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }

    @GetMapping("/getVideoImg")
    @ResponseBody
    public String  getVideoImg(@RequestParam("fileName") String fileName,
                                              @RequestParam("userName") String userName) throws IOException {
        Resource file = storageService.loadAsResource(fileName+".png", userName);
        byte[] decodeBase64 = file.getContentAsByteArray();

        return Base64.encodeBase64String(decodeBase64);
    }
}
