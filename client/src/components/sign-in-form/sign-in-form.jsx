import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentUser as scu } from '../../store/user/userSlice';
import {
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGoogleRedirect,
  auth,
  getUserData,
} from '../../utils/firebase.utils';
import { getRedirectResult } from 'firebase/auth';
import './sign-in-form.styles.scss';
import FormInput from '../form-input/form-input';
import Button from '../button/button';
import { useNavigate } from 'react-router-dom';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = ({ loadFromLogin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  useEffect(() => {
    const fetchData = async () => {
      const response = await getRedirectResult(auth);
      if (response) {
        loadFromLogin(true);
        await createUserDocumentFromAuth(response.user);
        const { displayName, email, reviews, cart, photoURL } =
          await getUserData();
        dispatch(scu({ displayName, email, reviews, cart, photoURL }));
        navigate('/');
      }
    };
    fetchData();
  }, []);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInAuthUserWithEmailAndPassword(email, password).then(
        async (res) => {
          console.log(res.user);
          loadFromLogin(true);
          const { displayName, email, reviews, cart, photoURL } =
            await getUserData();
          dispatch(scu({ displayName, email, reviews, cart, photoURL }));
          navigate('/');
        }
      );

      resetFormFields();
    } catch (err) {
      switch (err.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('no user associated with this email');
          break;
        default:
          console.log(err);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit} autoComplete='off'>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />
        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button
            buttonType='google'
            type='button'
            onClick={signInWithGoogleRedirect}
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
