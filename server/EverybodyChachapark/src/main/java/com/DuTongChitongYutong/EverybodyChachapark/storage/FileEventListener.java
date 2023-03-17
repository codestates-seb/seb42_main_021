package com.DuTongChitongYutong.EverybodyChachapark.storage;

import com.DuTongChitongYutong.EverybodyChachapark.exception.StorageException;
import com.DuTongChitongYutong.EverybodyChachapark.exception.StorageExceptionCode;
import com.DuTongChitongYutong.EverybodyChachapark.storage.event.FileCopyEvent;
import com.DuTongChitongYutong.EverybodyChachapark.storage.event.FileDeletesEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

@Slf4j
@Component
public class FileEventListener {
    @Value("${image.local-path}")
    private String localPath;

    @EventListener
    @Async
    public void processFileCopyEvent(FileCopyEvent event) {
        event.getFileMap().forEach((filename, file) -> {
            // Todo: 파일 저장
            try(InputStream inputStream = file.getInputStream()) {
                Path destination = Path.of(localPath, filename).normalize();
                Files.copy(inputStream, destination, StandardCopyOption.REPLACE_EXISTING);

            } catch (IOException e) {
                log.error("File store Fail", e);
            }
        });

        log.info("File store success");
    }

    @EventListener
    @Async
    public void processFileDeleteEvent(FileDeletesEvent event) {
        for (String filename : event.getFiles()) {
            if(filename.isEmpty()) {
                continue;
            }

            Path destination = Path.of(localPath, filename).normalize(); // 경로 설정

            try {
                Files.delete(destination); // 파일 삭제
            } catch (IOException e) {
                log.error("File delete Fail");
            }
        }
        log.info("File delete success");
    }
}
