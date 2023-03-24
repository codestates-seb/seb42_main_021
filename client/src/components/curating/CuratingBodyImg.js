import styled from 'styled-components';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { curationList } from '../../assets/curationState';
import right from '../../img/right.png';
import money from '../../img/money.png';
import circle from '../../img/circle.png';
import { findProductByProductId } from '../api/itemDetailAPI';

const CuratingBodyImgBox = styled.div`
  position: relative;
  img {
    width: 530px;
    height: 530px;
    object-fit: cover;
  }
`;

const CuratingImg = styled.div`
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
    z-index: 1000;
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
  const curatingContent = [curationList.curatingContent[ID - 1]];

  const navigate = useNavigate();

  const handleClick = async (to) => {
    const responseProductDetail = await findProductByProductId(to.slice(-1));

    navigate(to, { state: { responseProductDetail } });
  };

  const renderCuratingImg = (
    to,
    themeNumber,
    title,
    category,
    price,
    circleClass
  ) => (
    <CuratingImg onClick={() => handleClick(to)}>
      <div className={themeNumber}>
        <div>
          <h4>{title}</h4>
          <img src={right} alt="" />
        </div>
        <div>{category}</div>
        <div>
          <img src={money} alt="" />
          <span>{price}</span>
        </div>
      </div>
      <div>
        <span>
          <img src={circle} alt="" className={circleClass} />
        </span>
      </div>
    </CuratingImg>
  );

  return (
    <CuratingBodyImgBox>
      {location.pathname === '/curation/1' && (
        <>
          {renderCuratingImg(
            '/product/1',
            'oneTheme1',
            '폴더 스탭션 캠핑의자',
            '체어',
            '30,400',
            'circle1'
          )}
          {renderCuratingImg(
            '/product/2',
            'oneTheme2',
            '폴딩 우드 테이블',
            '테이블',
            '34,000',
            'circle11'
          )}
        </>
      )}
      {location.pathname === '/curation/2' && (
        <>
          {renderCuratingImg(
            '/product/3',
            'twoTheme1',
            '경량 와이드 캠핑의자',
            '체어',
            '21,500',
            'circle2'
          )}
          {renderCuratingImg(
            '/product/4',
            'twoTheme2',
            '레트로 캠핑 랜턴',
            '조명',
            '14,900',
            'circle22'
          )}
        </>
      )}
      {location.pathname === '/curation/3' && (
        <>
          {renderCuratingImg(
            '/product/5',
            'threeTheme1',
            '몬베이지 그린 벨트',
            '텐트',
            '115,000',
            'circle3'
          )}
        </>
      )}
      {location.pathname === '/curation/4' && (
        <>
          {renderCuratingImg(
            '/product/6',
            'fourTheme1',
            '코어 이지스 테이블',
            '테이블',
            '29,500',
            'circle4'
          )}
          {renderCuratingImg(
            '/product/7',
            'fourTheme2',
            '내셔널 경량 체어',
            '체어',
            '24,000',
            'circle44'
          )}
        </>
      )}
      <img src={curatingContent[0].img} alt="" />
    </CuratingBodyImgBox>
  );
};

export default CuratingBodyImg;
