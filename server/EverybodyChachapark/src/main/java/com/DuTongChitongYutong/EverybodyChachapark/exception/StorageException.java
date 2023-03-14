package com.DuTongChitongYutong.EverybodyChachapark.exception;

import lombok.Getter;

@Getter
public class StorageException extends RuntimeException{

    private StorageExceptionCode storageExceptionCode;

    public StorageException(StorageExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.storageExceptionCode = exceptionCode;
    }
}
