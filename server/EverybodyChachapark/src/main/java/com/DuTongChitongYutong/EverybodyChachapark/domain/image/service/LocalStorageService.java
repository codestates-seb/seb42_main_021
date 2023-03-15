package com.DuTongChitongYutong.EverybodyChachapark.domain.image.service;

import com.DuTongChitongYutong.EverybodyChachapark.exception.StorageException;
import com.DuTongChitongYutong.EverybodyChachapark.exception.StorageExceptionCode;
import com.DuTongChitongYutong.EverybodyChachapark.storage.event.FileCopyEvent;
import com.DuTongChitongYutong.EverybodyChachapark.storage.event.FileDeletesEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.ApplicationEventPublisherAware;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
public class LocalStorageService implements StorageService, ApplicationEventPublisherAware {
    @Value("${image.server-url}")
    private String serverUrl;

    @Value("${image.local-path}")
    private String localPath;

    private ApplicationEventPublisher publisher; // <- 이벤트 프로그래밍: 고급 기술 블로깅 요망

    @Override
    public void setApplicationEventPublisher(ApplicationEventPublisher applicationEventPublisher) {
        this.publisher = applicationEventPublisher;
    }

    @Override
    public String store(MultipartFile file) {
        Map<String, MultipartFile> fileMap = new HashMap<>();
        if(file.isEmpty()) { // 이미지를 첨부하지 않았다면 더미 페이지 리턴
            return localPath + "e7dd60dc-45ab-473a-a752-dc356f48a77e.jpg";
        }

        if(!file.getContentType().startsWith("image")) {
            throw new StorageException(StorageExceptionCode.FILE_TYPE_ONLY_IMAGE);
        }

        String imageName = file.getOriginalFilename();

        // 사용할 파일 이름, UUID 사용
        String fileName = UUID.randomUUID() + ".";
        fileName = fileName + imageName.substring(imageName.lastIndexOf(".") + 1).toLowerCase().replace("jepg", "jpg");

        // 파일 이름과 MultipartFile 저장
        fileMap.put(fileName, file);

        publisher.publishEvent(new FileCopyEvent(this, fileMap)); // 이벤트 실행

        // Todo: 이미지 URL 리턴
        return serverUrl + fileName;
    }

    @Override
    public List<String> store(List<MultipartFile> files) {
        List<String> imageURLs = new ArrayList<>();
        Map<String, MultipartFile> fileMap = new HashMap<>();
        for (MultipartFile file: files) {
            if(file.isEmpty()) {
                log.error("File isEmpty");
                continue;
            }

            if(!file.getContentType().startsWith("image")) {
                throw new StorageException(StorageExceptionCode.FILE_TYPE_ONLY_IMAGE);
            }

            String imageName = file.getOriginalFilename();

            // 사용할 파일 이름, UUID 사용
            String fileName = UUID.randomUUID() + ".";
            fileName = fileName + imageName.substring(imageName.lastIndexOf(".") + 1).toLowerCase().replace("jepg", "jpg");

            // 파일 이름과 MultipartFile 저장
            fileMap.put(fileName, file);

            // Todo: 이미지 URL 추가
            imageURLs.add(serverUrl + fileName);
        }

        publisher.publishEvent(new FileCopyEvent(this, fileMap)); // 이벤트 실행

        return imageURLs;
    }

    @Override
    public byte[] load(String imageURL) {
        String fileName = imageURL.replaceFirst(serverUrl, "");

        Path destination = Path.of(localPath, fileName).normalize(); // 경로 설정

        byte[] imageByteArray = null;

        try {
            imageByteArray = Files.readAllBytes(destination); // 파일 읽기

        } catch (IOException e) {
            throw new StorageException(StorageExceptionCode.IMAGE_NOT_FOUND);
        }

        return imageByteArray;
    }

    @Override
    public void delete(List<String> imageURLs) {
        List<String> filenames = imageURLs.stream()
                .map(imageURL -> imageURL.replaceFirst(serverUrl, "")).collect(Collectors.toList());

        publisher.publishEvent(new FileDeletesEvent(this, filenames)); // 이벤트 실행
    }
}
