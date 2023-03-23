import { FaCamera, FaChevronRight } from 'react-icons/fa';

import Footer from '../components/main/Footer';
import MainLayout from '../components/main/MainLayout';
import Main from '../components/main/Main';
import useMypage from '../components/mypage/useMypage';
import {
  Circle,
  ListContainer,
  NologinUser,
  ProfileContainer,
  ProfileImageContainer,
  Signout,
  Toggle,
} from '../components/mypage/Mypage.styled';

const Mypage = () => {
  const {
    toggle,
    Image,
    nickname,
    refreshToken,
    fileInput,
    doEditName,
    doEditIntro,
    componentGroup,
    clickedToggle,
    handleImage,
    handleSignOut,
  } = useMypage();
  return (
    <Main>
      <MainLayout>
        {!refreshToken ? (
          <NologinUser>로그인 후 이용해 주세요</NologinUser>
        ) : (
          <>
            {' '}
            <ProfileImageContainer>
              <div>
                <div id="imageBox">
                  <img alt="프로필 이미지" src={Image}></img>
                  <input
                    type="file"
                    style={{ display: 'none' }}
                    accept="image/jpg,image/png,image/jpeg"
                    name="profile_img"
                    onChange={handleImage}
                    ref={fileInput}
                  />
                </div>
                <button
                  onClick={() => {
                    fileInput.current.click();
                  }}
                >
                  <FaCamera color="#FFFFFF" />
                </button>
              </div>
              <h3>{nickname}</h3>
            </ProfileImageContainer>
            <ProfileContainer>
              {componentGroup[doEditName]}
              {componentGroup[doEditIntro]}
              <div className="profileBox">
                <label>웹사이트 및 SNS</label>
                <a
                  href="https://github.com/codestates-seb/seb42_main_021"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaChevronRight
                    className="iconCell"
                    color="#c9c9c9"
                    size="16px"
                  />
                </a>
              </div>
              <div className="profileBox">
                <label>마케팅 수신 동의</label>
                <Toggle onClick={clickedToggle} toggle={toggle}>
                  <Circle toggle={toggle} />
                </Toggle>
              </div>
            </ProfileContainer>
            <ListContainer>
              <h1>최근 주문내역</h1>
              <ul>
                <li>
                  <div>공기청정기 외 5건</div>
                  <div>
                    <div id="price">58,000원</div>
                    <div id="date">2023.03.15(수)</div>
                  </div>
                </li>
              </ul>
            </ListContainer>
            <Signout onClick={handleSignOut}>회원탈퇴</Signout>
          </>
        )}

        <Footer />
      </MainLayout>
    </Main>
  );
};

export default Mypage;
