import Main from '../components/main/Main';
import styled from 'styled-components';
import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { useProduct } from '../components/store';

const ItemDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  .buttonBox {
    display: flex;
    justify-content: right;
    margin: 10px 0;
    padding: 0 16px;
    > button {
      margin-left: 10px;
    }
    #cancelButton {
      background-color: var(--red);
    }
  }
`;

const ContentContainer = styled.div`
  padding: 0 16px;
`;

const ImageBox = styled.div`
  width: 100%;
  > img {
    width: 100%;
    height: 100%;
  }
`;

const ProductInformation = styled.div`
  display: flex;
  flex-direction: row;
  > div {
    width: 80%;
    #productName {
      font-size: xxx-large;
    }
    #productPrice {
      font-size: xx-large;
    }
  }
  > icon {
    width: 20%;
  }
`;

const PurchaseButton = styled.button``;

const ProductDescription = styled.p`
  margin: 20px 0;
  word-break: break-all;
`;

const ReviewContainer = styled.ul`
  padding: 0 16px;
`;

const ReviewBox = styled.li`
  display: flex;
  width: 100%;
  height: 100px;
  margin: 16px 0;
  padding: 10px 0;
  border-top: 2px solid var(--border);
  #reviewContents {
    width: 80%;
    flex-direction: row;
    margin-right: 10px;
  }
  #userInformation {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-right: 0px;
    align-items: center;
    > img {
      width: 40px;
      height: 40px;
    }
    > * {
      margin-right: 10px;
    }
    #reviewDate {
      margin-top: 20px;
      width: 80%;
      color: var(--gray);
      font-size: small;
    }
    #reviewEdit {
      display: flex;
      justify-content: center;
      width: 30%;
      > div {
        color: var(--gray);
        font-size: small;
        margin: auto;
      }
    }
  }
  #review {
    margin-top: 10px;
  }
  > img {
    width: 100px;
    height: 100px;
  }
`;

const WriteReviewButton = styled.button`
  width: 100px;
  height: 40px;
  border-radius: var(--bd-rd);
  background-color: var(--blue);
  color: var(--white);
`;

const WriteReviewContainer = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  > textarea {
    height: 150px;
    resize: none;
    margin: 10px 0;
  }
  #reviewButtonBox {
    margin-top: 100px;
  }
`;

const Modal = styled.div`
  position: fixed;
  bottom: 300px;
  right: 0;
  transform: translate(-50%, 0);
  z-index: 999;
  max-width: 300px;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--white);
  border: 1px solid var(--border);
  border-radius: var(--bd-rd);
  > div {
    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      > button {
        margin-top: 30px;
        width: 150px;
        height: 40px;
        border-radius: var(--bd-rd);
        background-color: var(--border);
        color: var(--black);
      }
    }
  }
`;

const ItemDetail = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [rating, setRating] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const { product, addProduct } = useProduct((state) => state);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('rating', rating);
    formData.append('text', text);
    formData.append('image', image);
    setIsClicked(!isClicked);
    // try {
    //   const response = await axios.post('/api/review', formData);
    //   console.log(response.data);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleDismiss = (event) => {
    event.preventDefault();
    setRating(0);
    setText('');
    setImage(null);
    setIsClicked(!isClicked);
  };

  const handleWriteButton = () => {
    setIsClicked(!isClicked);
  };

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handlePurchase = () => {
    setIsModalOpen(true);
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleShoppingBag = () => {
    //if 중복되지 않게 하기
    addProduct({
      id: 1,
      item: '상품명',
      price: '39,000원',
      img: 'img',
    });
    handlePurchase();
  };

  console.log(product);

  return (
    <Main>
      <ItemDetailContainer>
        <ContentContainer>
          <ImageBox>
            <img alt="텐트1"></img>
          </ImageBox>
          <ProductInformation>
            <div>
              <div id="productName">상품명</div>
              <div id="productPrice">39,0000원</div>
            </div>
            <PurchaseButton onClick={handleShoppingBag}>
              장바구니
            </PurchaseButton>
            {isModalOpen && (
              <Modal>
                <div>
                  <div>장바구니에 추가되었습니다.</div>
                  <div>
                    <button onClick={handleModal}>확인</button>
                  </div>
                </div>
              </Modal>
            )}
          </ProductInformation>
          <ProductDescription>
            ABC 캠핑 텐트는 캠핑, 하이킹 등 야외활동에 적합한 2인용 텐트입니다.
            경량으로 제작되어 휴대가 용이하며, 내구성이 뛰어나므로 장기간 사용
            가능합니다. 방수 처리가 되어 비오는 날에도 사용 가능합니다. 쉽게
            설치할 수 있으며, 설치 도구가 필요하지 않습니다. 2개의 출입구가 있어
            편리하게 이용할 수 있습니다. 내부에 수납공간이 있어 소품 등을 보관할
            수 있습니다. 안정성이 높아 바람이 강한 날에도 사용 가능합니다.
          </ProductDescription>
        </ContentContainer>
        <ReviewContainer>
          <ReviewBox>
            <div id="reviewContents">
              <div id="userInformation">
                <img alt="유저 프로필"></img>
                <div id="userBox">
                  <Rating
                    size="15px"
                    fillColor="#61a0ff"
                    emptyColor="#C9C9C9"
                    initialValue={rating}
                    readonly="true"
                  />
                  <div>유저명</div>
                </div>
                <div id="reviewDate">2023.03.15</div>
                <div id="reviewEdit">
                  <div>수정</div>
                  <div>삭제</div>
                </div>
              </div>
              <div id="review">리뷰내용</div>
            </div>
            <img alt="리뷰사진"></img>
          </ReviewBox>
        </ReviewContainer>
        <div className="buttonBox">
          {!isClicked && (
            <WriteReviewButton onClick={handleWriteButton}>
              리뷰 작성하기
            </WriteReviewButton>
          )}
        </div>
        {isClicked && (
          <WriteReviewContainer onSubmit={handleSubmit}>
            <Rating
              size="25px"
              fillColor="#61a0ff"
              emptyColor="#C9C9C9"
              onClick={handleRating}
              initialValue={rating}
            />
            <textarea value={text} onChange={handleTextChange} />
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <div id="reviewButtonBox" className="buttonBox">
              <WriteReviewButton type="submit">등록하기</WriteReviewButton>
              <WriteReviewButton
                id="cancelButton"
                type="button"
                onClick={handleDismiss}
              >
                취소
              </WriteReviewButton>
            </div>
          </WriteReviewContainer>
        )}
      </ItemDetailContainer>
    </Main>
  );
};

export default ItemDetail;
