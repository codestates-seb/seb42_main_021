import instance from '../components/newAxios';
import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Main from '../components/main/Main';
import MainLayout from '../components/main/MainLayout';
import ProductEditor from '../components/ui/ProductEditor';
import Footer from '../components/main/Footer';
import {
  ButtonBox,
  ContentInput,
  ItemDescriptionBox,
  ItemInformationBox,
  ItemInformationContainer,
  PageName,
} from '../components/admin-new-item/AdminNewItem.styled';

const AdminNewItem = () => {
  const { state } = useLocation();

  const navigate = useNavigate();

  const imgRef = useRef();

  const [itemInformation, setItemInformation] = useState({
    category: state.productCategory || '',
    status: state.productStatus || '',
    name: state.productName || '',
    subTitle: state.subtitle || '',
    price: state.price ? Number(state.price).toLocaleString('ko-KR') : '',
  });
  const [image, setImage] = useState(state.thumbnailImageURL || '');
  const [preview, setPreview] = useState('');
  const [text, setText] = useState(state.productDetail || '');

  const { category, status, name, subTitle, price } = itemInformation;

  const handleImageChange = () => {
    const file = imgRef.current.files[0];
    if (file === null) {
      return;
    }
    setImage(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };

  const handleItemInformationChange = (event) => {
    const { value, name } = event.target;
    if (name === 'price') {
      const inputValue = value.replace(/[^0-9]/g, '');
      const formattedPrice = Number(inputValue).toLocaleString('ko-KR');
      return setItemInformation({
        ...itemInformation,
        [name]: formattedPrice,
      });
    }
    setItemInformation({
      ...itemInformation,
      [name]: value,
    });
  };

  const initializeImageState = () => {
    imgRef.current.value = '';
    setPreview('');
    setImage('');
  };

  const initializeTextState = () => {
    setItemInformation({
      category: '',
      status: '',
      name: '',
      subTitle: '',
      price: '',
    });
    setText('');
  };

  const handleDismiss = (event) => {
    event.preventDefault();
    initializeImageState();
  };

  const handleCreateItem = () => {
    const newItem = new FormData();
    const itemDetails = {
      productName: name,
      subtitle: subTitle,
      price: parseInt(price.replace(/,/g, '')),
      productCategory: category,
      productStatus: status,
      productDetail: text,
    };
    newItem.append(
      'productPostDto',
      new Blob([JSON.stringify(itemDetails)], {
        type: 'application/json',
      })
    );
    newItem.append('thumbnailImageFile', image);

    try {
      instance.post('/products', newItem).then(() => {
        navigate('/product');
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditItem = () => {
    const editedItem = new FormData();
    const editedItemDetails = {
      productName: name,
      subtitle: subTitle,
      price: parseInt(price.replace(/,/g, '')),
      productCategory: category,
      productStatus: status,
      productDetail: text,
    };
    editedItem.append(
      'productPatchDto',
      new Blob([JSON.stringify(editedItemDetails)], {
        type: 'application/json',
      })
    );
    editedItem.append('thumbnailImageFile', image);
    try {
      instance.patch(`/products/${state.productId}`, editedItem).then(() => {
        navigate('/product');
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (text === '') {
      return alert('상품 상세 설명을 입력해주세요.');
    }

    state.productCategory ? handleEditItem() : handleCreateItem();

    initializeImageState();
    initializeTextState();
  };

  const categoryOptions = [
    { value: 'TENT', label: '텐트' },
    { value: 'CHAIR', label: '의자' },
    { value: 'TABLE', label: '테이블' },
    { value: 'LIGHT', label: '조명' },
    { value: 'FIREPLACE', label: '화로대' },
  ];

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
                  name="category"
                  value={category}
                  onChange={handleItemInformationChange}
                  required
                >
                  <option value="" disabled>
                    선택해주세요
                  </option>
                  {categoryOptions.map((option) => {
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
                  onChange={handleItemInformationChange}
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
                  onChange={handleItemInformationChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="상품 부제목">상품 부제목</label>
                <ContentInput
                  name="subTitle"
                  type="text"
                  value={subTitle}
                  onChange={handleItemInformationChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="가격">가격</label>
                <ContentInput
                  name="price"
                  type="text"
                  value={price}
                  onChange={handleItemInformationChange}
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
              <ProductEditor
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
