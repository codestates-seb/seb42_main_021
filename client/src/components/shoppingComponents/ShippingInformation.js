import { useState } from 'react';
import styled from 'styled-components';
import DaumPostCode from './DaumPostCode';

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
  .findAdress {
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

  .orderPrice {
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

const ShippingInformation = ({ orderPrice }) => {
  //form으로 만들면 랜더링 되면서 장바구니 목록이 사라짐 (zustand내용이 날아감)
  //서버에게 보내줄게 아니라면  그냥 페이지전환만 되도록 ??

  const [receiver, setReceiver] = useState('');
  const [address, setAddress] = useState('');
  const [popAddress, setPopAddress] = useState(false);
  const [alarmPop, setAlarmPop] = useState(false);
  const [popContent, setPopContent] = useState(null);

  const handleReceiver = (e) => {
    e.preventDefault();
    setReceiver(e.target.value);
  };

  const handleAdress = (e) => {
    e.preventDefault();
    setAddress(e.target.value);
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

  const handleSubmit = () => {
    if (!address && !receiver) {
      popupOpen('받는 사람과 주소를 입력해주세요');
    } else if (address && !receiver) {
      popupOpen('받는 사람을 입력해주세요');
    } else if (!address && receiver) {
      popupOpen('주소를 입력해주세요');
    } else {
    }
    if (orderPrice === 0) {
      popupOpen('주문할 상품이 없습니다');
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
          ></input>
        </WriteNameContainer>
        <WriteAddressContainer>
          <h3 className="address"> 배송지 입력</h3>
          <input
            type="text"
            placeholder=" 서울 강남구 영동대로 513 "
            value={address}
            onChange={handleAdress}
          ></input>
          <button
            className="findAdress"
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
          <button className="orderPrice" onClick={handleSubmit}>
            {orderPrice}원 주문하기
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
