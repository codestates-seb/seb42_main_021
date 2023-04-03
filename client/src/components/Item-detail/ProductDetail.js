import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import instance from '../newAxios';

import AdminButtonGroup from './AdminButtonGroup';
import {
  ImageBox,
  Modal,
  ProductDescription,
  ProductInformation,
} from './ItemDetail.styled';
import { FaShoppingCart } from 'react-icons/fa';

function ProductDetail({ productDetail, userRole }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleModal = () => {
    setIsModalOpen((isOpen) => !isOpen);
    navigate('/shoppingcart');
  };

  const handleShoppingBag = () => {
    if (userRole === '') {
      alert('상품을 장바구니에 담기 전에 로그인 해주세요.');
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

  const componentTable = {
    ADMIN: <AdminButtonGroup productDetail={productDetail} />,
    USER: (
      <button type="button" onClick={handleShoppingBag}>
        <FaShoppingCart size="40px" />
      </button>
    ),
  };

  return (
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
        {userRole === '' ? componentTable.USER : componentTable[userRole]}
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
      <ProductDescription>
        {parse(productDetail.productDetail)}
      </ProductDescription>
    </div>
  );
}

export default ProductDetail;
