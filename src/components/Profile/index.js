import React from 'react';
import styled from 'styled-components';
import defaultProfileImg from '../../img/17004.png';
import { HashRouter as Router, Link } from 'react-router-dom';
import palette from 'styles/palette';

const Profile = ({ userObj }) => {
  return (
    <StyledMain className="inner">
      <article>
        <section className="profile-section">
          <div className="profile-picture">
            {!userObj.photoURL && (
              <img
                className="default-profile-img"
                src={defaultProfileImg}
                alt="기본 프로필"
              />
            )}
            {userObj.photoURL && (
              <img
                className="profile-img"
                src={userObj.photoURL}
                alt="프로필 사진"
              />
            )}
          </div>
          <div className="info-container">
            <h5>{userObj.displayName ? userObj.displayName : userObj.email}</h5>
            <Router>
              <StyledLink to="/edit-profile">프로필 편집</StyledLink>
            </Router>
          </div>
        </section>
      </article>
    </StyledMain>
  );
};

const StyledMain = styled.main`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 60px auto 0;

  article {
    padding: 120px 0;

    .profile-section {
      width: 100%;
      display: flex;

      .profile-picture {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        overflow: hidden;
        background-color: #ced4da;
        margin-right: 100px;
        .default-profile-img {
          width: 150px;
          margin-top: -13px;
        }
        .profile-img {
          width: 150px;
          height: 150px;
          object-fit: cover;
        }
      }
    }
  }
`;

const StyledLink = styled(Link)`
  color: ${palette.grey_1};
  background-color: #099268;
  padding: 10px;
  border-radius: 5px;
  font-size: 0.8rem;
  opacity: 0.8;
  cursor: pointer;
  display: inline-block;
  margin-top: 30px;
  &:hover {
    opacity: 1;
  }
`;

export default Profile;
