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
  .circle11,
  .circle2,
  .circle22,
  .circle3,
  .circle33,
  .circle4,
  .circle44 {
    position: absolute;
    background-color: white;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    border: 1px solid var(--grayblue);
    box-shadow: 0 0 0 1px var(--graywhite);
    :hover {
      opacity: 0.9;
    }
  }
  .circle1 {
    top: 100px;
    left: -20px;
  }
  .circle11 {
    top: 160px;
    left: -130px;
  }
  .circle2 {
    top: 120px;
    left: 120px;
  }
  .circle22 {
    top: -50px;
    left: 50px;
  }
  .circle3 {
    top: 50px;
    left: -10px;
  }
  .circle4 {
    top: 110px;
    left: 10px;
  }
  .circle44 {
    top: 150px;
    left: -50px;
  }
  .oneTheme1,
  .oneTheme2,
  .twoTheme1,
  .twoTheme2,
  .threeTheme1,
  .fourTheme1,
  .fourTheme2 {
    position: absolute;
    width: 180px;
    height: 100px;
    border-radius: var(--bd-rd);
    border: 2px solid var(--border);
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 1px solid var(--grayblue);
    box-shadow: 0 0 0 3px var(--graywhite);
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
          transform: translateY(5px);
        }
      }
    }
  }
  .oneTheme1 {
    top: 0px;
    left: 0px;
  }
  .oneTheme2 {
    top: 190px;
    left: -110px;
  }
  .twoTheme1 {
    top: 150px;
    left: 120px;
  }
  .twoTheme2 {
    top: -20px;
    left: -70px;
  }
  .threeTheme1 {
    top: -50px;
    left: 10px;
  }

  .fourTheme1 {
    top: 0px;
    left: 30px;
  }
  .fourTheme2 {
    top: 180px;
    left: -180px;
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
            <div className="oneTheme1">
              <div>
                <h4>폴더 스탭션 캠핑의자</h4>
                <img src={right} alt="" />
              </div>
              <div>체어</div>
              <div>
                <img src={money} alt="" />
                <span>30,400</span>
              </div>
            </div>
            <div>
              <span>
                <img src={circle} alt="" className="circle1" />
              </span>
            </div>
          </CuratingImg>
          <CuratingImg to="/product/2">
            <div className="oneTheme2">
              <div>
                <h4>폴딩 우드 테이블</h4>
                <img src={right} alt="" />
              </div>
              <div>테이블</div>
              <div>
                <img src={money} alt="" />
                <span>34,000</span>
              </div>
            </div>
            <div>
              <span>
                <img src={circle} alt="" className="circle11" />
              </span>
            </div>
          </CuratingImg>
        </>
      ) : null}
      {location.pathname === '/curation/2' ? (
        <>
          <CuratingImg to="/product/3">
            <div className="twoTheme1">
              <div>
                <h4>경량 와이드 캠핑의자</h4>
                <img src={right} alt="" />
              </div>
              <div>체어</div>
              <div>
                <img src={money} alt="" />
                <span>21,500</span>
              </div>
            </div>
            <div>
              <span>
                <img src={circle} alt="" className="circle2" />
              </span>
            </div>
          </CuratingImg>
          <CuratingImg to="/product/4">
            <div className="twoTheme2">
              <div>
                <h4>레트로 캠핑 랜턴</h4>
                <img src={right} alt="" />
              </div>
              <div>조명</div>
              <div>
                <img src={money} alt="" />
                <span>14,900</span>
              </div>
            </div>
            <div>
              <span>
                <img src={circle} alt="" className="circle22" />
              </span>
            </div>
          </CuratingImg>
        </>
      ) : null}
      {location.pathname === '/curation/3' ? (
        <>
          <CuratingImg to="/product/5">
            <div className="threeTheme1">
              <div>
                <h4>몬베이지 그린 벨트</h4>
                <img src={right} alt="" />
              </div>
              <div>텐트</div>
              <div>
                <img src={money} alt="" />
                <span>115,000</span>
              </div>
            </div>
            <div>
              <img src={circle} alt="" className="circle3" />
            </div>
          </CuratingImg>
        </>
      ) : null}
      {location.pathname === '/curation/4' ? (
        <>
          <CuratingImg to="/product/6">
            <div className="fourTheme1">
              <div>
                <h4>코어 이지스 테이블</h4>
                <img src={right} alt="" />
              </div>
              <div>테이블</div>
              <div>
                <img src={money} alt="" />
                <span>29,500</span>
              </div>
            </div>
            <div>
              <span>
                <img src={circle} alt="" className="circle4" />
              </span>
            </div>
          </CuratingImg>
          <CuratingImg to="/product/7">
            <div className="fourTheme2">
              <div>
                <h4>내셔널 경량 체어</h4>
                <img src={right} alt="" />
              </div>
              <div>체어</div>
              <div>
                <img src={money} alt="" />
                <span>24,000</span>
              </div>
            </div>
            <div>
              <span>
                <img src={circle} alt="" className="circle44" />
              </span>
            </div>
          </CuratingImg>
        </>
      ) : null}
      <img src={curatingContent[0].img} alt="" />
    </CuratingBodyImgBox>
  );
};

export default CuratingBodyImg;
