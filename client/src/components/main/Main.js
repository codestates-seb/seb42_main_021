import styled from 'styled-components';

const Container = styled.div`
  /* position: relative; */
  height: 850px;
  width: 100%;
  max-width: 530px;
  background-color: var(--white);
  position: sticky;
  top: 80px;
`;

const Main = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Main;
