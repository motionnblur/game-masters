package com.example.uploadingfiles.Configs;

import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class UploadGuard {
    public boolean isVideoFile(String filename) {
        List<String> videoExtensions = Arrays.asList("mp4", "mkv", "flv", "gif", "avi", "mov", "wmv", "webm");
        String extension = filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();

        return videoExtensions.contains(extension);
    }
}
