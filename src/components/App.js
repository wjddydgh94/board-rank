import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase';
import Header from './Header';
import styled from 'styled-components';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? (
        <>
          <Header isLoggedIn={isLoggedIn} userObj={userObj} />
          <AppLayout>
            <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
          </AppLayout>
        </>
      ) : (
        '불러오는중'
      )}
    </>
  );
}

const AppLayout = styled.section`
  padding-top: 60px;
`;

export default App;
