import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 530px;
  height: 80px;
  background-color: green;
  position: fixed;
  top: 0;
  border: 1px solid black;
  border-radius: var(--bd-rd);
`;

const MainHeader = () => {
  return <Container></Container>;
};

export default MainHeader;
