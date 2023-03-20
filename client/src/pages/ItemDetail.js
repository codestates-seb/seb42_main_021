import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import { FaShoppingCart } from 'react-icons/fa';
import Footer from '../components/main/Footer';
import Main from '../components/main/Main';
import MainLayout from '../components/main/MainLayout';
import ReviewForm from '../components/review/ReviewForm';
import ReadReviews from '../components/review/ReadReviews';

import {
  findProductByProductId,
  getProductReviews,
} from '../components/api/itemDetailAPI';

const ImageBox = styled.div`
  width: 100%;
  padding: 30px 0;
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
  margin: 10px 0 50px 0;
  word-break: break-all;
  color: ${(props) => props.color};
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

const FormButton = styled.button`
  width: 100px;
  height: 40px;
  border-radius: var(--bd-rd);
  background-color: ${(props) => props.backgroundColor};
  color: var(--white);
  margin-left: 10px;
`;

const ItemDetail = () => {
  const [productDetail, setProductDetail] = useState(null);
  const [productReviews, setProductReviews] = useState(null);
  const [carts, setCarts] = useState([]);
  const [productDetailParser, setProductDetailParser] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies();

  const accessToken = cookies.accessToken;
  const refreshToken = cookies.refreshToken;

  const navigate = useNavigate();

  const { id } = useParams();

  const handleModal = () => {
    setIsModalOpen((isOpen) => !isOpen);
    navigate('/shoppingcart');
  };

  const handleShoppingBag = () => {
    getCartItems()
      .then((cartItems) => {
        setCarts(cartItems);
      })
      .catch((error) => {
        console.error(error);
      });

    const item = {
      productId: productDetail.productId,
      quantity: 1,
    };

    axios
      .post(`/carts`, item, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Refresh: `${refreshToken}`,
        },
      })
      .then(() => setIsModalOpen(true))
      .catch((error) => {
        if (error.response.data.status === 409) {
          window.alert('이미 장바구니에 담은 상품입니다.');
          navigate('/shoppingcart');
        }
      });
  };

  const handleEditProductDetail = () => {
    navigate(`/admin-item/${id}`, { state: productDetail });
  };

  const handleDeleteProductDetail = () => {
    axios.post(`products/${productDetail.productId}`, {
      headers: {
        Authorization: `Bearer `,
        Refresh: `Bearer `,
      },
    });
    navigate('/product');
  };

  const getCartItems = async () => {
    try {
      const { data } = await axios.get('/carts', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          refreshToken: `${refreshToken}`,
        },
      });
      console.log(data);
      return data.data;
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    findProductByProductId(id).then((productInformation) => {
      const parser = new DOMParser();
      const parsedText = parser.parseFromString(
        productInformation.productDetail,
        'text/html'
      ).body.textContent;
      setProductDetailParser(parsedText);
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
              <img
                alt={productDetail.name}
                src={productDetail.thumbnailImageURL}
              ></img>
            </ImageBox>
            <ProductInformation>
              <div>
                <div id="productName">{productDetail.productName}</div>
                <div id="productPrice">
                  {productDetail.price.toLocaleString('ko-KR')}원
                </div>
              </div>
              {accessToken && (
                <button type="button" onClick={handleShoppingBag}>
                  <FaShoppingCart size="40px" />
                </button>
              )}
              {accessToken && (
                <>
                  <FormButton
                    type="button"
                    backgroundColor="#61a0ff"
                    onClick={handleEditProductDetail}
                  >
                    상품 수정하기
                  </FormButton>
                  <FormButton
                    type="button"
                    backgroundColor="#ff0000"
                    onClick={handleDeleteProductDetail}
                  >
                    상품 삭제하기
                  </FormButton>
                </>
              )}
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
            <ProductDescription color="#8e8e8e">
              {productDetail.subtitle}
            </ProductDescription>
            <ProductDescription>{productDetailParser}</ProductDescription>
          </div>
        )}
        <ReviewContainer>
          <h3>상품 리뷰</h3>
          <ReviewForm
            productId={productDetail?.productId}
            setProductReviews={setProductReviews}
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
