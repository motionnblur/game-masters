package com.example.uploadingfiles.Controllers;

import com.example.uploadingfiles.Configs.UploadGuard;
import com.example.uploadingfiles.Core.storage.AsyncUploadNotifier;
import com.example.uploadingfiles.Core.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

@CrossOrigin(value = "http://localhost:3000", allowCredentials = "true")
@Controller
public class FileSendController {
    private final StorageService storageService;

    @Autowired
    public FileSendController(
            StorageService storageService
    ) {
        this.storageService = storageService;
    }
    @GetMapping("/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {

        Resource file = storageService.loadAsResource(filename);

        if (file == null)
            return ResponseEntity.notFound().build();

        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }
}
