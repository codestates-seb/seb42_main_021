import styled from 'styled-components';
import { useState } from 'react';
import Main from '../components/main/Main';
import MainLayout from '../components/main/MainLayout';
import { FaCamera, FaChevronRight } from 'react-icons/fa';
import profileImage from '../img/shoppingCartItem.png';

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
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    width: 100%;
  }
  label {
    width: 30%;
  }
  span {
    color: var(--gray);
    width: 65%;
    text-align: right;
  }
  .iconCell {
    margin-left: 5px;
    width: 100%;
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
  transform: ${(props) => props.toggle && 'translate(25px, 0)'};
`;

const Mypage = () => {
  const [toggle, setToggle] = useState(false);

  const clickedToggle = () => {
    setToggle(!toggle);
  };

  return (
    <Main>
      <MainLayout>
        <ProfileImageContainer>
          <div>
            <div id="imageBox">
              <img alt="프로필 이미지" src={profileImage}></img>
            </div>
            <button>
              <FaCamera color="#FFFFFF" />
            </button>
          </div>
          <h3>유저 닉네임</h3>
        </ProfileImageContainer>
        <ProfileContainer>
          <div>
            <label>닉네임</label>
            <span>유저 닉네임</span>
            <button>
              <FaChevronRight
                className="iconCell"
                color="#c9c9c9"
                size="16px"
              />
            </button>
          </div>
          <div>
            <label>한 줄 소개</label>
            <span>등록해주세요</span>
            <button>
              <FaChevronRight
                className="iconCell"
                color="#c9c9c9"
                size="16px"
              />
            </button>
          </div>
          <div>
            <label>웹사이트 및 SNS</label>
            <button>
              <FaChevronRight
                className="iconCell"
                color="#c9c9c9"
                size="16px"
              />
            </button>
          </div>
          <div>
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
            <li>
              <div>공기청정기 외 5건</div>
              <div>
                <div id="price">58,000원</div>
                <div id="date">2023.03.15(수)</div>
              </div>
            </li>
            <li>
              <div>공기청정기 외 5건</div>
              <div>
                <div id="price">58,000원</div>
                <div id="date">2023.03.15(수)</div>
              </div>
            </li>
            <li>
              <div>공기청정기 외 5건</div>
              <div>
                <div id="price">58,000원</div>
                <div id="date">2023.03.15(수)</div>
              </div>
            </li>
            <li>
              <div>공기청정기 외 5건</div>
              <div>
                <div id="price">58,000원</div>
                <div id="date">2023.03.15(수)</div>
              </div>
            </li>
          </ul>
        </ListContainer>
      </MainLayout>
    </Main>
  );
};

export default Mypage;
