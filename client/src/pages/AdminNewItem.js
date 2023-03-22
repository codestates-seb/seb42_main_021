import styled from 'styled-components';
import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import Main from '../components/main/Main';
import MainLayout from '../components/main/MainLayout';
import Footer from '../components/main/Footer';
import ProductEditor from '../components/ui/ProductEditor';

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
  z-index: 1000;
  button {
    width: 100px;
    height: 40px;
    border-radius: var(--bd-rd);
    background-color: var(--blue);
    color: var(--white);
  }
`;

const AdminNewItem = () => {
  const [category, setCategory] = useState('선택해주세요');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [text, setText] = useState('');
  const [status, setStatus] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [cookies, setCookie, removeCookie] = useCookies();

  const navigate = useNavigate();
  const imgRef = useRef();
  const { state } = useLocation();

  useEffect(() => {
    setName(state.productName || '');
    setPrice(state.price ? Number(state.price).toLocaleString('ko-KR') : '');
    setImage(state.thumbnailImageURL || '');
    setCategory(state.productCategory || '');
    setText(state.productDetail || '');
    setStatus(state.productStatus || '');
    setSubTitle(state.subtitle || '');
  }, [
    state.productName,
    state.price,
    state.thumbnailImageURL,
    state.productCategory,
    state.productDetail,
    state.productStatus,
    state.subtitle,
  ]);

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handlePrice = (event) => {
    const inputValue = event.target.value.replace(/[^0-9]/g, '');
    const formattedPrice = Number(inputValue).toLocaleString('ko-KR');
    setPrice(formattedPrice);
  };

  const handleSubtitle = (event) => {
    setSubTitle(event.target.value);
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

  const handleText = (contents) => {
    setText(contents);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (category === '선택해주세요') {
      window.alert('상품 카테고리를 선택해주세요.');
      return;
    } else if (status === '선택해주세요') {
      window.alert('상품 판매 상태를 선택해주세요.');
      return;
    } else if (image === null) {
      window.alert('상품 대표 이미지를 첨부해주세요.');
      return;
    } else if (text === '') {
      window.alert('상품 상세 설명을 입력해주세요.');
      return;
    } else if (subTitle === '') {
      window.alert('상품 부제목을 입력해주세요.');
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
      navigate('/product');
      return;
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
    navigate('/product');
    return;
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
                <label>상품 카테고리</label>
                <select value={category} onChange={handleCategory}>
                  <option value="선택해주세요">선택해주세요</option>
                  <option value="TENT">텐트</option>
                  <option value="CHAIR">체어</option>
                  <option value="TABLE">테이블</option>
                  <option value="LIGHT">조명</option>
                  <option value="FIREPLACE">화로대</option>
                </select>
              </div>
              <div>
                <label>상품 판매 상태</label>
                <select value={status} onChange={handleStatus}>
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
                  onChange={handleName}
                  value={name}
                  required
                />
              </div>
              <div>
                <label htmlFor="가격">상품 부제목</label>
                <ContentInput
                  type="text"
                  value={subTitle}
                  onChange={handleSubtitle}
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
              <ItemDescription handleText={handleText} text={text} />
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
