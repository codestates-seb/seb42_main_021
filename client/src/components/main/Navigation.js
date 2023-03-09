import styled from 'styled-components';

const Container = styled.nav`
  z-index: 1000;
  width: 100%;
  max-width: 530px;
  height: 80px;
  background-color: var(--whitegray);
  position: fixed;
  bottom: 0;
  border: none;
  border-radius: var(--bd-rd);
`;

const Navigation = () => {
  return <Container></Container>;
};

export default Navigation;
