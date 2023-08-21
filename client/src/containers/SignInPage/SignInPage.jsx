import SignUpForm from '../../components/sign-up-form/sign-up-form';
import SignInForm from '../../components/sign-in-form/sign-in-form';

const SignInPage = () => {
  return (
    <div
      className='authentication-container'
      style={{
        display: 'flex',
        width: '900px',
        justifyContent: 'space-between',
        margin: '30px auto',
      }}
    >
      <SignInForm />
      <SignUpForm />
    </div>
  );
};
export default SignInPage;
