import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { FaShoppingCart } from 'react-icons/fa';
import Footer from '../components/main/Footer';
import Main from '../components/main/Main';
import MainLayout from '../components/main/MainLayout';
import ReviewForm from '../components/review/ReviewForm';
import ReadReviews from '../components/review/ReadReviews';

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
  > button {
    width: 20%;
  }
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

const ProductDescription = styled.p`
  margin: 20px 0;
  word-break: break-all;
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

const ReviewContainer = styled.div`
  > h3 {
    margin: 30px 16px;
    padding: 16px 0;
    border-bottom: 2px solid var(--border);
  }
`;

const ItemDetail = () => {
  const [productDetail, setProductDetail] = useState(null);
  const [productReviews, setProductReviews] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  const navigate = useNavigate();

  const { id } = useParams();

  const handleModal = () => {
    setIsModalOpen((isOpen) => !isOpen); //콜백함수 사용하기
    navigate('/shoppingcart/1');
  };

  const handleShoppingBag = (event) => {
    event.preventDefault();
    //추후 수정
    // const data = {
    //   memberId: 1,
    //   products: [
    //     {
    //       productId: list.productId,
    //       productName: list.productName,
    //       price: list.price,
    //       quantity: 1,
    //     },
    //   ],
    // };
    // axios.post(`/orders`, data, {
    //   headers: {
    //     'ngrok-skip-browser-warning': '12',
    //   },
    // });
    setIsModalOpen(true);
  };

  const findProductByProductId = async (productId) => {
    const { data } = await axios.get(`/products/${productId}`, {
      headers: {
        'ngrok-skip-browser-warning': '12',
      },
    });
    return data.data;
  };

  const getProductReviews = async (productId) => {
    try {
      const { data } = await axios.get(`/reviews/${productId}?page=1&size=10`);
      return data.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    findProductByProductId(id).then((productInformation) => {
      setProductDetail(productInformation);
    });
    getProductReviews(id).then((productReviewList) =>
      setProductReviews(productReviewList)
    );
  }, [id]);

  return (
    <Main>
      <MainLayout>
        {productDetail && (
          <div>
            <ImageBox>
              <img alt="텐트1"></img>
            </ImageBox>
            <ProductInformation>
              <div>
                <div id="productName">{productDetail.name}</div>
                <div id="productPrice">
                  {productDetail.price.toLocaleString('ko-KR')}원
                </div>
              </div>
              <button type="button" onClick={handleShoppingBag}>
                <FaShoppingCart size="40px" />
              </button>
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
              {productDetail.productDetail}
            </ProductDescription>
          </div>
        )}
        <ReviewContainer>
          <h3>상품 리뷰</h3>
          <ReviewForm
            productId={productDetail?.productId}
            isEditClicked={isEditClicked}
            setIsEditClicked={setIsEditClicked}
            editingReview={editingReview}
          />
          <ReadReviews
            productReviews={productReviews}
            setEditingReview={setEditingReview}
            setIsEditClicked={setIsEditClicked}
          />
        </ReviewContainer>
        <Footer />
      </MainLayout>
    </Main>
  );
};

export default ItemDetail;
