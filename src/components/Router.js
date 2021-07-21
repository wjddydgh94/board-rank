import React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  withRouter,
} from 'react-router-dom';
import DetailPage from 'routes/Detail';
import EditProfilePage from 'routes/EditProfile';
import HomePage from 'routes/Home';
import ProfilePage from '../routes/Profile';

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/profile">
          <ProfilePage userObj={userObj} />
        </Route>
        <Route exact path="/edit-profile">
          <EditProfilePage userObj={userObj} />
        </Route>
        <Route path="/detail/:gameId">
          <DetailPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
