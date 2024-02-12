import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../../../redux/user/userSlice';
import Oauth from '../../Oauth/Oauth';
import Oauth2 from '../../Oauth/Oauth2';




export default function Signin() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
    
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
      
      dispatch(signInStart());
      const res = await fetch('http://localhost:7003/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log('serveur :', res);

      const data = await res.json();
     
      
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto mr-4 '>
      <br /><br /><br /><br /><br /><br /><br />

      <form onSubmit={handleSubmit} className='flex flex-col gap-5 Sp'>
      
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 text-lg'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <Oauth/>
        <Oauth2/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p className='text-white'>dont have an account?</p>
        <Link to={'/SignUp'}>
          <span className='text-blue-500'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
    
  );
}