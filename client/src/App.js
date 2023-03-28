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
import NotFound from './pages/NotFound';

const MainLayout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  @media (max-width: 950px) {
    transform: translateX(-100px);
    margin: 0 auto;
    padding: 16px 32px;
  }
  @media (max-width: 768px) {
    margin: 0 auto;
    padding: 0;
    transform: none;
    height: calc(var(--vh, 1vh) * 100);
  }
`;

const TitleContainer = styled.div`
  width: 50%;
  justify-content: center;
  align-content: center;
  @media (max-width: 950px) {
    display: none;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const TitleContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 530px;
  height: 100%;
  justify-content: center;
  color: white;
  .MainTitle {
    margin-bottom: 600px;
    margin-left: 150px;
    font-size: 65px;
    font-weight: bold;
  }
  .SubTitle {
    font-size: 25px;
    margin-left: 120px;
    line-height: 200%;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const MainContainer = styled.div`
  max-width: 50%;
  margin: 0 auto;
  @media (max-width: 768px) {
    max-width: 100%;
    max-height: 100%;
  }
`;

const MainBox = styled.div`
  max-width: 530px;
  height: 100%;
  margin: 0 auto;
  border: 1px solid var(--border);
  border-radius: var(--bd-rd);
  @media (max-width: 768px) {
    max-width: 100%;
    max-height: 100%;
  }
`;

function App() {
  const setScreenSize = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  window.addEventListener('resize', () => setScreenSize());

  return (
    <BrowserRouter>
      <MainLayout>
        <TitleContainer>
          <TitleContainerBox>
            <div className="MainTitle">Everybody chachapark!</div>
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
              <Route path="/signup" element={<SignUp />} />
              <Route path="/product" element={<ItemList />} />
              <Route path="/product/:id" element={<ItemDetail />} />
              <Route path="/shoppingcart" element={<ShoppingCart />} />
              <Route path="/mypage" element={<Mypage />} />
              <Route path="/admin-item/:id" element={<AdminNewItem />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Navigation />
          </MainBox>
        </MainContainer>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
