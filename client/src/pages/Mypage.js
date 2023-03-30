import Footer from '../components/main/Footer';
import MyPageLayout from '../components/mypage/MyPageLayout';

import useMemberInfomation from '../components/mypage/useMemberInfomation';

import { NologinUser, Signout } from '../components/mypage/Mypage.styled';

import ProfileImageContainer from '../components/mypage/ProfileImageContainer';
import ProfileContainer from '../components/mypage/ProfileContainer';
import ListContainer from '../components/mypage/ListContainer';

const Mypage = () => {
  const { refreshToken, handleSignOut } = useMemberInfomation();

  if (!refreshToken) {
    return (
      <MyPageLayout>
        <NologinUser>로그인 후 이용해 주세요</NologinUser>
      </MyPageLayout>
    );
  }

  return (
    <MyPageLayout>
      <ProfileImageContainer />
      <ProfileContainer />
      <ListContainer />
      <Signout onClick={handleSignOut}>회원탈퇴</Signout>
      <Footer />
    </MyPageLayout>
  );
};

export default Mypage;
