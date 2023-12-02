package com.main.mainserver.dao;

import lombok.Getter;
import lombok.Setter;
import org.springframework.core.io.Resource;

@Getter
@Setter
public class UploadStatus {
    String fileName;
    String filePath;
}
