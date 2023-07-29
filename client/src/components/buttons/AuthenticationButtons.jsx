import React, { useState } from 'react';
import SignUp from './SignUp';
import Login from './Login';

const AuthenticationButtons = () => {
  const [isSignInActive, setIsSignInActive] = useState(false);

  return (
    <>
      <Login isSignInActive={isSignInActive} setIsSignInActive={setIsSignInActive} />
      <SignUp isSignInActive={isSignInActive} setIsSignInActive={setIsSignInActive} />
    </>
  );
};

export default AuthenticationButtons;