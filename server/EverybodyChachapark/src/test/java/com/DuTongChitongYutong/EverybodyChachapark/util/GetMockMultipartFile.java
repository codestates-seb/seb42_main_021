package com.DuTongChitongYutong.EverybodyChachapark.util;

import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class GetMockMultipartFile {

    public static MockMultipartFile getMockMultipartFile(String paramName) throws IOException {

        String fileName = "NotfoundImage";
        String mimeType = "image/";
        String contentType = "jpg";
        String filePath = "src/test/resources/file/" + fileName + "." + contentType;

        FileInputStream fileInputStream = new FileInputStream(new File(filePath));

        return new MockMultipartFile(paramName, fileName + "." + contentType, mimeType + contentType, fileInputStream);
    }

    public static MockMultipartFile getMockMultipartJson(String paramName, String content) {
        return new MockMultipartFile(paramName, "", "application/json", content.getBytes());
    }
}
