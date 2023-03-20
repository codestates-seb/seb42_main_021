import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import logolast3 from '../../img/logolast3.png';
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
  img {
    width: 100px;
    height: 80px;
    object-fit: scale-down;
  }
`;

const LogoBox = styled.div`
  transform: translateX(5px);
  cursor: pointer;
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
    width: 100%;
    height: 100%;
    border-radius: var(--bd-rd);
    object-fit: cover;
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
  const [profileImage, setProfileImage] = useState('../../img/logolast3.png');
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies();
  const accessToken = cookies.accessToken;
  const refreshToken = cookies.refreshToken;

  const getUserProfile = async (accessToken) => {
    try {
      const { data } = await axios.get(`/members/mypage`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Refresh: `${refreshToken}`,
        },
      });
      return data.data;
    } catch (error) {
      console.error(error);
    }
  };

  if (accessToken) {
    getUserProfile(accessToken).then((profile) =>
      setProfileImage(profile.profileImg)
    );
  }

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
              <img className="logo5" src={logolast3} alt="" />
            </LogoBox>
          </>
        ) : (
          <LogoBox onClick={() => navigate('/')}>
            <img className="logo5" src={logolast3} alt="" />
          </LogoBox>
        )}
        <LoginBox>
          {accessToken ? (
            <div>
              <LoginLink to="/mypage">
                <img src={profileImage} alt="프로필" />
              </LoginLink>
              <LoginLink to="/login" className="logout">
                로그아웃
              </LoginLink>
            </div>
          ) : (
            <div>
              <LoginLink to="/login" className="logout">
                로그인
              </LoginLink>
              <LoginLink to="/signup" className="signup">
                회원가입
              </LoginLink>
            </div>
          )}
        </LoginBox>
      </MainHeaderContainer>
    </MainHeaderLayout>
  );
};

export default SubHeader;
