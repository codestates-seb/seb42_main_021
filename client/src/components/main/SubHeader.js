import logo1 from '../../img/logo1.png';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SubHeaderLayout = styled.div`
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
    width: 73px;
    height: 73px;
  }
`;

const SubHeaderContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
`;

const LogoBox = styled.div`
  transform: translateX(5px);
  border: 2px solid var(--border);
  cursor: pointer;
  border-radius: var(--bd-rd);
  margin-left: 12px;
`;
const LoginBox = styled.div`
  cursor: pointer;
`;

const LoginButton = styled.button`
  z-index: 1111;
  font-weight: bold;
  width: 70px;
  height: 50px;
  background-color: var(--white);
  border: 2px solid var(--border);
  border-radius: var(--bd-rd);
  color: var(--white);
  font-size: 12px;
  color: black;
  :nth-child(1) {
    margin-right: 20px;
  }
  :nth-child(2) {
    margin-right: 15px;
  }
`;

const SubHeader = () => {
  const navigate = useNavigate();
  return (
    <SubHeaderLayout>
      <SubHeaderContainer>
        <LogoBox onClick={() => navigate('/')}>
          <img className="logo2" src={logo1} alt="" />
        </LogoBox>
        <LoginBox onClick={() => navigate('/login')}>
          <LoginButton className="login">프로필</LoginButton>
          <LoginButton className="login">로그인</LoginButton>
        </LoginBox>
      </SubHeaderContainer>
    </SubHeaderLayout>
  );
};

export default SubHeader;
