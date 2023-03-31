import { useMemo, useState } from 'react';
import { SIGN_IN, SIGN_UP } from './enums/signMode';
import Signin from './SignIn';
import Signup from './SignUp';

const LandingPage = () => {
  const [signMode, setSignMode] = useState(SIGN_IN);
  const SignComponent = useMemo(
    () =>
      signMode === SIGN_UP ? (
        <Signup
          changeToSigninMode={() => {
            setSignMode(SIGN_IN);
          }}
        />
      ) : (
        <Signin
          changeToSignupMode={() => {
            setSignMode(SIGN_UP);
          }}
        />
      ),
    [signMode]
  );
  return SignComponent;
};

export default LandingPage;
