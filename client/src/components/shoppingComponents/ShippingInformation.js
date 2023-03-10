import { useState } from 'react';
import styled from 'styled-components';
import DaumPostCode from './DaumPostCode';

const ShippingContainerWrap = styled.form`
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

const ShippingInformation = () => {
  const [receiver, setReceiver] = useState('');
  const [address, setAddress] = useState('');
  const [popAddress, setPopAddress] = useState(false);

  const handleReceiver = (e) => {
    e.preventDefault();
    setReceiver(e.target.value);
  };

  const handleAdress = (e) => {
    e.preventDefault();
    setAddress(e.target.value);
  };

  return (
    <>
      <h2 className="wirteInformation"> 배송지 정보</h2>
      <ShippingContainerWrap>
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
      </ShippingContainerWrap>
    </>
  );
};

export default ShippingInformation;
