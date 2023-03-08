import styled from 'styled-components';

const Container = styled.div`
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 530px;
  height: 80px;
  background-color: white;
  position: fixed;
  top: 0;
`;

const MainHeader = () => {
  return <Container></Container>;
};

export default MainHeader;
