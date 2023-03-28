package com.DuTongChitongYutong.EverybodyChachapark.exception;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import org.apache.tomcat.util.http.fileupload.impl.FileSizeLimitExceededException;
import org.apache.tomcat.util.http.fileupload.impl.SizeLimitExceededException;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;

import javax.validation.ConstraintViolation;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@JsonInclude(value = JsonInclude.Include.NON_NULL)
public class ErrorResponse {

    private int status;
    private String message;
    private List<FieldError> fieldErrors;
    private List<ConstraintViolationError> violationErrors;

    public ErrorResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }

    public ErrorResponse(int status, List<FieldError> fieldErrors, List<ConstraintViolationError> violationErrors) {
        this.status = status;
        this.fieldErrors = fieldErrors;
        this.violationErrors = violationErrors;
    }

    public static ErrorResponse of (BindingResult bindingResult) {
        return new ErrorResponse(400,FieldError.of(bindingResult), null);
    }

    public static ErrorResponse of (Set<ConstraintViolation<?>> violations) {
        return new ErrorResponse(400,null, ConstraintViolationError.of(violations));
    }

    public static ErrorResponse of (ExceptionCode exceptionCode) {
        return new ErrorResponse(exceptionCode.getStatus(), exceptionCode.getMessage());
    }

    public static ErrorResponse of (StorageExceptionCode exceptionCode) {
        return new ErrorResponse(exceptionCode.getStatus(), exceptionCode.getMessage());
    }

    public static ErrorResponse of (FileSizeLimitExceededException fileSizeException) {
        return new ErrorResponse(400, "요청하신 파일의 크기가 허용치에 초과되었습니다. " + "요청 크기: " + String.format("%.3f", ((double)fileSizeException.getActualSize()) / 1048576) + "MB, 허용 크기: 10MB");
    }

    public static ErrorResponse of (SizeLimitExceededException fileSizeException) {
        return new ErrorResponse(400, "요청하신 파일의 크기가 허용치에 넘어섰습니다. "  + "요청 크기: " + String.format("%.3f", ((double)fileSizeException.getActualSize()) / 1048576) + "MB, 허용 크기: 10MB");
    }

    public static ErrorResponse of (HttpStatus httpStatus) {
        return new ErrorResponse(httpStatus.value(), httpStatus.getReasonPhrase());
    }

    public static ErrorResponse of (HttpStatus httpStatus, String message) {
        return new ErrorResponse(httpStatus.value(), message);
    }

    @Getter
    @JsonInclude(value = JsonInclude.Include.NON_NULL)
    public static class FieldError {
        private String field;
        private Object rejectedValue;
        private String reason;

        private FieldError(String field, Object rejectedValue, String reason) {
            this.field = field;
            this.rejectedValue = rejectedValue;
            this.reason = reason;
        }

        public static List<FieldError> of (BindingResult bindingResult) {
            final List<org.springframework.validation.FieldError> fieldErrors = bindingResult.getFieldErrors();

            return fieldErrors.stream()
                    .map(error -> new FieldError(
                            error.getField(),
                            error.getRejectedValue() == null ? "" : error.getRejectedValue().toString(),
                            error.getDefaultMessage()))
                    .collect(Collectors.toList());
        }
    }

    @Getter
    @JsonInclude(value = JsonInclude.Include.NON_NULL)
    public static class ConstraintViolationError {
        private String propertyPath;
        private Object rejectedValue;
        private String reason;

        public ConstraintViolationError(String propertyPath, Object rejectedValue, String reason) {
            this.propertyPath = propertyPath;
            this.rejectedValue = rejectedValue;
            this.reason = reason;
        }

        public static List<ConstraintViolationError> of(Set<ConstraintViolation<?>> constraintViolations) {
            return constraintViolations.stream()
                    .map(constraintViolation -> new ConstraintViolationError(
                            constraintViolation.getPropertyPath().toString(),
                            constraintViolation.getInvalidValue().toString(),
                            constraintViolation.getMessage()))
                    .collect(Collectors.toList());
        }
    }
}
