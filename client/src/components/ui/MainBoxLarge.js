import styled, { css } from 'styled-components';
import camping2 from '../../img/camping2.jpg';

const MainPageBox = styled.div`
  display: flex;
  align-items: center;
  width: ${(props) => (props.width === 'width' ? '100%' : '353px')};
  height: 100px;
  background-image: ${(props) =>
    props.width === 'width' ? `url(${camping2})` : ''};
  background-size: cover;
`;
const MainPageContent = styled.p`
  text-align: center;
  font-size: 6px;
  font-weight: bold;
  font-size: 12px;
  line-height: 1.5;
  text-align: left;
  ${(props) =>
    props.width &&
    css`
      color: white;
      font-size: 20px;
      width: 100%;
      text-align: center;
    `};
`;

const MainBoxLarge = ({ children, width }) => {
  return (
    <>
      <MainPageBox width={width}>
        <MainPageContent width={width}>{children}</MainPageContent>
      </MainPageBox>
    </>
  );
};

export default MainBoxLarge;
