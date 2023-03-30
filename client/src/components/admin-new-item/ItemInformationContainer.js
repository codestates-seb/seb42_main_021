import React from 'react';
import useAdminNewItem from './useAdminNewItem';
import {
  ItemInformationBox,
  ContentInput,
  ItemDescriptionBox,
  ProductEditor,
  ButtonBox,
} from './AdminNewItem.styled';

import { CATEGORY_OPTIONS } from './useAdminNewItem';

function ItemInformationContainer() {
  const {
    onSubmit,
    category,
    onItemInformationChange,
    status,
    name,
    subTitle,
    price,
    preview,
    text,
    onImageChange,
    onDismiss,
    imageRef,
    setText,
    mode,
  } = useAdminNewItem();

  return (
    <ItemInformationContainer onSubmit={onSubmit}>
      <ItemInformationBox>
        <div>
          <label htmlFor="상품 카테고리">상품 카테고리</label>
          <select
            name="category"
            value={category}
            onChange={onItemInformationChange}
            required
          >
            <option value="" disabled>
              선택해주세요
            </option>
            {CATEGORY_OPTIONS.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor="상품 판매 상태">상품 판매 상태</label>
          <select
            name="status"
            value={status}
            onChange={onItemInformationChange}
            required
          >
            <option value="" disabled>
              선택해주세요
            </option>
            <option value="PRODUCT_FOR_SALE">판매 중</option>
            <option value="PRODUCT_SOLD_OUT">품절</option>
            <option value="PRODUCT_STOP">절판</option>
          </select>
        </div>
        <div>
          <label htmlFor="상품명">상품명</label>
          <ContentInput
            name="name"
            value={name}
            onChange={onItemInformationChange}
            required
          />
        </div>
        <div>
          <label htmlFor="상품 부제목">상품 부제목</label>
          <ContentInput
            name="subTitle"
            type="text"
            value={subTitle}
            onChange={onItemInformationChange}
            required
          />
        </div>
        <div>
          <label htmlFor="가격">가격</label>
          <ContentInput
            name="price"
            type="text"
            value={price}
            onChange={onItemInformationChange}
            required
          />
          <span>원</span>
        </div>
        <div>
          <label htmlFor="대표 이미지">대표 이미지</label>
          <ContentInput
            name="image"
            type="file"
            accept="image/*"
            onChange={onImageChange}
            ref={imageRef}
            required
          />
          <button type="button" onClick={onDismiss}>
            삭제하기
          </button>
        </div>
        {preview && (
          <div>
            <label htmlFor="첨부 이미지 미리보기">미리보기</label>
            <img alt="첨부 이미지 미리보기" src={preview} />
          </div>
        )}
      </ItemInformationBox>
      <ItemDescriptionBox>
        <div>상품 상세설명</div>
        <ProductEditor
          handleText={(contents) => setText(contents)}
          text={text}
        />
      </ItemDescriptionBox>
      <ButtonBox>
        <button type="submit">
          {mode === 'edit' ? '상품 수정하기' : '상품 등록하기'}
        </button>
      </ButtonBox>
    </ItemInformationContainer>
  );
}

export default ItemInformationContainer;
