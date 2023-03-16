package com.DuTongChitongYutong.EverybodyChachapark.exception;

import lombok.Getter;

public enum StorageExceptionCode {
    IMAGE_NOT_FOUND(404, "파일을 찾을 수 없습니다! URL을 확인하세요"),
    IMAGE_STORAGE_FAIL(500, "서버에서 파일 저장을 실패하였습니다."),
    IMAGE_DELETE_FAIL(500, "서버에서 파일 삭제를 실패하였습니다."),
    FILE_TYPE_ONLY_IMAGE(400, "이미지 파일만 요청이 가능합니다");

    @Getter
    private int status;

    @Getter
    private String message;

    StorageExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }

}
