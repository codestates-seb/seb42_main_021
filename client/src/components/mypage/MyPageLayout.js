import React from 'react';

import MainLayout from '../components/main/MainLayout';
import Main from '../components/main/Main';

function MyPageLayout({ children }) {
  return (
    <Main>
      <MainLayout>{children}</MainLayout>
    </Main>
  );
}

export default MyPageLayout;
