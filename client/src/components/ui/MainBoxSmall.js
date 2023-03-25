import styled from 'styled-components';

const MainBoxSLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 30px;
`;

const MainPageBox = styled.div`
  width: 155px;
  height: 50px;
`;
const MainPageContent = styled.h3`
  display: flex;
  align-items: center;
  text-align: left;
  font-size: 6px;
  font-weight: bold;
  width: 100%;
  height: 100%;
  overflow: auto;
  color: ${(props) => props.color};
  font-size: 12px;
`;
const MainPageContentBorderTop = styled.p`
  margin-top: 20px;
  margin-bottom: 5px;
  background-color: ${(props) => props.backgroundColor};
  width: 80px;
  height: 3px;
  border-radius: var(--bd-rd);
`;

const MainBoxSmall = ({ children, backgroundColor, color }) => {
  return (
    <MainBoxSLayout>
      <MainPageContentBorderTop backgroundColor={backgroundColor} />
      <MainPageBox>
        <MainPageContent color={color}>{children}</MainPageContent>
      </MainPageBox>
    </MainBoxSLayout>
  );
};

export default MainBoxSmall;
