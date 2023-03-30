import React from 'react';

import { FaCamera } from 'react-icons/fa';

import useMemberInfomation from './useMemberInfomation';

function ProfileImageContainer() {
  const { handleImage, fileInput, nickname } = useMemberInfomation();

  return (
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
  );
}

export default ProfileImageContainer;
