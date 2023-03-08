import styled from 'styled-components';

const Container = styled.nav`
  z-index: 1000;
  width: 100%;
  max-width: 530px;
  height: 80px;
  background-color: blue;
  position: fixed;
  bottom: 0;
  border: 1px solid black;
  border-radius: var(--bd-rd);
`;

const Navigation = () => {
  return <Container></Container>;
};

export default Navigation;
