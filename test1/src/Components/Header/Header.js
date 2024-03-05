import React from 'react'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineSearch } from 'react-icons/ai';
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { HiAdjustments, HiCloudDownload, HiUserCircle } from 'react-icons/hi';


function Header() {
    const { currentUser } = useSelector((state) => state.user);
  return (
    <header className='bg-slate-200 shadow-md'>
    <div className='flex justify-between items-center max-w-8xl mx-auto p-2'>

    
    
    <Link to='/'  className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
     
     <span className='px-2 py-1 bg-gradient-to-r from-red-800 via-red-500  to-red-300 rounded-lg text-white'>
          Holberton
        </span>
        <span className='text-slate-700'>Library</span>
     
     </Link>   
    <Link to='/'  className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
     
     <span className='px-2 py-1 bg-gradient-to-r from-blue-900 via-blue-600 to-blue-300 rounded-lg text-white'>
          Holberton
        </span>
        <span className='text-slate-700'>Search engine</span>
     
     </Link>   
     <Link to='/'  className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
     
     <span className='px-2 py-1 bg-gradient-to-r from-green-900 via-green-600   to-green-300 rounded-lg text-white'>
          Holberton
        </span>
        <span className='text-slate-700'>English club</span>
     
     </Link>   
    <form className='bg-slate-100 p-1 rounded-lg flex items-center'>
        <TextInput placeholder='Search...' 
        className='bg-transparent focus:outline-none'/> 
        <AiOutlineSearch className='text-slate-500' />
    </form>
    <Button.Group>
    <ul className='flex gap-6'>
    <Button color="gray">
        <Link to='/'>
        
            <li className='hover:underline'> Home </li>
        </Link> 
        </Button>
        <Button color="gray">
        <Link to='/about'>
        

            <li className='hover:underline'> About </li>
        </Link>
        </Button>
         <Button color="gray">
         <HiUserCircle className="mr-5 h-5 w-8" />
        <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-6 w-6 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
               
            ) : (
              <li className=' text-slate-700 hover:underline'> Sign in</li>
            )}
          </Link>
          </Button>
        
    </ul>
</Button.Group>
    </div>
      
    </header>
  )
}

export default Header
