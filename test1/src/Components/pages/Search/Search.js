import React from 'react';
import { Checkbox, Label, Button } from 'flowbite-react';


export default function Search() {
  return (
    <div className='flex flex-col md:flex-row'>
    <div className='p-4  border-b-2 md:border-r-2 md:min-h-screen'>
      <form className='flex flex-col gap-3'>
        <div className='flex items-center gap-4'>
            <label className='whitespace-nowrap font-semibold'><br />Search Term:</label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='border rounded-lg p-2 w-full'
            />
          </div>
          <br /><hr />
          <div >
          <div className='flex gap-2 items-center'>
            <Checkbox id="first_year" />
              <Label id='first_year' >  
              <span>first_year</span>
              </Label>
            </div>
             <div className='flex gap-2 items-center'>
            <Checkbox id="second_year" />
              <Label id='second_year' >  
              <span>second_year</span>
              </Label>
            </div>
            <div className='flex gap-2 items-center'>
            <Checkbox id="AR_VR" />
              <Label id='AR_VR' >  
              <span>AR_VR</span>
              </Label>
            </div>
            <div className='flex gap-2 items-center'>
            <Checkbox id="machine_learning" />
              <Label id='machine_learning' >  
              <span>machine_learning</span>
              </Label>
            </div> 
            <div className='flex gap-2 items-center'  >
            <Checkbox id="others" />
              <Label id='others' >  
              <span>others</span>
              </Label>
            </div> 
            <div className='flex gap-2 items-center' >
            <Checkbox id="Low_level" />
              <Label id='Low_level' >  
              <span>Low_level</span>
              </Label>
            </div>
             <div className='flex gap-2 items-center ' >
            <Checkbox id="cyber_security" />
              <Label id='cyber_security' >  
              <span>cyber_security</span>
              </Label>
            </div> 
            <div className='flex gap-2 items-center'>
            <Checkbox id="web_development" />
              <Label id='web_development' >  
              <span>web_development</span>
              </Label>
            </div> 
          
          </div>
          <br />
          <Button outline gradientDuoTone="purpleToBlue">
            <b>Search</b>
          </Button>
        </form>


        
      </div>
      <div className=''>
        /////////
      </div>
    </div>
  );
}