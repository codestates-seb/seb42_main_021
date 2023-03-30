import React from 'react';
import useMemberInfomation from './useMemberInfomation';
import { FaChevronRight } from 'react-icons/fa';
import { Toggle, Circle } from './Mypage.styled';

function ProfileContainer() {
  const { createComponent, nameMode, introMode, clickedToggle, toggle } =
    useMemberInfomation();

  return (
    <ProfileContainer>
      {createComponent('name', nameMode)}
      {createComponent('intro', introMode)}
      <div className="profileBox">
        <label>웹사이트 및 SNS</label>
        <a
          href="https://github.com/codestates-seb/seb42_main_021"
          target="_blank"
          rel="noreferrer"
        >
          <FaChevronRight className="iconCell" color="#c9c9c9" size="16px" />
        </a>
      </div>
      <div className="profileBox">
        <label>마케팅 수신 동의</label>
        <Toggle onClick={clickedToggle} toggle={toggle}>
          <Circle toggle={toggle} />
        </Toggle>
      </div>
    </ProfileContainer>
  );
}

export default ProfileContainer;
