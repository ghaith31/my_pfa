import { Sidebar } from 'flowbite-react';
import { HiUser, HiArrowSmRight, HiDocumentText } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signOutUserSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    signOutUserStart, } from '../redux/user/userSlice';

export default function DashSidebar() {
  //const [userListings, setUserListings] = useState([]);
  const [showListingsError, setShowListingsError] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState('');
  const [userListings, setUserdocuments,setUserListings] = useState([]);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);


  const handleSignOut = async () => {
    
    try {
      dispatch(signOutUserStart())
      const res = await fetch('http://localhost:7003/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
        
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      //dispatch(deleteUserFailure(data.message));//moufid khdmet (tw nrj3lehaaaaa)
    }
  };

  const handleDeleteUser = async () => {
    try {
     
      dispatch(deleteUserStart());
      
      const res = await fetch(`http://localhost:7003/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
        //'credentials': 'include',
        //'Content-Type': 'application/json',
        
        //'Authorization': `Bearer ${token}`
        
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`http://localhost:7003/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };
    
  
  return (
    <div className='mx-69'>
    <Sidebar className='w-full md:w-56'>

      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
          <Link to='/profile'>
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser}
              labelColor='dark'
              as='div'
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Link to='/create-listing'>
          <Sidebar.Item
            icon={HiArrowSmRight}
            className='cursor-pointer'
            
          >
            Create a document

          </Sidebar.Item>
          </Link>
          <Link to='/ShowListings'>
          <Sidebar.Item
            icon={HiArrowSmRight}
            className='cursor-pointer'
            onClick={handleShowListings}
          >                                        
            Show my documents

          </Sidebar.Item>
          </Link>
          <Sidebar.Item
            icon={HiArrowSmRight}
            className='cursor-pointer'
            onClick={handleSignOut}
            
          >
            Sign Out
          </Sidebar.Item>
          <Sidebar.Item
            icon={HiArrowSmRight}
            className='cursor-pointer'
            onClick={handleDeleteUser}
          >
            Delete
          </Sidebar.Item>
          
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
    </div>
  );
}