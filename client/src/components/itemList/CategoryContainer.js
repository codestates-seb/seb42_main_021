import styled from 'styled-components';
import { useCallback } from 'react';

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

const CategoryContainer = ({ categoryFilter, setCategoryFilter }) => {
  const handleCategoryClick = useCallback(
    (category) => {
      setCategoryFilter(category);
    },
    [setCategoryFilter]
  );

  const categoryItems = [
    { category: 'NO_CATEGORY', imgSrc: allView, text: '전체보기' },
    { category: 'TENT', imgSrc: tent, text: '텐트' },
    { category: 'CHAIR', imgSrc: chair, text: '체어' },
    { category: 'TABLE', imgSrc: table, text: '테이블' },
    { category: 'LIGHT', imgSrc: light, text: '조명' },
    { category: 'FIREPLACE', imgSrc: campingbulmung, text: '화로대' },
  ];

  return (
    <CategoryContainerDiv>
      {categoryItems.map(({ category, imgSrc, text }) => (
        <ImgButton key={category} onClick={() => handleCategoryClick(category)}>
          <img
            src={imgSrc}
            alt={text}
            className={categoryFilter === category ? 'option' : ''}
          />
          <p>{text}</p>
        </ImgButton>
      ))}
    </CategoryContainerDiv>
  );
};

export default CategoryContainer;
