import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { curationList } from '../../assets/curationState';
import right from '../../img/right.png';
import money from '../../img/money.png';
import circle from '../../img/circle.png';
import { findProductByProductId } from '../api/itemDetailAPI';
import { CuratingBodyImgBox, CuratingImg } from './CuratingBodyImg.styled';

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
            '폴더 스탭바이 캠핑의자',
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
            '레트로 캠핑 라이트',
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
