import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import Main from '../components/main/Main';
import MainHeader from '../components/main/MainHeader';
import ShoppingItems from '../components/shoppingComponents/ShoppingItems';
import ShippingInformation from '../components/shoppingComponents/ShippingInformation';
import Footer from '../components/main/Footer';

const ShoppingCartLayout = styled.div`
  height: 100%;
  background-color: var(--white);
  overflow-y: scroll;
  padding-left: 16px;
  padding-right: 16px;

  ::-webkit-scrollbar {
    display: none;
  }
  .item {
    margin-left: 20px;
    margin-top: 20px;
  }
  .wirteInformation {
    margin-left: 20px;
    margin-top: 50px;
  }
  .nologin {
    font-size: 20px;
    margin-left: 150px;
    margin-top: 100px;
  }
`;

const ShoppingCart = () => {
  const [orderPrice, setOrderPrice] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies();

  const refreshToken = cookies.refreshToken;
  return (
    <Main>
      <MainHeader />
      <ShoppingCartLayout>
        {!refreshToken ? (
          <div className="nologin">로그인 후 이용해 주세요</div>
        ) : (
          <>
            <ShoppingItems setOrderPrice={setOrderPrice} />
            <ShippingInformation orderPrice={orderPrice} />
          </>
        )}
        <Footer />
      </ShoppingCartLayout>
    </Main>
  );
};

export default ShoppingCart;
