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
        String fileName = "1da132fb-23a4-41ad-a696-f4877e35d9201111";
        String contentType = "gif";
        String filePath = "src/test/resources/1da132fb-23a4-41ad-a696-f4877e35d9201.gif";
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
