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
import Navigation from './components/main/Navigation';
import MainHeader from './components/main/MainHeader';

const MainLayout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;
const TitleContainer = styled.div`
  width: 50%;
  justify-content: center;
  align-content: center;
`;

const TitleContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 530px;
  height: 100%;
  margin: 0 auto;
  justify-content: center;
  color: white;
  .MainTitle {
    margin-bottom: 500px;
    margin-left: 130px;
    font-size: 35px;
    font-weight: bold;
  }
  .SubTitle {
    font-size: 20px;
    margin-left: 120px;
  }
`;
const MainContainer = styled.div`
  width: 50%;
  margin: 0 auto;
`;

const MainBox = styled.div`
  width: 530px;
  height: 100%;
  margin: 0 auto;
  border: 1px solid var(--border);
  border-radius: var(--bd-rd);
`;

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <TitleContainer>
          <TitleContainerBox>
            <div className="MainTitle">Everybody chachapark</div>
            <div className="SubTitle">
              나에게 맞는 차박 용품을 한 눈에!
              <br /> 차박 장소까지 한 번에 결정하세요.
              <br /> 다함께 차차박
            </div>
          </TitleContainerBox>
        </TitleContainer>
        <MainContainer>
          <MainBox>
            <MainHeader />
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
            <Navigation />
          </MainBox>
        </MainContainer>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
