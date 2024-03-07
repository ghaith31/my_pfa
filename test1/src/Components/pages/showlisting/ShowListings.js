import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Dashboard from '../../DashSidebar';
import { Button } from 'flowbite-react';


function ShowListings() {
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    
    const fetchUserListings = async () => {
      try {
        setShowListingsError(false);
        const res = await fetch(`http://localhost:7003/api/user/listings/${currentUser._id}`);
        const data = await res.json();
        if (!res.ok) {
          setShowListingsError(true);
          return;
        }
        setUserListings(data);
      } catch (error) {
        setShowListingsError(true);
      }
    };

    fetchUserListings(); 
  }, [currentUser._id]); 

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`http://localhost:7003/api/user/listings/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="flex">
        <div className="w-1/6">
          <Dashboard />
        </div>
        <div className="w-3/4">
          <p className='text-red-700 mt-5'>
            {showListingsError ? 'Error showing document' : ''}
          </p>
          {userListings && userListings.length > 0 && (
            <div className='w-full'>
              <div className='flex flex-col gap-9'>
                <h1 className=' mt-7 px-2 py-1 bg-gradient-to-r from-red-800 via-red-600  to-red-100 rounded-lg text-white text-3xl font-semibold text-center my-7'>
                 <b> Your documents</b>
                </h1>
                <hr />
                {userListings.map((listing) => (
                  <div
                    key={listing._id}
                    className='border-4 rounded p-9 flex justify-between items-center gap-9'
                  >
                    <Link to={`/listing/${listing._id}`}>
                      <img
                        src="https://mentalhealthcommission.ca/wp-content/uploads/2020/07/document-icon-2.png"
                        alt='document cover'
                        className='h-16 w-16 object-contain' />
                    </Link>
                    <Link
                      className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                      to={`/listing/${listing._id}`}
                    >
                      <p>{listing.name}</p>
                    </Link>
                    <div className='flex flex-col item-center'>
                    <Link to={`/update-listing/${listing._id}`}>
                      <Button color="success" pill>Edit my document</Button>
                      </Link>
                      <hr /><hr />
                      <Button color="failure" pill
                        onClick={() => handleListingDelete(listing._id)}
                        
                      >
                        Delete
                      </Button>
                      
                     
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ShowListings;
