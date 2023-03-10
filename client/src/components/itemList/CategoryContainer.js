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
`;
// api 받은 후 setFilterOption 테스트하기.
const CategoryContainer = ({ setFilterOption }) => {
  return (
    <CategoryContainerDiv>
      <ImgButton onClick={() => setFilterOption(0)}>
        <img src={tent} alt="텐트" />
        <p>텐트</p>
      </ImgButton>
      <ImgButton onClick={() => setFilterOption(1)}>
        <img src={chair} alt="의자" />
        <p>체어</p>
      </ImgButton>
      <ImgButton onClick={() => setFilterOption(2)}>
        <img src={table} alt="테이블" />
        <p>테이블</p>
      </ImgButton>
      <ImgButton onClick={() => setFilterOption(3)}>
        <img src={light} alt="조명" />
        <p>조명</p>
      </ImgButton>
      <ImgButton onClick={() => setFilterOption(4)}>
        <img src={campingbulmung} alt="화로대" />
        <p>화로대</p>
      </ImgButton>
    </CategoryContainerDiv>
  );
};

export default CategoryContainer;
