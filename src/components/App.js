import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase';
import Header from './Header';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
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
          <Header isLoggedIn={isLoggedIn} />
          <AppRouter isLoggedIn={isLoggedIn} />
        </>
      ) : (
        '불러오는중'
      )}
    </>
  );
}

export default App;
