import { GithubAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '/home/ghaith/Bureau/my_pfa/test1/src/redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { app } from '../../firebase';

export default function OAuth2() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch('http://localhost:7003/api/auth/github ', {
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
      console.log('could not sign in with GITHUB', error);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      type='button'
      className='bg-black text-white p-2 rounded-lg uppercase hover:opacity-200 text-lg'
    >
      <b>Continue with GitHub</b>
    </button>
  );
}