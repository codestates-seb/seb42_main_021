import styled from 'styled-components';
import axios from 'axios';
import ReactQuill from 'react-quill';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import Main from '../components/main/Main';
import MainLayout from '../components/main/MainLayout';
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
  margin-bottom: 20px;
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

const ItemDescription = styled(ReactQuill)`
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
  const [category, setCategory] = useState('선택해주세요');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const imgRef = useRef();
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ align: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, 'link'],
        ['image'],
        [
          {
            color: [
              '#000000',
              '#e60000',
              '#ff9900',
              '#ffff00',
              '#008a00',
              '#0066cc',
              '#9933ff',
              'custom-color',
            ],
          },
          { background: [] },
        ],
      ],
    },
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

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

  const handleText = (contents) => {
    setText(contents);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (category === '선택해주세요') {
      window.alert('상품 카테고리를 선택해주세요.');
      return;
    } else if (image === null) {
      window.alert('상품 대표 이미지를 첨부해주세요.');
      return;
    } else if (text === '') {
      window.alert('상품 세부 설명을 입력해주세요.');
      return;
    }
    const formData = new FormData();
    formData.append('category', category);
    formData.append('name', name);
    formData.append('price', price);
    formData.append('image', image);
    formData.append('text', text);
    const header = {
      headers: {
        'ngrok-skip-browser-warning': '12',
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await axios.post('/products', formData, header);
      console.log(response.data);
      setCategory('선택해주세요');
      setName('');
      setPrice('');
      setImage('');
      setText('');
    } catch (error) {
      console.error(error);
    }
    navigate('/product');
  };

  return (
    <Main>
      <MainLayout>
        <div>
          <PageName>상품 등록하기</PageName>
          <ItemInformationContainer onSubmit={handleSubmit}>
            <ItemInformationBox>
              <div>
                <label>상품 카테고리</label>
                <select value={category} onChange={handleCategory}>
                  <option value="선택해주세요">선택해주세요</option>
                  <option value="텐트">텐트</option>
                  <option value="체어">체어</option>
                  <option value="테이블">테이블</option>
                  <option value="조명">조명</option>
                  <option value="화로대">화로대</option>
                </select>
              </div>
              <div>
                <label htmlFor="상품명">상품명</label>
                <ContentInput type="text" onChange={handleName} required />
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
              <ItemDescription modules={modules} onChange={handleText} />
            </ItemDescriptionBox>
            <ButtonBox>
              <button type="submit">등록하기</button>
            </ButtonBox>
          </ItemInformationContainer>
        </div>
        <Footer />
      </MainLayout>
    </Main>
  );
};

export default AdminNewItem;
