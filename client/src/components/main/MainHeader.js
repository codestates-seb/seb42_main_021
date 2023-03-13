import styled from 'styled-components';
import logo2 from '../../img/logo2.png';
import back from '../../img/back.svg';
import { useNavigate } from 'react-router-dom';

const MainHeaderLayout = styled.div`
  z-index: 1000;
  width: 100%;
  max-width: 530px;
  height: 80px;
  background-color: rgb(246, 246, 246, 0.1);
  position: fixed;
  top: 0;
  border: 2px solid var(--border);
  border-radius: var(--bd-rd);
  .logo2 {
  }
  .back {
    width: 50px;
    height: 50px;
  }
  img {
    width: 73px;
    height: 73px;
  }
`;

const MainHeaderContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
`;

const LogoBox = styled.div`
  transform: translateX(5px);
  border: 2px solid var(--border);
  cursor: pointer;
`;
const LoginBox = styled.div`
  cursor: pointer;
`;
const BackBox = styled.div`
  cursor: pointer;
`;

const LoginButton = styled.button`
  z-index: 1111;
  font-weight: bold;
  width: 70px;
  height: 50px;
  background-color: var(--whitegray200);
  border-radius: var(--bd-rd);
  color: var(--white);
  font-size: 12px;
  color: black;
`;

const MainHeader = () => {
  const navigate = useNavigate();

  return (
    <MainHeaderLayout>
      <MainHeaderContainer>
        <BackBox onClick={() => navigate(-1)}>
          <img className="back" src={back} alt="" />
        </BackBox>
        <LogoBox onClick={() => navigate('/')}>
          <img className="logo2" src={logo2} alt="" />
        </LogoBox>
        <LoginBox onClick={() => navigate('/login')}>
          <LoginButton className="login">로그인</LoginButton>
        </LoginBox>
      </MainHeaderContainer>
    </MainHeaderLayout>
  );
};

export default MainHeader;

// import styled from 'styled-components';

// const Container = styled.div`
//   z-index: 1000;
//   width: 100%;
//   max-width: 530px;
//   height: 80px;
//   background-color: var(--whitegray);
//   position: fixed;
//   top: 0;
//   border: 1px solid var(--border);
//   border-radius: var(--bd-rd);
// `;

// const MainHeader = () => {
//   return <Container></Container>;
// };

// export default MainHeader;
