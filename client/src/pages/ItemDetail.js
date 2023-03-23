import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';

import Main from '../components/main/Main';
import MainLayout from '../components/main/MainLayout';
import Footer from '../components/main/Footer';

import ProductDetail from '../components/Item-detail/ProductDetail';
import ReviewForm from '../components/review/ReviewForm';
import ReadReviews from '../components/review/ReadReviews';

import { ReviewContainer } from '../components/Item-detail/ItemDetail.styled';

const ItemDetail = () => {
  const location = useLocation();
  const [cookies] = useCookies();

  const [productReviews, setProductReviews] = useState(
    location.state.responseReviews
  );
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [userRole, setUserRole] = useState('');
  const [userNickName, setUserNickName] = useState('');

  const productDetail = location.state.responseProductDetail;
  const { accessToken } = cookies;

  useEffect(() => {
    if (Object.keys(cookies).length) {
      setUserRole(jwt_decode(accessToken).roles[0]);
      setUserNickName(jwt_decode(accessToken).nickname);
    }
  }, [cookies, accessToken]);

  return (
    <Main>
      <MainLayout>
        {productDetail && (
          <ProductDetail productDetail={productDetail} userRole={userRole} />
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
            userNickName={userNickName}
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
