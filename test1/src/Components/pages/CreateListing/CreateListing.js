import { useState } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../../firebase';
import Dashboard from '../../DashSidebar';

import { Button, FileInput } from 'flowbite-react';
import { HiOutlineArrowRight} from 'react-icons/hi';
import { HiInformationCircle } from 'react-icons/hi';
import { Alert } from 'flowbite-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]); 
  const [formData, setFormData] = useState({
    pdfUrls: [], 
    imageUrls: [], 
    name: '',
    description: '',
    first_year: false,
    second_year: false,
    others: false,
    web_development: false,
    cyber_security: false,
    Low_level: false,
    machine_learning: false,
    AR_VR: false,
  });
  const [uploadError, setUploadError] = useState(false); 
  const [uploading, setUploading] = useState(false); 
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleFileSubmit = (e) => { 
    if (files.length > 0 && files.length + formData.pdfUrls.length < 7) {
      setUploading(true);
      setUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeFile(files[i])); 
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            pdfUrls: formData.pdfUrls.concat(urls), 
          });
          setUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setUploadError('Upload failed'); 
          setUploading(false);
        });
    } else {
      setUploadError('You can only upload up to 6 files'); 
      setUploading(false);
    }
  };

  const storeFile = async (file) => { 
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'holberton', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveFile = (index) => { 
    setFormData({
      ...formData,
      pdfUrls: formData.pdfUrls.filter((_, i) => i !== index),
    });
  };
  const handleChange = (e) => {
    
    

    if (
      e.target.id === 'others' ||
      e.target.id === 'web_development' ||
      e.target.id === 'first_year' ||
      e.target.id === 'second_year' ||
      e.target.id === 'cyber_security' ||
      e.target.id === 'AR_VR' ||
      e.target.id === 'machine_learning' ||
      e.target.id === 'Low_level'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
      
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.imageUrls || formData.pdfUrls.length < 1)
      return setError('You must upload at least one file');
      setLoading(true);
      setError(false);

      const res = await fetch('http://localhost:7003/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <>
    <div className="flex">
    <div>
      <Dashboard className="w-1/6" />
    </div>
    <main className='p-3 max-w-4xl mx-auto'>
      <br /><br /><br />
      <h1 className='px-2 py-1 bg-gradient-to-r from-red-800 via-red-600 via-red-400 to-red-100 rounded-lg text-white text-3xl font-semibold text-center my-7'>
        Create a document
      </h1>
      <br /><br />
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
          <div className='flex flex-col gap-4 flex-1'>
            <input
              type='text'
              placeholder='Name'
              className='border p-3 rounded-lg'
              id='name'
              maxLength='62'
              minLength='2'
              required
              onChange={handleChange}
              value={formData.name} />
            <textarea
              type='text'
              placeholder='Description'
              className='border p-3 rounded-lg'
              id='description'
              required
              onChange={handleChange}
              value={formData.description} />
            <div className='flex gap-6 flex-wrap'>
              <div className='flex gap-2'>
                <input type='checkbox' id='first_year' className='w-5'
                  onChange={handleChange}
                  checked={formData.first_year} />
                <span>first year</span>
              </div>
              <div className='flex gap-2'>
                <input
                  type='checkbox'
                  id='second_year'
                  className='w-5'
                  onChange={handleChange}
                  checked={formData.second_year} />
                <span>second year</span>
              </div>

            </div>
            <div className='flex flex-wrap gap-6'>
              <div className='flex gap-2'>
                <input type='checkbox' id='web_development' className='w-5'
                  onChange={handleChange}
                  checked={formData.web_development} />
                <span>web development</span>
              </div>
              <div className='flex gap-2'>
                <input type='checkbox' id='cyber_security' className='w-5'
                  onChange={handleChange}
                  checked={formData.cyber_security} />
                <span>cyber security</span>
              </div>
              <div className='flex gap-2'>
                <input type='checkbox' id='AR_VR' className='w-5'
                  onChange={handleChange}
                  checked={formData.AR_VR} />
                <span>AR/VR</span>
              </div>
              <div className='flex gap-2'>
                <input type='checkbox' id='machine_learning' className='w-5'
                  onChange={handleChange}
                  checked={formData.machine_learning} />
                <span>machine learning</span>
              </div>
              <div className='flex gap-2'>
                <input type='checkbox' id='Low_level' className='w-5'
                  onChange={handleChange}
                  checked={formData.Low_level} />
                <span>Low level</span>
              </div>
              <div className='flex gap-2'>
                <input type='checkbox' id='others' className='w-5'
                  onChange={handleChange}
                  checked={formData.others} />
                <span>others</span>
              </div>
            </div>
          </div>

          <div className='flex flex-col flex-1 gap-4'>
            <Alert color="success" icon={HiInformationCircle}>
              <span className="font-medium">Info:</span><br />-You can only upload up to 6 files<br />
              -10go max for file upload
            </Alert>
            <div className='flex gap-4'>
              <FileInput
                onChange={(e) => setFiles(e.target.files)}
                className='p-3  border-gray-300 rounded w-full'
                type='file'
                id='files'
                accept='image/*, .pdf'
                multiple />
              <Button
                color="success" pill
                type='button'
                disabled={uploading}
                onClick={handleFileSubmit}

              >
                {uploading ? 'Uploading...' : 'Upload'}
              </Button>
            </div>

            <p className='text-red-700 text-sm'>
              {setUploadError && setUploadError}
            </p>
            {formData.pdfUrls.length > 0 &&
              formData.pdfUrls.map((url, index) => (
                <div key={index} className='flex justify-between p-1  items-center'>
                  <span>{`File ${index + 1}`}</span>
                  <Button
                    type='button'
                    onClick={() => handleRemoveFile(index)}
                    color="failure" pill>
                    Delete
                  </Button>
                </div>
              ))}

            <button
              disabled={loading || uploading}
              className='p-5 bg-blue-700 text-white rounded-lg rounded-9 uppercase hover:opacity-95 disabled:opacity-80 italic'


            >

              {loading ? 'Creating...' : 'Create document'}

            </button>
            {error && <p className='text-red-700 text-sm'>{error}</p>}
          </div>
        </form>
      </main></div></>
  );
}