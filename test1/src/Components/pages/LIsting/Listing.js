import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { FaShare, } from 'react-icons/fa';
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { FaComputerMouse } from "react-icons/fa6";
import { SiInternetcomputer } from "react-icons/si";
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
//import 'swiper/swiper-bundle.min.css';




export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:7003/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);
  console.log(loading);

  return (
    <main className='min-h-screen'>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (
        <p className='text-center my-7 text-2xl'>Something went wrong!</p>
      )}
      {listing && !loading && !error && (
        <div>
          <img className='h-[550px]'
            src='data:image/png;base64,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' // Assurez-vous de remplacer {url} par l'URL de votre image
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
            }}>
          </img>


          <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-black cursor-pointer'>
            <FaShare
              className='text-slate-100'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-black text-slate-100 p-2'>
              Link copied!
            </p>
          )}
          <br /><br /><hr />
          <div className='flex flex-col max-w-4xl mx-20 p-3 my-7 gap-4'>

            <div className='flex gap-4'>
              <p className='bg-green-500 w-full max-w-[500px] text-white text-center p-2 rounded-md'>
                <b>{listing.name}</b>
              </p>
            </div>
            <br />
            <b> <p
              style={{ overflowWrap: "break-word" }}
              className='text-slate-800 '>
              <span className='font-semibold text-black'><mark>Description :</mark> </span><br /><br />
              {listing.description}
            </p></b>
            <hr />
            <ul className='text-blue-700 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>

              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaComputerMouse className='text-lg' />
                <span>first_year :</span>
                {listing.first_year ? 'YES' : 'No '}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>

                <FaComputerMouse className='text-lg' />
                <span>second_year :</span>
                {listing.second_year ? 'YES' : 'No '}
              </li>
              <br />

              <li className='flex items-center gap-1 whitespace-nowrap '>
                <HiOutlineDesktopComputer className='text-lg' />
                <span>machine_learning :</span>
                {listing.machine_learning ? 'YES' : 'No '}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <HiOutlineDesktopComputer className='text-lg' />
                <span>Low_level :</span>
                {listing.Low_level ? 'YES' : 'No '}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <HiOutlineDesktopComputer className='text-lg' />
                <span>web_development :</span>
                {listing.web_development ? 'YES' : 'No '}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <HiOutlineDesktopComputer className='text-lg' />
                <span>AR_VR :</span>
                {listing.AR_VR ? 'YES' : 'No '}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <HiOutlineDesktopComputer className='text-lg' />
                <span>cyber_security :</span>
                {listing.cyber_security ? 'YES' : 'No '}
              </li>
              <br />
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <SiInternetcomputer className='text-lg' />
                <span>others :</span>
                {listing.others ? 'YES' : 'No '}
              </li>
            </ul>
            <div className='mx-px'>

              {listing && listing.pdfUrls.map((url) => (
                <SwiperSlide key={url}>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <b><mark>Download the document</mark></b>
                  </a>

                </SwiperSlide>
              ))}

            </div>

          </div>

        </div>


      )}
      <br /><br /><br /><hr />
      <Swiper navigation>
        {listing && listing.pdfUrls.map((url) => (
          <SwiperSlide key={url}>
            <div
              className='h-[600px]'
              style={{
                background: `url(${url}) center no-repeat`,
                backgroundSize: 'cover',

              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </main>

  );
}
