import { useState } from 'react';
import styled from 'styled-components';

import DaumPostCode from './DaumPostCode';
import instance from '../newAxios';
import { useNavigate } from 'react-router-dom';

const ShippingLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const WriteNameContainer = styled.div`
  .receiver {
    width: 450px;
    margin-top: 20px;
  }
  input {
    margin-top: 10px;
    width: 450px;
    height: 40px;
    border-radius: var(--bd-rd);
    font-size: 20px;
  }
`;

const WriteAddressContainer = styled.div`
  .address {
    width: 450px;
    margin-top: 20px;
  }
  input {
    margin-top: 10px;
    width: 300px;
    height: 40px;
    border-radius: var(--bd-rd);
    font-size: 20px;
  }
  .find-adress {
    width: 100px;
    height: 40px;
    margin-left: 30px;
    border-radius: var(--bd-rd);
    background-color: var(--blue);
    color: var(--white);
  }
`;
const OrderContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  width: 450px;
  padding: 10px 0 10px 0;
  background-color: var(--blue);
  border-radius: var(--bd-rd);

  .order-price {
    font-size: 25px;
    font-weight: 500;
    color: var(--white);
  }
  &:hover {
    background-color: pink;
    .orderPrice {
      color: var(--black);
    }
  }
`;

const Popup = styled.div`
  position: absolute;
  top: 50%;
  width: 300px;
  padding: 7px;
  z-index: 200;
  border-radius: var(--bd-rd);
  background-color: var(--gray);
`;

const PopupContent = styled.div`
  flex-direction: column;
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: var(--bd-rd);
`;

const PopupButton = styled.button`
  background-color: var(--blue);
  color: var(--white);
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const PopupText = styled.p`
  font-size: 18px;
  margin-bottom: 30px;
`;

const ShippingInformation = ({ orderPrice, cartId }) => {
  const [receiver, setReceiver] = useState('');
  const [address, setAddress] = useState('');
  const [popAddress, setPopAddress] = useState(false);
  const [alarmPop, setAlarmPop] = useState(false);
  const [popContent, setPopContent] = useState(null);

  const navigate = useNavigate();

  const handleReceiver = (event) => {
    event.preventDefault();
    setReceiver(event.target.value);
  };

  const handleAdress = (event) => {
    event.preventDefault();
    setAddress(event.target.value);
  };

  const popupOpen = (content) => {
    setAlarmPop(true);
    setPopContent(
      <>
        <PopupText>{content}</PopupText>
        <PopupButton onClick={() => setAlarmPop(false)}>확인</PopupButton>
      </>
    );
  };

  const handleSubmit = async () => {
    if (!address && !receiver) {
      return popupOpen('받는 사람과 주소를 입력해주세요');
    }
    if (address && !receiver) {
      return popupOpen('받는 사람을 입력해주세요');
    }
    if (!address && receiver) {
      return popupOpen('주소를 입력해주세요');
    }
    if (orderPrice === '0') {
      return popupOpen('주문할 상품이 없습니다');
    }
    try {
      instance.post(`/orders`, { cartList: cartId });
      popupOpen('주문이 완료되었습니다');
      navigate('/mypage');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h2 className="wirteInformation"> 배송지 정보</h2>

      <ShippingLayout>
        <WriteNameContainer>
          <h3 className="receiver"> 받는 사람</h3>
          <input
            type="text"
            placeholder="  홍길동"
            value={receiver}
            onChange={handleReceiver}
            required
          />
        </WriteNameContainer>
        <WriteAddressContainer>
          <h3 className="address"> 배송지 입력</h3>
          <input
            type="text"
            placeholder=" 서울 강남구 영동대로 513 "
            value={address}
            onChange={handleAdress}
            required
          />
          <button
            className="find-adress"
            type="button"
            onClick={() => setPopAddress(!popAddress)}
          >
            우편번호 검색
          </button>
          {popAddress && (
            <div>
              <DaumPostCode setAddress={setAddress} />
            </div>
          )}
        </WriteAddressContainer>

        <OrderContainer>
          <button className="order-price" onClick={handleSubmit}>
            {orderPrice.toLocaleString('ko-KR')}원 주문하기
          </button>
        </OrderContainer>
        {alarmPop && (
          <Popup>
            <PopupContent>{popContent}</PopupContent>
          </Popup>
        )}
      </ShippingLayout>
    </>
  );
};

export default ShippingInformation;
