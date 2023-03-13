package com.DuTongChitongYutong.EverybodyChachapark.domain.image.service;

import com.DuTongChitongYutong.EverybodyChachapark.exception.StorageException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.ImageWriter;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Slf4j
@Service
public class LocalStorageService implements StorageService {

    @Value("${image.server-url}")
    private String serverUrl;

    @Override
    public String store(MultipartFile file) {
        if(file.isEmpty()) {
            throw new StorageException("Failed to store empty file.");
        }

        if(!file.getContentType().startsWith("image")) {
            throw new StorageException("Failed to store is not image");
        }

        String imageName = file.getOriginalFilename();

        // 사용할 파일 이름, UUID 사용
        String filename = UUID.randomUUID() + ".";
        filename = filename + imageName.substring(imageName.lastIndexOf(".") + 1).toLowerCase().replace("jepg", "jpg");

        // Todo: 파일 저장
        // Todo: 이미지 URL 리턴

        return serverUrl + filename;

//        if
//
//        // 사용할 파일 이름, UUID 사용
//        String filename = UUID.randomUUID() + ".";
//        filename += file.getContentType().toLowerCase().replace("jpeg", "jpg");
//
//        // 파일 이름과 MultipartFile 저장
//        fileMap.put(filename, image);
//
//        // 파일의 서버 주소 저장
//        urlList.add(serverUrl + filename);
//        }
//
//        // 파일 복사 event publish
//        publisher.publishEvent(new FileCopyEvent(this, fileMap));
//
//        // 파일 주소 반환
//        return urlList;
    }
    @Override
    public void delete() {

    }
}
