package com.DuTongChitongYutong.EverybodyChachapark.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "회원이 존재하지 않습니다."),
    MEMBER_EXISTS(409, "이미 존재하는 회원 입니다."),
    PRODUCT_NOT_FOUND(404, "상품이 존재하지 않습니다."),
    REVIEW_NOT_FOUND(404, "리뷰가 존재하지 않습니다."),
    REVIEW_SCORE_EXISTS(409, "이미 리뷰에 평가를 했습니다."),
    PRODUCT_SCORE_EXISTS(409, "이미 추천 된 상품입니다."),
    REVIEW_UPDATE_NO_PERMISSION(404, "리뷰 작성자만 리뷰를 수정할 수 있습니다."),
    REVIEW_DELETE_NO_PERMISSION(404, "리뷰 작성자만 리뷰를 삭제할 수 있습니다.");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
