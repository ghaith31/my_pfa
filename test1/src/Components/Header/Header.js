import React from 'react'
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
    const { currentUser } = useSelector((state) => state.user);
  return (
    <header className='bg-slate-200 shadow-md'>
    <div className='flex justify-between items-center max-w-7xl mx-auto p-2'>
    <Link to='/'>
     <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
        <span className='text-red-500'>HOLBERTON</span>
        <span className='text-slate-700'>library</span>
     </h1> 
     </Link>   
    <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
        <input type='text' placeholder='Search...' 
        className='bg-transparent focus:outline-none'/>
        <FaSearch className='text-slate-500'/>
    </form>
    <ul className='flex gap-4'>
        
        <Link to='/'>
            <li className='hover:underline'> home </li>
        </Link> 
        <Link to='/about'>
            <li className='hover:underline'> about </li>
        </Link>
        
        <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-14 w-14 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className=' text-slate-700 hover:underline'> Sign in</li>
            )}
          </Link>
        
        
    </ul>

    </div>
      
    </header>
  )
}

export default Header
