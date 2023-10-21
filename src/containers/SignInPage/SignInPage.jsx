import SignUpForm from '../../components/sign-up-form/sign-up-form';
import SignInForm from '../../components/sign-in-form/sign-in-form';
import ClipLoader from 'react-spinners/ClipLoader';
import { useState } from 'react';
import './SignInPage.styles.scss'

const SignInPage = () => {
  const [loading, setLoading] = useState(false);

  const loadFromLogin = (isLoading) => {
    setLoading(isLoading);
  };
  window.scrollTo(0, 0);
  return (
    <div
      style={{ height: '100vh' }}
      className='d-flex justify-content-center align-items-center w-100'
    >
      {loading ? (
        <div className='align-items-center'>
          <ClipLoader />
        </div>
      ) : (
        <div
          className='sign-in-container container'
          style={{
            display: 'flex',
            maxWidth: '900px',
            width: '80%',
            justifyContent: 'space-between',
            margin: '30px auto',
          }}
        >
          <SignInForm loadFromLogin={loadFromLogin} />
          <div className='vr vr-signin'></div>
          <SignUpForm loadFromLogin={loadFromLogin} />
        </div>
      )}
    </div>
  );
};
export default SignInPage;
