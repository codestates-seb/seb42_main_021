import styled from 'styled-components';

const Container = styled.div`
  z-index: 1000;
  width: 100%;
  max-width: 530px;
  height: 80px;
  background-color: var(--whitegray);
  position: fixed;
  top: 0;
  border: 1px solid var(--border);
  border-radius: var(--bd-rd);
`;

const MainHeader = () => {
  return <Container></Container>;
};

export default MainHeader;
