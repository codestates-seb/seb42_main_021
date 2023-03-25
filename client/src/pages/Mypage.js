import { FaCamera, FaChevronRight } from 'react-icons/fa';
import Paging from '../components/ui/Pagination';

import Footer from '../components/main/Footer';
import MainLayout from '../components/main/MainLayout';
import Main from '../components/main/Main';
import useMemberInfomation from '../components/mypage/useMemberInfomation';
import {
  Circle,
  ListContainer,
  NologinUser,
  ProfileContainer,
  ProfileImageContainer,
  Signout,
  Toggle,
} from '../components/mypage/Mypage.styled';
import useMypageOrderItems from '../components/mypage/useMypageOrderItems';

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
  } = useMemberInfomation();

  const { orderProdcut, page, setPage, count } = useMypageOrderItems();

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
                {orderProdcut?.map((items) => (
                  <li key={items.id}>
                    {items.orederProductCounts !== 0 ? (
                      <>
                        <div className="product-name">
                          {items.productName}
                          <span className="another-product">
                            외 {items.orederProductCounts}건
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="product-name">{items.productName}</div>
                    )}
                    <div>
                      <div id="price">
                        {items.totalPrice.toLocaleString('ko-KR')}원
                      </div>
                      <div id="date">{items.createdAt}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <Paging page={page} count={count} setPage={setPage} />
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
