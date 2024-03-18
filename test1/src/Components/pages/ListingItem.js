import { Link } from 'react-router-dom';
import { FiCornerDownRight } from "react-icons/fi";

export default function ListingItem({ listing }) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuR5nQ2AeNyFZsoAplQQPRZ7AWff2y0a5_dQ&usqp=CAU'
          }
          alt='document cover'
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {listing.name}
          </p>
          <div className='flex items-center gap-1'>
          <FiCornerDownRight className='h-4 w-4 text-green-700' />
          </div>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {listing.description}
          </p>
          
        </div>
      </Link>
    </div>
  );
}
//G1tHUb!sS3cur3W1thTh1sP@ssw0rd!