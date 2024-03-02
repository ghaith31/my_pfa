import React from 'react';
import { useState } from 'react';
import { FileInput, Label } from 'flowbite-react';
import { AiOutlineLoading } from 'react-icons/ai';
import { Button } from 'flowbite-react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';








export default function CreateListing() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
    <br /><br /><br />
      <h1 className='px-2 py-1 bg-gradient-to-r from-red-800 via-red-600 via-red-400 to-red-100 rounded-lg text-white text-3xl font-semibold text-center my-7'>
      Create a document
      </h1>
      <br /><br />
      <form className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
          <input
            type='text'
            placeholder='Name'
            className='border p-3 rounded-lg'
            id='name'
            maxLength='62'
            minLength='10'
            required
          />
          <textarea
            type='text'
            placeholder='Description'
            className='border p-3 rounded-lg'
            id='description'
            required
          />
          
          <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input type='checkbox' id='first year' className='w-5' />
              <span>first year</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='second year' className='w-5' />
              <span>second year</span>
            </div>
            
            <div className='flex gap-2'>
              <input type='checkbox' id='web_development' className='w-5' />
              <span>web development</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='cyber_security' className='w-5' />
              <span>cyber security</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='AR_VR' className='w-5' />
              <span>AR/VR</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='machine_learning' className='w-5' />
              <span>machine learning</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='Low_level' className='w-5' />
              <span>Low level</span>
            </div>
            <div className='flex gap-2'>
              <input type='checkbox' id='others' className='w-5' />
              <span>others</span>
            </div>
          </div>
          
        </div>
        <div className="flex flex-col flex-1 gap-4">
          
          <div className="flex gap-4">
          <div>
      <div>
        <Label htmlFor="multiple-file-upload" value="Upload multiple files" />
      </div>
      <FileInput id="multiple-file-upload" multiple />
    </div>
    <br /><br /><br />
          <Button color="failure" pill>
            UPLOAD
      </Button>
          </div>
          
          <Button outline gradientDuoTone="greenToBlue">
          Create document
      </Button>
        </div>
      </form>
    </main>
  );
}