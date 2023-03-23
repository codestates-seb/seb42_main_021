import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';
import instance from '../components/newAxios';

import Main from '../components/main/Main';
import MainLayout from '../components/main/MainLayout';
import Footer from '../components/main/Footer';
import {
  ImageBox,
  Modal,
  ProductDescription,
  ProductInformation,
  ReviewContainer,
} from '../components/Item-detail/ItemDetail.styled';
import ReviewForm from '../components/review/ReviewForm';
import ReadReviews from '../components/review/ReadReviews';
import AdminButtonGroup from '../components/Item-detail/AdminButtonGroup';
import { FaShoppingCart } from 'react-icons/fa';

const ItemDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [userRole, setUserRole] = useState('');

  const [cookies] = useCookies();

  const navigate = useNavigate();

  const location = useLocation();
  const productDetail = location.state.responseProductDetail;
  const productReviews = location.state.responseReviews;

  const handleModal = () => {
    setIsModalOpen((isOpen) => !isOpen);
    navigate('/shoppingcart');
  };

  const handleShoppingBag = () => {
    if (userRole === '') {
      window.alert('상품을 장바구니에 담기 전에 로그인 해주세요.');
      return navigate('/login');
    }

    const item = {
      productId: productDetail.productId,
      quantity: 1,
    };

    instance
      .post(`/carts`, item)
      .then(() => setIsModalOpen(true))
      .catch((error) => {
        if (error.response.data.status === 409) {
          alert('이미 장바구니에 담은 상품입니다.');
          navigate('/shoppingcart');
        }
      });
  };

  useEffect(() => {
    if (Object.keys(cookies).length) {
      const { accessToken } = cookies;
      setUserRole(jwt_decode(accessToken).roles[0]);
    }
  }, [cookies]);

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
                <div id="product-name">{productDetail.productName}</div>
                <div id="product-price">
                  {productDetail.price.toLocaleString('ko-KR')}원
                </div>
              </div>
              <button type="button" onClick={handleShoppingBag}>
                <FaShoppingCart size="40px" />
              </button>
              {userRole === 'ADMIN' && (
                <AdminButtonGroup productDetail={productDetail} />
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
            <ProductDescription
              dangerouslySetInnerHTML={{ __html: productDetail.productDetail }} // html 그대로 사용하지 않는 방법 연구하기
            ></ProductDescription>
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
