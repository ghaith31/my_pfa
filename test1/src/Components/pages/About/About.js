import React from 'react';
import { Accordion } from 'flowbite-react';

export default function About() {
  return (
    <div>
      <div className='py-20 px-4 max-w-6xl mx-auto'>
      <h4 className='px-2 py-1 bg-gradient-to-r from-red-900 via-red-700 via-red-400 to-red-100 rounded-lg text-white'> holberton library</h4>
        <Accordion collapseAll>
          <Accordion.Panel>
            <Accordion.Title>
              <h1 className='text-3xl font-bold mb-4 text-slate-800'>About holberton libery</h1>
            </Accordion.Title>
            <Accordion.Content>
              <p className='mb-4 text-slate-700'>
                Welcome to <mark>Holberton libery</mark>, your go-to online destination for a curated collection of computer science and programming books. Explore our extensive library designed to fuel your passion for technology and coding.
              </p>
              <p className='mb-4 text-slate-700'>
                Why Choose <mark>Holberton libery?</mark>
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>
              <h2 className='text-2xl font-bold mb-2'>Holberton Student Approved:</h2>
            </Accordion.Title>
            <Accordion.Content>
              <p className='mb-4 text-slate-700'>
                As a student at Holberton, you can trust our library to complement your Holberton education with additional resources that align with your coursework and help you excel in your studies.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>
              <h2 className='text-2xl font-bold mb-2'>Exemplary Selection:</h2>
            </Accordion.Title>
            <Accordion.Content>
              <p className='mb-4 text-slate-700'>
                Dive into our rich virtual library featuring high-quality books covering diverse topics from web development to cybersecurity, data science, and more.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>
              <h2 className='text-2xl font-bold mb-2'>Books for All Levels:</h2>
            </Accordion.Title>
            <Accordion.Content>
              <p className='mb-4 text-slate-700'>
                Whether you're a beginner, intermediate, or expert, our library offers books tailored to every experience level. Choose from a variety of titles to match your expertise and specific interests.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
          <Accordion.Panel>
            <Accordion.Title>
              <h2 className='text-2xl font-bold mb-2'>Multi-format Options:</h2>
            </Accordion.Title>
            <Accordion.Content>
              <p className='mb-4 text-slate-700'>
                Whether you prefer eBooks, audiobooks, or traditional print, we provide multi-format options to suit your personal preferences.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      </div>

      

      <div className='py-20 px-4 max-w-6xl mx-auto'>
      <h1 className='px-2 py-1 bg-gradient-to-r from-blue-900 via-blue-700 via-blue-400 to-blue-100 rounded-lg text-white'> holberton Search engine</h1>
        <Accordion collapseAll>
          <Accordion.Panel>
            <Accordion.Title>
              <h1 className='text-3xl font-bold mb-4 text-slate-800'>about Holberton Search engine</h1>
            </Accordion.Title>
            <Accordion.Content>
              <p className='mb-4 text-slate-700'>
                Welcome to <mark>Holberton Search engine </mark>This is a demo project
              </p>
              
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      </div>
    </div>
  );
}
