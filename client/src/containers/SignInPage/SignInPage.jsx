import SignUpForm from '../../components/sign-up-form/sign-up-form';
import SignInForm from '../../components/sign-in-form/sign-in-form';
import ClipLoader from 'react-spinners/ClipLoader';
import { useState } from 'react';

const SignInPage = () => {
  const [loading, setLoading] = useState(false);

  const loadFromLogin = (isLoading) => {
    setLoading(isLoading);
  };

  return (
    <div style={{ height: '100vh' }} className='d-flex justify-content-center align-items-center'>
      {loading ? (
        <div className='align-items-center'>
          <ClipLoader />
        </div>
      ) : (
        <div
          className='authentication-container'
          style={{
            display: 'flex',
            width: '900px',
            justifyContent: 'space-between',
            margin: '30px auto',
          }}
        >
          
          <SignInForm loadFromLogin={loadFromLogin} />
          <SignUpForm loadFromLogin={loadFromLogin} />
        </div>
      )}
    </div>
  );
};
export default SignInPage;
