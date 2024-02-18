import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Oauth from '../../Oauth/Oauth';
import OAuth2 from '../../Oauth/Oauth2';
import { Button, Spinner, Label } from 'flowbite-react';

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
    <div className='p-3 max-w-lg mx-auto '>
    <br /><br /><br />

    <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-red-900 via-red-700 to-red-400 rounded-lg text-white'>
              Holberton
            </span>
            Library
          </Link>
          <p className='text-sm mt-5'>
            This is a demo project. You can sign in with your email and password,github account 
            or with Google.
          </p>
        </div>
        
        <br /><br />

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <Label value='Your name' />
        <input
          type='text'
          placeholder='student name'
          className='border p-3 rounded-lg'
          id='username'
          onChange={handleChange}
        />
        <Label  value='Your email' />
        <input
          type='email'
          placeholder=' name@holbertonstudents.com'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <Label  value='Your password' />
        <input
          type='password'
          placeholder='**********'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />

        
        <Button
              gradientMonochrome="failure"
              type='submit'
              disabled={loading}>
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign UP...'
              )}
            </Button>
        <Oauth/>
        <OAuth2/>

      </form>
      <div className='flex gap-2 mt-5'>
        <p className='text-black'>Have an account?</p>
        <Link to={'/SignIn'}>
          <span className='text-blue-500'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
    
  );
}