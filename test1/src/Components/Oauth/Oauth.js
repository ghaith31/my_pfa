import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '/home/ghaith/Bureau/my_pfa/test1/src/redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { app } from '../../firebase';
import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/google ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data)); //signInSuccess
      navigate('/');
    } catch (error) {
      console.log('could not sign in with google', error);
    }
  };
  return (
    
      <Button type='button' gradientMonochrome="failure" outline onClick={handleGoogleClick}>
          <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
          Continue with Google
      </Button>
    )
  }