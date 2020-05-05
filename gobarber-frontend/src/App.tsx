import React from 'react';
import GlobalStyle from './styles/global';
import SignIn from './pages/SignIn';
import SignOut from './pages/SignOut';

const App: React.FC = () => (
  <>
    <SignOut />
    <GlobalStyle />
  </>
);

export default App;
