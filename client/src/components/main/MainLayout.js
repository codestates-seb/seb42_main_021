import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 16px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

function MainLayout({ children }) {
  return <Layout>{children}</Layout>;
}

export default MainLayout;
