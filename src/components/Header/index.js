import React from 'react';
import styled from 'styled-components';
import { HashRouter as Router, Link } from 'react-router-dom';
import { authService, firebaseInstance } from 'fbase';

const Header = ({ isLoggedIn, userObj }) => {
  const onLogOutClick = () => authService.signOut();
  const onSocialClick = async (event) => {
    const provider = new firebaseInstance.auth.GoogleAuthProvider();
    const data = await authService.signInWithPopup(provider);
  };

  return (
    <StyledHeader>
      <div className="header-inner">
        <Router className="logo">
          <Link to="/">
            <img src="/image/board_rank_logo.svg" />
          </Link>
        </Router>
        {isLoggedIn ? (
          <div className="hello-user">
            <span className="user-email">
              HELLO,
              <Router>
                <Link to="/profile">
                  {userObj.displayName ? userObj.displayName : userObj.email}
                </Link>
              </Router>
            </span>
            <div className="header-separate"></div>
            <button className="logout" onClick={onLogOutClick}>
              logout
            </button>
          </div>
        ) : (
          <StyledLogInButton onClick={onSocialClick}>
            login with Google
          </StyledLogInButton>
        )}
      </div>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
  width: 100%;
  height: 70px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 0px;
  background-color: #2f2f2f;

  .header-inner {
    width: 100%;
    max-width: 1320px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 113px 0 22px;

    .logo {
      width: 110px;
    }

    button {
      font-size: 0.8rem;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
    .hello-user {
      font-weight: 500;
      font-size: 16px;
      line-height: 100%;
      color: #ffffff;
      display: flex;
      align-items: center;
      .user-email {
        margin-right: 35px;
        a {
          font-weight: 900;
          color: #ffffff;
          cursor: pointer;
          margin-left: 5px;
        }
      }
      .header-separate {
        width: 1px;
        height: 16px;
        background-color: #fff;
        margin-right: 44px;
      }
    }
    .logout {
      font-weight: normal;
      font-size: 16px;
      line-height: 100%;
      color: #ffffff;
      cursor: pointer;
      background: none;
    }
  }
`;

const StyledLogInButton = styled.button`
  color: #fff;
  background-color: #099268;
  padding: 10px;
  border-radius: 5px;
  margin-left: 15px;
`;

export default Header;
