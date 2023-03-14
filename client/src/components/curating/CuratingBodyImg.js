import styled from 'styled-components';
import { useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { curationList } from '../../assets/curationState';
import right from '../../img/right.png';
import money from '../../img/money.png';
import circle from '../../img/circle.png';

const CuratingBodyImgBox = styled.div`
  position: relative;
  img {
    width: 530px;
    height: 530px;
    object-fit: cover;
  }
`;

const CuratingImg = styled(Link)`
  position: absolute;
  top: 180px;
  left: 220px;
  img {
    width: 13px;
    height: 13px;
  }
  .circle1,
  .circle2,
  .circle3,
  .circle4 {
    position: absolute;
    background-color: white;
    border-radius: 50%;
    width: 35px;
    height: 35px;
  }
  .circle1 {
    top: 100px;
    left: -20px;
  }
  .circle2 {
    top: 110px;
    left: 120px;
  }
  .circle3 {
    top: 50px;
    left: 0px;
  }
  .circle4 {
    top: 110px;
    left: 10px;
  }
  .one,
  .two,
  .three,
  .four {
    position: absolute;
    width: 130px;
    height: 100px;
    border-radius: var(--bd-rd);
    border: 2px solid var(--border);
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    :hover {
      opacity: 0.9;
    }

    div {
      display: flex;
      margin-bottom: 5px;
      img {
        :nth-child(2) {
          margin-left: 5px;
          transform: translateY(4px);
        }
        :nth-child(1) {
          margin-right: 5px;
        }
      }
    }
  }
  .one {
    top: 0px;
    left: 10px;
  }
  .two {
    top: 0px;
    left: 10px;
  }
  .three {
    top: -50px;
    left: 10px;
  }
  .four {
    top: 0px;
    left: 10px;
  }
`;

const CuratingBodyImg = () => {
  const location = useLocation();
  const { id } = useParams();
  const ID = Number(id);
  const [curatingContent] = useState([curationList.curatingContent[ID - 1]]);

  return (
    <CuratingBodyImgBox>
      {location.pathname === '/curation/1' ? (
        <>
          <CuratingImg to="/product/1">
            <div className="one">
              <div>
                <span>SAMLA 삼라</span>
                <img src={right} alt="" />
              </div>
              <div>수납합</div>
              <div>
                <img src={money} alt="" />
                <span>4,900</span>
              </div>
            </div>
            <div>
              <a href="/product/1">
                <img src={circle} alt="" className="circle1" />
              </a>
            </div>
          </CuratingImg>
        </>
      ) : null}
      {location.pathname === '/curation/2' ? (
        <>
          <CuratingImg to="/product/2">
            <div className="two">
              <div>
                <span>SAMLA 삼라</span>
                <img src={right} alt="" />
              </div>
              <div>수납합</div>
              <div>
                <img src={money} alt="" />
                <span>4,900</span>
              </div>
            </div>
            <div>
              <a href="/product/2">
                <img src={circle} alt="" className="circle2" />
              </a>
            </div>
          </CuratingImg>
        </>
      ) : null}
      {location.pathname === '/curation/3' ? (
        <>
          <CuratingImg to="/product/3">
            <div className="three">
              <div>
                <span>SAMLA 삼라</span>
                <img src={right} alt="" />
              </div>
              <div>수납합</div>
              <div>
                <img src={money} alt="" />
                <span>4,900</span>
              </div>
            </div>
            <div>
              <a href="/product/3">
                <img src={circle} alt="" className="circle3" />
              </a>
            </div>
          </CuratingImg>
        </>
      ) : null}
      {location.pathname === '/curation/4' ? (
        <>
          <CuratingImg to="/product/4">
            <div className="four">
              <div>
                <span>SAMLA 삼라</span>
                <img src={right} alt="" />
              </div>
              <div>수납합</div>
              <div>
                <img src={money} alt="" />
                <span>4,900</span>
              </div>
            </div>
            <div>
              <a href="/product/4">
                <img src={circle} alt="" className="circle4" />
              </a>
            </div>
          </CuratingImg>
        </>
      ) : null}
      <img src={curatingContent[0].img} alt="" />
    </CuratingBodyImgBox>
  );
};

export default CuratingBodyImg;
