import { useState } from 'react';
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
`;

const ShoppingCart = () => {
  const [orderPrice, setOrderPrice] = useState(0);
  return (
    <Main>
      <MainHeader />
      <ShoppingCartLayout>
        <ShoppingItems setOrderPrice={setOrderPrice} />
        <ShippingInformation orderPrice={orderPrice} />
        <Footer />
      </ShoppingCartLayout>
    </Main>
  );
};

export default ShoppingCart;
