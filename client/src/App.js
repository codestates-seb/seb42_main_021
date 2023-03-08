import './App.css';
import styled from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminNewItem from './pages/AdminNewItem';
import CuratingDetail from './pages/CuratingDetail';
import Home from './pages/Home';
import ItemDetail from './pages/ItemDetail';
import ItemList from './pages/ItemList';
import Login from './pages/Login';
import Mypage from './pages/Mypage';
import ShoppingCart from './pages/ShoppingCart';
import SignUp from './pages/SignUp';
import Nav from './components/main/Nav';
import MainHeader from './components/main/MainHeader';

const MainLayout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;
const TitleContainer = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;

  .MainTitle {
    margin-top: 130px;
    margin-left: 100px;
    /* position: absolute;
    top: 100px;
    left: 100px; */
  }
  .SubTitle {
    margin-top: 500px;
    margin-left: 100px;
  }
`;
const MainContainer = styled.div`
  width: 50%;
`;

const MainBox = styled.div`
  width: 530px;
  margin: 0 auto;
`;

function App() {
  return (
    <MainLayout>
      <TitleContainer>
        <div className="MainTitle">Everybody chachapark</div>
        <div className="SubTitle">
          나에게 맞는 차박 용품을 한 눈에!
          <br /> 차박 장소까지 한 번에 결정하세요.
          <br /> 다함께 차차박
        </div>
      </TitleContainer>
      <MainContainer>
        <MainBox>
          <MainHeader />

          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/curation/:id" element={<CuratingDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/singup" element={<SignUp />} />
              <Route path="/product" element={<ItemList />} />
              <Route path="/product/:id" element={<ItemDetail />} />
              <Route path="/shoppingcart/:id" element={<ShoppingCart />} />
              <Route path="/mypage/:id" element={<Mypage />} />
              <Route path="/admin-item/:id" element={<AdminNewItem />} />
            </Routes>
          </BrowserRouter>
          <Nav />
        </MainBox>
      </MainContainer>
    </MainLayout>
  );
}

export default App;
