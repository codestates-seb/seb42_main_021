import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  width: 530px;
  max-width: 530px;
  background-color: var(--white);
  border-radius: var(--bd-rd);
  padding-top: 90px;
  padding-bottom: 90px;
`;

const Main = ({ children }) => {
  return <Container>{children}</Container>;
};

export default Main;
