import styled from 'styled-components';
import tent from '../../img/tent.png';
import chair from '../../img/chair.jpg';
import table from '../../img/table.jpg';
import light from '../../img/light.jpg';
import campingbulmung from '../../img/campingbulmung.jpg';
import allView from '../../img/allView.png';
const CategoryContainerDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 25px;
`;
const ImgButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  :hover {
    background-color: var(--grayblue);
  }
  img {
    width: 50px;
    height: 50px;
  }
  p {
    margin-top: 5px;
    font-size: 16px;
    font-weight: bold;
    color: var(--gray);
  }
  .option {
    box-shadow: 7px 3px 3px var(--blue200);
  }
`;

// api 받은 후 setFilterOption 테스트하기.
const CategoryContainer = ({ categoryFilter, setCategoryFilter }) => {
  return (
    <CategoryContainerDiv>
      <ImgButton onClick={() => setCategoryFilter('NO_CATEGORY')}>
        <img
          src={allView}
          alt="전체보기"
          className={categoryFilter === 'NO_CATEGORY' ? 'option' : null}
        />
        <p>전체보기</p>
      </ImgButton>
      <ImgButton onClick={() => setCategoryFilter('TENT')}>
        <img
          src={tent}
          alt="텐트"
          className={categoryFilter === 'TENT' ? 'option' : null}
        />
        <p>텐트</p>
      </ImgButton>
      <ImgButton onClick={() => setCategoryFilter('CHAIR')}>
        <img
          src={chair}
          alt="의자"
          className={categoryFilter === 'CHAIR' ? 'option' : null}
        />
        <p>체어</p>
      </ImgButton>
      <ImgButton onClick={() => setCategoryFilter('TABLE')}>
        <img
          src={table}
          alt="테이블"
          className={categoryFilter === 'TABLE' ? 'option' : null}
        />
        <p>테이블</p>
      </ImgButton>
      <ImgButton onClick={() => setCategoryFilter('LIGHT')}>
        <img
          src={light}
          alt="조명"
          className={categoryFilter === 'LIGHT' ? 'option' : null}
        />
        <p>조명</p>
      </ImgButton>
      <ImgButton onClick={() => setCategoryFilter('FIREPLACE')}>
        <img
          src={campingbulmung}
          alt="화로대"
          className={categoryFilter === 'FIREPLACE' ? 'option' : ''}
        />
        <p>화로대</p>
      </ImgButton>
    </CategoryContainerDiv>
  );
};

export default CategoryContainer;
