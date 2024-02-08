import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Oauth from '../../Oauth/Oauth';
import OAuth2 from '../../Oauth/Oauth2';


export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
    
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
      
      setLoading(true);
      const res = await fetch('http://localhost:7003/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log('serveur :', res);

      const data = await res.json();
     
      
      if (data.success === false) {
        setLoading(false);
        setError(data.message || 'creation failure');
        return;
      }
      
      setLoading(false);
      setError(null);
      navigate('/SignIn');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto mr-4'>
      <br /><br /><br /><br /><br /><br /><br />

      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        <input
          type='text'
          placeholder='username'
          className='border p-3 rounded-lg'
          id='username'
          onChange={handleChange}
        />
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
          className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 text-lg '
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <Oauth/>
        <OAuth2/>

      </form>
      <div className='flex gap-2 mt-5'>
        <p className='text-white'>Have an account?</p>
        <Link to={'/SignIn'}>
          <span className='text-blue-500'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
    
  );
}