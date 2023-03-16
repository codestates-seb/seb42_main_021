import styled from 'styled-components';
import tent from '../../img/tent.png';
import chair from '../../img/chair.jpg';
import table from '../../img/table.jpg';
import light from '../../img/light.jpg';
import campingbulmung from '../../img/campingbulmung.jpg';

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
      <ImgButton onClick={() => setCategoryFilter('TENT')}>
        <img
          src={tent}
          alt="텐트"
          className={categoryFilter === 0 ? 'option' : null}
        />
        <p>텐트</p>
      </ImgButton>
      <ImgButton onClick={() => setCategoryFilter('CHAIR')}>
        <img
          src={chair}
          alt="의자"
          className={categoryFilter === 1 ? 'option' : null}
        />
        <p>체어</p>
      </ImgButton>
      <ImgButton onClick={() => setCategoryFilter('TABLE')}>
        <img
          src={table}
          alt="테이블"
          className={categoryFilter === 2 ? 'option' : null}
        />
        <p>테이블</p>
      </ImgButton>
      <ImgButton onClick={() => setCategoryFilter('LIGHT')}>
        <img
          src={light}
          alt="조명"
          className={categoryFilter === 3 ? 'option' : null}
        />
        <p>조명</p>
      </ImgButton>
      <ImgButton onClick={() => setCategoryFilter('FIRE')}>
        <img
          src={campingbulmung}
          alt="화로대"
          className={categoryFilter === 4 ? 'option' : ''}
        />
        <p>화로대</p>
      </ImgButton>
    </CategoryContainerDiv>
  );
};

export default CategoryContainer;
