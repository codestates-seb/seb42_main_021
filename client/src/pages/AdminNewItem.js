import styled from 'styled-components';
import axios from 'axios';
import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import Main from '../components/main/Main';
import MainLayout from '../components/main/MainLayout';
import ProductEditor from '../components/ui/ProductEditor';
import Footer from '../components/main/Footer';

const PageName = styled.h1`
  margin-bottom: 40px;
  padding-bottom: 5px;
  height: 10%;
  border-bottom: 3px solid var(--border);
`;

const ItemInformationContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90%;
`;

const ItemInformationBox = styled.div`
  width: 100%;
  > div {
    display: flex;
    margin-bottom: 20px;
    width: 100%;
    > label {
      display: block;
      width: 20%;
    }
    select {
      :focus {
        outline: none;
        border: 1px solid var(--grayblue);
        box-shadow: 0 0 0 5px var(--graywhite);
        border-radius: 4px;
      }
    }
    span {
      margin-left: 5px;
    }
    img {
      width: 350px;
    }
  }
`;

const ItemDescriptionBox = styled.div`
  margin-bottom: 100px;
  div {
    margin-bottom: 10px;
  }
`;

const ContentInput = styled.input`
  height: 20px;
  border-radius: 4px;
  margin-right: 10px;
  :focus {
    outline: none;
    border: 1px solid var(--grayblue);
    box-shadow: 0 0 0 5px var(--graywhite);
  }
`;

const ItemDescription = styled(ProductEditor)`
  height: 200px;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: right;
  margin-bottom: 20px;
  button {
    width: 100px;
    height: 40px;
    border-radius: var(--bd-rd);
    background-color: var(--blue);
    color: var(--white);
  }
`;

const AdminNewItem = () => {
  const { state } = useLocation();

  const [category, setCategory] = useState(
    state.productCategory || '선택해주세요'
  );
  const [status, setStatus] = useState(state.productStatus || '선택해주세요');
  const [name, setName] = useState(state.productName || '');
  const [subTitle, setSubTitle] = useState(state.subtitle || '');
  const [price, setPrice] = useState(
    state.price ? Number(state.price).toLocaleString('ko-KR') : ''
  );
  const [image, setImage] = useState(state.thumbnailImageURL || '');
  const [preview, setPreview] = useState('');
  const [text, setText] = useState(state.productDetail || '');

  const [cookies, setCookie, removeCookie] = useCookies();

  const navigate = useNavigate();

  const imgRef = useRef();

  const handlePrice = (event) => {
    const inputValue = event.target.value.replace(/[^0-9]/g, '');
    const formattedPrice = Number(inputValue).toLocaleString('ko-KR');
    setPrice(formattedPrice);
  };

  const handleImageChange = () => {
    const file = imgRef.current.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };

  const handleDismiss = (event) => {
    event.preventDefault();
    imgRef.current.value = '';
    setPreview('');
    setImage(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (category === '선택해주세요') {
      window.alert('상품 카테고리를 선택해주세요.');
      return;
    }
    if (status === '선택해주세요') {
      window.alert('상품 판매 상태를 선택해주세요.');
      return;
    }
    if (text === '') {
      window.alert('상품 상세 설명을 입력해주세요.');
      return;
    }

    const formData = new FormData();
    const accessToken = cookies.accessToken;
    const refreshToken = cookies.refreshToken;

    const header = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
        Refresh: `${refreshToken}`,
      },
    };

    if (state.productName) {
      try {
        formData.append('thumbnailImageFile', image);
        formData.append(
          'productPatchDto',
          new Blob(
            [
              JSON.stringify({
                productName: name,
                subtitle: subTitle,
                price: parseInt(price.replace(/,/g, '')),
                productCategory: category,
                productStatus: status,
                productDetail: text,
              }),
            ],
            {
              type: 'application/json',
            }
          )
        );

        const response = await axios.patch(
          `/products/${state.productId}`,
          formData,
          header
        );
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
      return navigate('/product');
    }

    formData.append('thumbnailImageFile', image);
    formData.append(
      'productPostDto',
      new Blob(
        [
          JSON.stringify({
            productName: name,
            subtitle: subTitle,
            price: parseInt(price.replace(/,/g, '')),
            productCategory: category,
            productStatus: status,
            productDetail: text,
          }),
        ],
        {
          type: 'application/json',
        }
      )
    );

    try {
      const response = await axios.post('/products', formData, header);
      console.log(response.data);
      setCategory('선택해주세요');
      setName('');
      setPrice('');
      setImage('');
      setText('');
      setStatus('');
    } catch (error) {
      console.error(error);
    }
    return navigate('/product');
  };

  return (
    <Main>
      <MainLayout>
        <div>
          <PageName>
            {state.productCategory ? '상품 수정하기' : '상품 등록하기'}
          </PageName>
          <ItemInformationContainer onSubmit={handleSubmit}>
            <ItemInformationBox>
              <div>
                <label htmlFor="상품 카테고리">상품 카테고리</label>
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  <option value="선택해주세요">선택해주세요</option>
                  <option value="TENT">텐트</option>
                  <option value="CHAIR">체어</option>
                  <option value="TABLE">테이블</option>
                  <option value="LIGHT">조명</option>
                  <option value="FIREPLACE">화로대</option>
                </select>
              </div>
              <div>
                <label htmlFor="상품 판매 상태">상품 판매 상태</label>
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                >
                  <option value="선택해주세요">선택해주세요</option>
                  <option value="PRODUCT_FOR_SALE">판매 중</option>
                  <option value="PRODUCT_SOLD_OUT">품절</option>
                  <option value="PRODUCT_STOP">절판</option>
                </select>
              </div>
              <div>
                <label htmlFor="상품명">상품명</label>
                <ContentInput
                  type="text"
                  onChange={(event) => setName(event.target.value)}
                  value={name}
                  required
                />
              </div>
              <div>
                <label htmlFor="가격">상품 부제목</label>
                <ContentInput
                  type="text"
                  value={subTitle}
                  onChange={(event) => setSubTitle(event.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="가격">가격</label>
                <ContentInput
                  type="text"
                  value={price}
                  onChange={handlePrice}
                  required
                />
                <span>원</span>
              </div>
              <div>
                <label htmlFor="대표 이미지">대표 이미지</label>
                <ContentInput
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={imgRef}
                  required
                />
                <button type="button" onClick={handleDismiss}>
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
              <ItemDescription
                handleText={(contents) => setText(contents)}
                text={text}
              />
            </ItemDescriptionBox>
            <ButtonBox>
              <button type="submit">
                {state.productCategory ? '상품 수정하기' : '상품 등록하기'}
              </button>
            </ButtonBox>
          </ItemInformationContainer>
        </div>
        <Footer />
      </MainLayout>
    </Main>
  );
};

export default AdminNewItem;
