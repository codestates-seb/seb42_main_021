import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import Main from '../components/main/Main';
import MainLayout from '../components/main/MainLayout';
import Footer from '../components/main/Footer';
import { FaCamera, FaChevronRight } from 'react-icons/fa';
import island from '../img/island.jpg';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const ProfileImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 100%;
  margin-bottom: 30px;
  > div {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  }
  #imageBox {
    position: relative;
    overflow: hidden;
    border: 1px solid var(--border);
    border-radius: 50%;
    width: 100px;
    height: 100px;
    img {
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  button {
    position: absolute;
    top: 70px;
    left: 70px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: var(--blue);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ProfileContainer = styled.div`
  height: 150px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  label {
    width: 100%;
  }
  span {
    color: var(--gray);
    width: 50%;
    text-align: right;
  }
  input {
    color: var(--black);
    width: 50%;
  }
  .profileBox {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    width: 100%;
  }
  .iconCell {
    margin-left: 5px;
    width: 20px;
  }
`;

const ListContainer = styled.div`
  width: 100%;
  h1 {
    padding-bottom: 5px;
    border-bottom: 3px solid var(--border);
  }
  li {
    height: 100px;
    padding: 0 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid var(--border);
    #price {
      font-size: x-large;
      font-weight: bold;
    }
    #date {
      margin-top: 5px;
      font-size: small;
      text-align: right;
      color: var(--gray);
    }
  }
`;

const Toggle = styled.button`
  width: 50px;
  height: 25px;
  border-radius: 30px;
  border: none;
  background-color: ${(props) => (!props.toggle ? '#c9c9c9' : '#61a0ff')};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
`;

const Circle = styled.div`
  background-color: white;
  width: 20px;
  height: 20px;
  border-radius: 50px;
  position: absolute;
  left: 5%;
  transition: all 0.5s ease-in-out;
  transform: ${(props) => props.toggle && 'translate(22px, 0)'};
`;

const Mypage = () => {
  const [toggle, setToggle] = useState(false);
  const [Image, setImage] = useState(null);
  const [name, setName] = useState(null); //서버에서 받아온 이름 초기값으로 넣기
  const [comment, setComment] = useState(null); //서버에서 받아온 소개글 초기값으로 넣기
  const [updateProduct, setUpdateProdcut] = useState(1);

  const [nameEdit, setNameEdit] = useState(false);
  const [introEdit, setIntroEdit] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();

  const accesseToken = cookies.accessToken;
  const refreshToken = cookies.refreshToken;

  const fileInput = useRef();

  const readUserInfomation = async () => {
    const { data } = await axios.get(`/members/mypage`, {
      headers: {
        Authorization: `Bearer ${accesseToken} `,
        Refresh: `${refreshToken}`,
      },
    });
    return data;
  };

  // const readOrderData = async () => {
  //   const { data } = await axios.get(`/members/1/orders`);
  //   console.log(data);
  // };

  useEffect(() => {
    const fetchData = async () => {
      const data = await readUserInfomation();

      setName(data.data.nickname);
      setImage(data.data.profileImg);
      setComment(data.data.comment || '등록해주세요!');
    };
    fetchData();
    setUpdateProdcut(1);
    // await readOrderData();
  }, [updateProduct]);

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
      axios.patch(
        '/members/info',
        { nickname: name },
        {
          headers: {
            Authorization: `Bearer ${accesseToken} `,
            Refresh: `${refreshToken}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    setUpdateProdcut(0);
    handleNameEdit();
  };

  const handleSubmitEditedIntro = (event) => {
    // event.preventDefalt();
    //서버에 수정된 소개 제출하기
    console.log(comment);
    try {
      axios.patch(
        '/members/info',
        { comment: comment },
        {
          headers: {
            Authorization: `Bearer ${accesseToken} `,
            Refresh: `${refreshToken}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
    setUpdateProdcut(0);
    handleIntroEdit();
  };

  const handleImage = (event) => {
    //서버에 새로 등록된 이미지 보내주기
    const formData = new FormData();
    formData.append('profileImageFile', event.target.files[0]);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accesseToken}`,
        Refresh: `${refreshToken}`,
      },
    };

    axios
      .patch('/members/profile-image', formData, config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    setUpdateProdcut(0);
  };

  return (
    <Main>
      <MainLayout>
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
          <h3>유저 닉네임</h3>
        </ProfileImageContainer>
        <ProfileContainer>
          {nameEdit ? (
            <form className="profileBox">
              <label>닉네임</label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <button
                type="button"
                onClick={() => handleSubmitEditedName(name)}
              >
                <FaChevronRight
                  className="iconCell"
                  color="#c9c9c9"
                  size="16px"
                />
              </button>
            </form>
          ) : (
            <div className="profileBox">
              <label>닉네임</label>
              <span>{name}</span>
              <button type="button" onClick={handleNameEdit}>
                <FaChevronRight
                  className="iconCell"
                  color="#c9c9c9"
                  size="16px"
                />
              </button>
            </div>
          )}
          {introEdit ? (
            <form className="profileBox">
              <label>한 줄 소개</label>
              <input
                value={comment}
                onChange={(event) => setComment(event.target.value)}
              />
              <button type="button" onClick={() => handleSubmitEditedIntro()}>
                <FaChevronRight
                  className="iconCell"
                  color="#c9c9c9"
                  size="16px"
                />
              </button>
            </form>
          ) : (
            <div className="profileBox">
              <label>한 줄 소개</label>
              <span>{comment}</span>
              <button type="button" onClick={handleIntroEdit}>
                <FaChevronRight
                  className="iconCell"
                  color="#c9c9c9"
                  size="16px"
                />
              </button>
            </div>
          )}
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
        <Footer />
      </MainLayout>
    </Main>
  );
};

export default Mypage;
