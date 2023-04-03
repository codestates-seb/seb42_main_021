import styled from 'styled-components';

export const CuratingBodyImgBox = styled.div`
  position: relative;
  img {
    width: 530px;
    height: 530px;
    object-fit: cover;
  }
`;

export const CuratingImg = styled.div`
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
    width: 200px;
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
    left: 100px;
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
