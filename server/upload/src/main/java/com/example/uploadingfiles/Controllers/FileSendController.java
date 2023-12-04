package com.example.uploadingfiles.Controllers;

import com.example.uploadingfiles.Configs.UploadGuard;
import com.example.uploadingfiles.Core.storage.AsyncUploadNotifier;
import com.example.uploadingfiles.Core.storage.StorageProperties;
import com.example.uploadingfiles.Core.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;

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
    @GetMapping("/getFile")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@RequestParam("fileName") String fileName,
                                              @RequestParam("userName") String userName) {

        Resource file = storageService.loadAsResource(fileName, userName);

        if (file == null)
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }

    @GetMapping("/getFilePath")
    @ResponseBody
    public String path(){
        Path filePath = Paths.get(storageProperties.getLocation()+"/"+"can").resolve(
                        Paths.get("30 Minute Timer.webm"))
                .normalize().toAbsolutePath();
        return filePath.toString();
    }
}
