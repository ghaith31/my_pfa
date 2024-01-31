import React from 'react'
import imag1 from './imag1.jpg';

export default function About() {
  return (
    
    <div className='py-20 px-4 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4 text-slate-800'>About holberton libery</h1>
      <p className='mb-4 text-slate-700'>Welcome to <mark>Holberton libery</mark>, your go-to online destination for a curated collection of computer science and programming books.
       Explore our extensive library designed to fuel your passion for technology and coding.</p>
      <p className='mb-4 text-slate-700'>
      Why Choose <mark>Holberton libery?</mark>
      </p>
    
      <div>
      <img src={imag1} style={{ maxWidth: '100%' }} />
    </div>
    
  <br/><hr/>

      <p className='mb-4 text-slate-700'>

<b>Holberton Student Approved:</b> <br/>
    As a student at Holberton, you can trust our library to complement your Holberton education with additional resources that align with your coursework and help you excel in your studies.

<br/><br/><b>Exemplary Selection: </b> <br/>Dive into our rich virtual library featuring high-quality books covering diverse topics from web development to cybersecurity, data science, and more.

<br/><br/><b>Books for All Levels:</b> <br/> Whether you're a beginner, intermediate, or expert, our library offers books tailored to every experience level. Choose from a variety of titles to match your expertise and specific interests.

<br/><br/><b>Multi-format Options:</b> <br/> Whether you prefer eBooks, audiobooks, or traditional print, we provide multi-format options to suit your personal preferences.

At Holbertonlibery, we believe in providing access to quality computer science education through exceptional resources. Explore our online library today and bring your coding aspirations to life with our inspiring books.

      </p>
      </div>
  )
}

