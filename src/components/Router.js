import React, { useState } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import AuthPage from '../routes/Auth';
import HomePage from '../routes/Home';

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <HomePage />
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <AuthPage />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
