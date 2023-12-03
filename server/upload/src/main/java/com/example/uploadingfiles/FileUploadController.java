package com.example.uploadingfiles;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Collectors;

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
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.uploadingfiles.storage.StorageFileNotFoundException;
import com.example.uploadingfiles.storage.StorageService;


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

	@GetMapping("/files/{filename:.+}")
	@ResponseBody
	public ResponseEntity<Resource> serveFile(@PathVariable String filename) {

		Resource file = storageService.loadAsResource(filename);

		if (file == null)
			return ResponseEntity.notFound().build();

		return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
				"attachment; filename=\"" + file.getFilename() + "\"").body(file);
	}

	@PostMapping("/upload")
	public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file,
			@RequestParam("userName") String userName){
		if(!uploadGuard.isVideoFile(file.getOriginalFilename()))
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		storageService.store(file, userName);

		Path destinationFile = Paths.get("upload-dir/"+userName).resolve(
						Paths.get(file.getOriginalFilename()))
				.normalize().toAbsolutePath();

		asyncUploadNotifier.sendAsyncNotification(file.getOriginalFilename(), destinationFile.toString(), userName);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@ExceptionHandler(StorageFileNotFoundException.class)
	public ResponseEntity<?> handleStorageFileNotFound(StorageFileNotFoundException exc) {
		return ResponseEntity.notFound().build();
	}

}
