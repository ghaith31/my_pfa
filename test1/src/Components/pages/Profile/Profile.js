import {useSelector} from 'react-redux'
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from '/home/ghaith/Bureau/my_pfa/test1/src/redux/user/userSlice.js';
import { useDispatch } from 'react-redux';
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { HiOutlineArrowRight, HiShoppingCart } from 'react-icons/hi';
import Dashboard from '../../DashSidebar';
import React from 'react';


export default function Profile() {
  
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();
  
  //const Token = document.cookie.split('; ').find(row => row.startsWith('access_token')).split('=')[1];
  

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
      
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'holberton_upload',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };





  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
console.log("1");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
     
      dispatch(deleteUserStart());
      
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
        //'credentials': 'include',
        'Content-Type': 'application/json',
        
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
    <React.Fragment>
  <div>
    <Dashboard />
  
    <div className='max-w-lg mx-auto p-3 w-full'>
  
    <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input
        onChange={(e) => setFile(e.target.files[0])}
        type='file'
        ref={fileRef}
        hidden
        accept='image/*'
      />
      <img
        onClick={() => fileRef.current.click()}
        src={formData.avatar || currentUser.avatar}
        alt='profile'
        className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
      />
      <p className='text-sm self-center'>
        {fileUploadError ? (
          <span className='text-red-700'>
            Error Image upload (image must be less than 2 mb)
          </span>
        ) : filePerc > 0 && filePerc < 100 ? (
          <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
        ) : filePerc === 100 ? (
          <span className='text-green-700'>Image successfully uploaded!</span>
        ) : (
          ''
        )}
      </p>
      <input
        type='text'
        placeholder='username'
        defaultValue={currentUser.username}
        id='username'
        className='border p-3 rounded-lg'
        onChange={handleChange}
      />
      <input
        type='email'
        placeholder='email'
        id='email'
        defaultValue={currentUser.email}
        className='border p-3 rounded-lg'
        onChange={handleChange}
      />
      <input
        type='password'
        placeholder='password'
        onChange={handleChange}
        id='password'
        className='border p-3 rounded-lg'
      />
       <button
          disabled={loading}
          className='p-3 bg-green-700 text-white rounded-lg rounded-9 uppercase hover:opacity-95 disabled:opacity-80 italic'
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
      <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>
    </form>
  </div>
  </div>
</React.Fragment>

    
  );
}