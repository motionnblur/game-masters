package com.example.uploadingfiles.Controllers;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Collectors;

import com.example.uploadingfiles.Core.storage.AsyncUploadNotifier;
import com.example.uploadingfiles.Configs.UploadGuard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import com.example.uploadingfiles.Core.storage.StorageFileNotFoundException;
import com.example.uploadingfiles.Core.storage.StorageService;


@CrossOrigin(value = "http://localhost:3000", allowCredentials = "true")
@Controller
public class FileUploadController {

	private final StorageService storageService;
	private final AsyncUploadNotifier asyncUploadNotifier;
	private final UploadGuard uploadGuard;
	@Autowired
	public FileUploadController(
			StorageService storageService,
			AsyncUploadNotifier asyncUploadNotifier,
			UploadGuard uploadGuard
	) {
		this.storageService = storageService;
		this.asyncUploadNotifier = asyncUploadNotifier;
		this.uploadGuard = uploadGuard;
	}

	@GetMapping("/")
	public String listUploadedFiles(Model model) throws IOException {

		model.addAttribute("files", storageService.loadAll().map(
				path -> MvcUriComponentsBuilder.fromMethodName(FileUploadController.class,
						"serveFile", path.getFileName().toString()).build().toUri().toString())
				.collect(Collectors.toList()));

		return "uploadForm";
	}

	@PostMapping("/upload")
	public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file,
			@RequestParam("userName") String userName){
		if(!uploadGuard.isVideoFile(file.getOriginalFilename()))
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		storageService.store(file, userName);

		Path path = Paths.get("upload-dir/" + userName);
		Path destinationFile = path.resolve(
						Paths.get(file.getOriginalFilename()))
				.normalize().toAbsolutePath();

		ProcessBuilder processBuilder = new ProcessBuilder("ffmpeg", "-ss", "00:00", "-i", destinationFile.toString(),"-vf","scale=320:200", "-vframes", "1", path +"/"+file.getOriginalFilename()+".png");
		try {
			Process process = processBuilder.start();
			BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
			String line;
			while ((line = reader.readLine()) != null) {
				System.out.println(line);
			}
			int exitCode = process.waitFor();
			System.out.println("\nExited with error code : " + exitCode);
		} catch (IOException | InterruptedException e) {
			e.printStackTrace();
		}

		asyncUploadNotifier.sendAsyncNotification(file.getOriginalFilename(), destinationFile.toString(), userName);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@ExceptionHandler(StorageFileNotFoundException.class)
	public ResponseEntity<?> handleStorageFileNotFound(StorageFileNotFoundException exc) {
		return ResponseEntity.notFound().build();
	}

}
