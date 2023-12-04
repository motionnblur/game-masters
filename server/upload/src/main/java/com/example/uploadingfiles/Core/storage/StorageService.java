package com.example.uploadingfiles.Core.storage;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.stream.Stream;

public interface StorageService {

	void init();

	void store(MultipartFile file, String userName);

	Stream<Path> loadAll();

	Path load(String filename);

	Resource loadAsResource(String filename, String userName);

	void deleteAll();

}
