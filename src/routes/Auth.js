import React from 'react';
import { authService, firebaseInstance } from 'fbase';

const AuthPage = () => {
  const onSocialClick = async (event) => {
    const provider = new firebaseInstance.auth.GoogleAuthProvider();
    const data = await authService.signInWithPopup(provider);
  };

  return (
    <div>
      <button onClick={onSocialClick}>구글 로그인 하기</button>
    </div>
  );
};

export default AuthPage;
