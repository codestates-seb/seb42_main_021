import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import instance from '../newAxios';

import logolast3 from '../../img/logolast3.png';
import back from '../../img/back.svg';

const MainHeaderLayout = styled.div`
  z-index: 10000;
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
  img {
    width: 100px;
    height: 80px;
    object-fit: scale-down;
  }
`;

const LogoBox = styled.div`
  transform: translateX(5px);
  cursor: pointer;
  .logoF1 {
    margin-left: 70px;
    @media (max-width: 768px) {
      margin-left: 10px;
    }
  }
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
    margin-right: 10px;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: var(--bd-rd);
    object-fit: cover;
  }
  .login-box {
    display: flex;
    flex-direction: row;
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
`;

const Logout = styled.button`
  display: inline-block;
  text-align: center;
  vertical-align: center;
  font-weight: bold;
  width: 70px;
  height: 50px;
  line-height: 50px;
  background-color: #32465b;
  border-radius: var(--bd-rd);
  color: white;
  font-size: 16px;
  margin-right: 10px;
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

const MainHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [cookies, , removeCookie] = useCookies();
  const refreshToken = cookies.refreshToken;

  const [profileImage, setProfileImage] = useState();

  const getUserProfile = async () => {
    try {
      const { data } = await instance.get(`/members/mypage`);
      return data.data;
    } catch (error) {
      console.error(error);
    }
  };

  if (refreshToken) {
    const getUserProfileMethod = async () => {
      const profile = await getUserProfile();
      const profileImage = profile.profileImg;
      setProfileImage(profileImage);
    };
    getUserProfileMethod();
  }

  const handleLogout = async () => {
    await instance.post('/members/logout');
    removeCookie('accessToken');
    removeCookie('refreshToken');
    navigate('/');
  };

  const getPathNameType = (pathName) => {
    if (pathName.includes(`/curation/`)) {
      return 'special';
    }
    if (pathName.includes(`/product/`)) {
      return 'special';
    }
    return 'normal';
  };

  const getLoginStatus = (refreshToken) => {
    if (refreshToken) {
      return 'login';
    }

    return 'logout';
  };

  const pathType = getPathNameType(location.pathname);
  const loginStatus = getLoginStatus(refreshToken);

  const componentTable = {
    special: (
      <>
        <BackBox onClick={() => navigate(-1)}>
          <img className="back" src={back} alt="" />
        </BackBox>
        <LogoBox onClick={() => navigate('/')}>
          <img className="logoF1" src={logolast3} alt="" />
        </LogoBox>
      </>
    ),
    normal: (
      <LogoBox onClick={() => navigate('/')}>
        <img src={logolast3} alt="" />
      </LogoBox>
    ),
    login: (
      <div className='login-box"'>
        <LoginLink to="/mypage">
          <img src={profileImage} alt="프로필" />
        </LoginLink>
        <Logout onClick={handleLogout}>로그아웃</Logout>
      </div>
    ),
    logout: (
      <div>
        <LoginLink to="/login" className="login">
          로그인
        </LoginLink>
        <LoginLink to="/signup" className="signup">
          회원가입
        </LoginLink>
      </div>
    ),
  };
  return (
    <MainHeaderLayout>
      <MainHeaderContainer>
        {componentTable[pathType]}
        <LoginBox>{componentTable[loginStatus]}</LoginBox>
      </MainHeaderContainer>
    </MainHeaderLayout>
  );
};

export default MainHeader;
