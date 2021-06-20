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
      <div className="inner">
        {isLoggedIn ? (
          <>
            <div className="hello-user">
              <span className="user-email">
                <Router>
                  <Link to="/profile">
                    {userObj.displayName ? userObj.displayName : userObj.email}
                  </Link>
                </Router>
              </span>
              님, 안녕하세요!
            </div>
            <button className="logout" onClick={onLogOutClick}>
              로그아웃
            </button>
          </>
        ) : (
          <StyledLogInButton onClick={onSocialClick}>
            구글 계정으로 로그인
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
  height: 60px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 0px;
  background-color: rgba(255, 255, 255, 0.05);

  .inner {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    button {
      font-size: 0.8rem;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
    .hello-user {
      color: #495057;
      font-size: 0.8rem;
      margin-right: 15px;
      .user-email {
        a {
          color: #868e96;
          font-size: 0.9rem;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
    .logout {
      color: #fff;
      background-color: #099268;
      padding: 10px;
      border-radius: 5px;
      font-size: 0.8rem;
      opacity: 0.8;
      cursor: pointer;
      &:hover {
        opacity: 1;
      }
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
