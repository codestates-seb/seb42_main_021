package com.DuTongChitongYutong.EverybodyChachapark.slice.file;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import static org.hamcrest.MatcherAssert.*;
import static org.hamcrest.Matchers.is;

public class ImageFileTest {
    //    log.info(file.getContentType())
    @Test
    public void getMockExcelUploadTest() throws IOException {
        /*MockMultipartHttpServletRequest multipartHttpServletRequest = new MockMultipartHttpServletRequest();*/ // controller test 시 사용
        String fileName = "NotfoundImage";
        String mimeType = "image/";
        String contentType = "jpg";
        String filePath = "src/test/resources/file/" + fileName + "." + contentType;
        MockMultipartFile mockMultipartFile = getMockMultipartFile(fileName, contentType, filePath);

        String getFileName = mockMultipartFile.getOriginalFilename().toLowerCase();
        String getFileContentName = mockMultipartFile.getContentType().toLowerCase();

        System.out.println(getFileName);
        System.out.println(getFileContentName);
        System.out.println(Files.probeContentType(Paths.get(getFileName)));
        System.out.println(getFileContentName.substring(2));

        assertThat(getFileName, is(fileName.toLowerCase() + "." + contentType));

    }

    private MockMultipartFile getMockMultipartFile(String fileName, String contentType, String path) throws IOException {
        FileInputStream fileInputStream = new FileInputStream(new File(path));
        return new MockMultipartFile(fileName, fileName + "." + contentType, contentType, fileInputStream);
    }

}
