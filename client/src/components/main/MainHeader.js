import logolast from '../../img/logolast.png';
import styled from 'styled-components';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import back from '../../img/back.svg';

const MainHeaderLayout = styled.div`
  z-index: 1000;
  width: 100%;
  max-width: 530px;
  height: 80px;
  background-color: var(--whitegray);
  position: fixed;
  top: 0;
  border: 1px solid var(--border);
  border-radius: var(--bd-rd);

  img {
    width: 75px;
    height: 75px;
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
  border: 1px solid var(--border);
  cursor: pointer;
  /* border-radius: var(--bd-rd); */
  margin-left: 12px;
  margin-top: 1px;
`;
const LoginBox = styled.div`
  cursor: pointer;
  a {
    display: inline-block;
    text-align: center;
    vertical-align: center;
    width: 70px;
    height: 50px;
    line-height: 50px;
    background-color: #32465b;
    border-radius: var(--bd-rd);
    color: white;
    font-size: 16px;
    :nth-child(1) {
      margin-right: 10px;
    }
  }
  img {
    width: 70px;
    height: 50px;
    margin-right: 10px;
    border: 1px solid blue;
  }
`;

const LoginLink = styled(Link)`
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
const BackBox = styled.div`
  cursor: pointer;
  img {
    background-color: #32465b;
    border-radius: var(--bd-rd);
  }
  .back {
    width: 50px;
    height: 50px;
  }
`;

const SubHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <MainHeaderLayout>
      <MainHeaderContainer>
        {location.pathname === '/curation/:id' ||
        location.pathname === '/product/:id' ? (
          <>
            <BackBox onClick={() => navigate(-1)}>
              <img className="back" src={back} alt="" />
            </BackBox>
            <LogoBox onClick={() => navigate('/')}>
              <img className="logo5" src={logolast} alt="" />
            </LogoBox>
          </>
        ) : (
          <LogoBox onClick={() => navigate('/')}>
            <img className="logo5" src={logolast} alt="" />
          </LogoBox>
        )}
        <LoginBox>
          <LoginLink to="/login" className="logout">
            로그인
          </LoginLink>
          <LoginLink to="/login" className="logout">
            로그아웃
          </LoginLink>
          {/* <img src={logolast} alt="프로필" />
          <LoginLink to="/login" className="logout">
            로그아웃
          </LoginLink> */}
        </LoginBox>
      </MainHeaderContainer>
    </MainHeaderLayout>
  );
};

export default SubHeader;
