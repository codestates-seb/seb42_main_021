import React, { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import instance from '../newAxios';
import { FaCamera, FaChevronRight } from 'react-icons/fa';

const useMypage = () => {
  const [updateProduct, setUpdateProdcut] = useState(1);

  const [toggle, setToggle] = useState(false);
  const [nameEdit, setNameEdit] = useState(false);
  const [introEdit, setIntroEdit] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();

  const [memberInformation, setMemberInformation] = useState({
    id: 1,
    nickname: null,
    comment: null,
    image: null,
  });

  const { nickname, comment, image } = memberInformation;

  const refreshToken = cookies.refreshToken;

  const fileInput = useRef();

  const readUserInfomation = async () => {
    const { data } = await instance.get(`/members/mypage`);
    return data;
  };

  const readOrderData = async () => {
    const { data } = await instance.get(`/orders/all`);
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await readUserInfomation();
      setMemberInformation((previous) => ({
        ...previous,
        nickname: data.data.nickname,
        comment: data.data.comment,
        image: data.data.profileImg,
      }));
    };
    // const orderProduct = async () => {
    //   const data = await readOrderData();
    //   console.log(data);
    // };
    // orderProduct();
    fetchData();
    setUpdateProdcut(1);
  }, [updateProduct]);

  const handleInformationChange = (event) => {
    const { value, name } = event.target;

    setMemberInformation((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const clickedToggle = () => {
    setToggle(!toggle);
  };

  const handleNameEdit = () => {
    setNameEdit(!nameEdit);
  };

  const handleIntroEdit = () => {
    setIntroEdit(!introEdit);
  };

  const handleSubmitEditedName = async (event) => {
    //서버에 수정된 이름 제출하기
    try {
      instance.patch('/members/info', { nickname: nickname });
    } catch (error) {
      console.log(error);
    }
    handleNameEdit();
    setUpdateProdcut(0);
    removeCookie('accessToken');
  };

  const handleSubmitEditedIntro = (event) => {
    try {
      instance.patch('/members/info', { comment: comment });
    } catch (error) {
      console.log(error);
    }
    handleIntroEdit();
    setUpdateProdcut(0);
  };

  const handleImage = (event) => {
    const formData = new FormData();
    formData.append('profileImageFile', event.target.files[0]);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    instance
      .patch('/members/profile-image', formData, config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    setUpdateProdcut(0);
  };

  const handleSignOut = async () => {
    await instance.delete(`/members`);
    removeCookie('accessToken', { path: '/' });
    removeCookie('refreshToken', { path: '/' });
  };

  const getEditType = (isEdited, typeIfEdited, typeIfNotEdited) => {
    return isEdited ? typeIfEdited : typeIfNotEdited;
  };

  const doEditName = getEditType(nameEdit, 'yesNameEdit', 'noEditName');
  const doEditIntro = getEditType(introEdit, 'yesIntroEdit', 'noIntroEdit');

  const componentGroup = {
    yesNameEdit: (
      <form className="profileBox">
        <label>닉네임</label>
        <input
          value={nickname}
          name="nickname"
          onChange={handleInformationChange}
        />
        <button type="form" onClick={() => handleSubmitEditedName(nickname)}>
          <FaChevronRight className="iconCell" color="#c9c9c9" size="16px" />
        </button>
      </form>
    ),
    noEditName: (
      <div className="profileBox">
        <label>닉네임</label>
        <span>{nickname}</span>
        <button type="button" onClick={handleNameEdit}>
          <FaChevronRight className="iconCell" color="#c9c9c9" size="16px" />
        </button>
      </div>
    ),
    yesIntroEdit: (
      <form className="profileBox">
        <label>한 줄 소개</label>
        <input
          value={comment}
          name="comment"
          onChange={handleInformationChange}
        />
        <button type="form" onClick={() => handleSubmitEditedIntro()}>
          <FaChevronRight className="iconCell" color="#c9c9c9" size="16px" />
        </button>
      </form>
    ),
    noIntroEdit: (
      <div className="profileBox">
        <label>한 줄 소개</label>
        <span>{comment}</span>
        <button type="button" onClick={handleIntroEdit}>
          <FaChevronRight className="iconCell" color="#c9c9c9" size="16px" />
        </button>
      </div>
    ),
  };

  return {
    toggle,
    Image: image,
    nickname,
    comment,
    refreshToken,
    fileInput,
    doEditName,
    doEditIntro,
    componentGroup,
    clickedToggle,
    handleImage,
    handleSignOut,
  };
};

export default useMypage;
