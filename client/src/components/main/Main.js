import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 530px;
  background-color: gray;
  opacity: 0.5;
  position: fixed;
  top: 80px;
`;

const Main = () => {
  return <Container></Container>;
};

export default Main;
