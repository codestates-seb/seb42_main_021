package com.DuTongChitongYutong.EverybodyChachapark.domain.image.service;

import com.DuTongChitongYutong.EverybodyChachapark.exception.StorageException;
import com.DuTongChitongYutong.EverybodyChachapark.exception.StorageExceptionCode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

@Slf4j
@Service
public class LocalStorageService implements StorageService {

    @Value("${image.server-url}")
    private String serverUrl;

    @Value("${image.local-path}")
    private String localPath;

    @Override
    public String store(MultipartFile file) {
        if(file.isEmpty()) { // 이미지를 첨부하지 않았다면 끝!
            return null;
        }

        if(!file.getContentType().startsWith("image")) {
            throw new StorageException(StorageExceptionCode.FILE_TYPE_ONLY_IMAGE);
        }

        String imageName = file.getOriginalFilename();

        // 사용할 파일 이름, UUID 사용
        String fileName = UUID.randomUUID() + ".";
        fileName = fileName + imageName.substring(imageName.lastIndexOf(".") + 1).toLowerCase().replace("jepg", "jpg");

        // Todo: 파일 저장
        try(InputStream inputStream = file.getInputStream()) {
            Path destination = Path.of(localPath, fileName).normalize().toAbsolutePath();
            Files.copy(inputStream, destination, StandardCopyOption.REPLACE_EXISTING);

        } catch (IOException e) {
            throw new StorageException(StorageExceptionCode.IMAGE_NOT_FOUND);
        }

        // Todo: 이미지 URL 리턴
        return serverUrl + fileName;
    }

    @Override
    public byte[] load(String imageUrl) {
        String fileName = imageUrl.replaceFirst(serverUrl, "");

        Path destination = Path.of(localPath, fileName).normalize().toAbsolutePath(); // 경로 설정

        byte[] imageByteArray = null;

        try {
            imageByteArray = Files.readAllBytes(destination); // 파일 읽기

        } catch (IOException e) {
            log.error("파일 로드 실패");
            throw new StorageException(StorageExceptionCode.IMAGE_NOT_FOUND);
        }

        return imageByteArray;
    }

    @Override
    public void delete(String imageUrl) {
        String fileName = imageUrl.replaceFirst(serverUrl, "");

        Path destination = Path.of(localPath, fileName).normalize().toAbsolutePath(); // 경로 설정

        try {
            Files.delete(destination); // 파일 삭제
        } catch (IOException e) {
            log.error("파일 삭제 실패", e);
        }

    }
}
