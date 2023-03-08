import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  width: 100%;
  max-width: 530px;
  background-color: var(--white);
  position: fixed;
  top: 80px;
`;

const Main = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Main;
