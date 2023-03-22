package com.DuTongChitongYutong.EverybodyChachapark.exception;

import lombok.Getter;

public enum ExceptionCode {

    // 회원 관련 예외
    TOKEN_NOT_VALID(401, "유효하지 않은 토큰입니다."),
    MEMBER_NOT_FOUND(404, "회원이 존재하지 않습니다."),
    MEMBER_EXISTS(409, "이미 존재하는 회원 입니다."),
    MEMBER_NICKNAME_EXISTS(409, "이미 존재하는 닉네임 입니다."),
    MEMBER_NO_PERMISSION(403, "인가되지 않은 사용자 입니다"),

    // 상품 관련 예외
    PRODUCT_NOT_FOUND(404, "상품이 존재하지 않습니다."),

    // 장바구니 관련 예외
    CART_PRODUCT_EXISTS(409, "이미 장바구니에 담은 상품 입니다."),

    // 리뷰 관련 예외
    REVIEW_NOT_FOUND(404, "리뷰가 존재하지 않습니다."),
    REVIEW_SCORE_EXISTS(409, "이미 리뷰에 평가를 했습니다."),
    PRODUCT_SCORE_EXISTS(409, "이미 추천 된 상품입니다."),
    REVIEW_UPDATE_NO_PERMISSION(403, "리뷰 작성자만 리뷰를 수정할 수 있습니다."),
    REVIEW_DELETE_NO_PERMISSION(403, "리뷰 작성자만 리뷰를 삭제할 수 있습니다."),

    // 이미지 관련 예외
    JSON_CANNOT_WRITE_IMAGE_URLS(500, "이미지 주소를 쓸 수 없습니다."),
    JSON_CANNOT_READ_IMAGE_URLS(500, "이미지 주소를 읽을 수 없습니다."),

    // 주문 관련 예외
    ORDER_CANNOT_CANCEL(403, "이미 주문을 완료해서 취소할 수 없습니다."),
    ORDER_ALREADY_CANCELED(403, "이미 취소된 주문입니다"),

    // 테스트
    TOKEN_NOT_FOUND(401, "토큰을 찾을 수 없습니다");


    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
