import { Checkbox, Label, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ListingItem from '../ListingItem';

export default function Search() {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    AR_VR: false,
    machine_learning: false,
    Low_level: false,
    cyber_security: false,
    second_year: false,
    first_year: false,
    web_development: false,
    others: false,
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);

  const { search: locationSearch } = location;
  const urlParams = new URLSearchParams(locationSearch);

  useEffect(() => {
    const searchTermFromUrl = urlParams.get('searchTerm');
    const AR_VRFromUrl = urlParams.get('AR_VR');
    const machine_learningFromUrl = urlParams.get('machine_learning');
    const Low_levelFromUrl = urlParams.get('Low_level');
    const cyber_securityFromUrl = urlParams.get('cyber_security');
    const second_yearFromUrl = urlParams.get('second_year');
    const first_yearFromUrl = urlParams.get('first_year');
    const web_developmentFromUrl = urlParams.get('web_development');
    const othersFromUrl = urlParams.get('others');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      AR_VRFromUrl ||
      machine_learningFromUrl ||
      Low_levelFromUrl ||
      cyber_securityFromUrl ||
      second_yearFromUrl ||
      first_yearFromUrl ||
      web_developmentFromUrl ||
      othersFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        AR_VR: AR_VRFromUrl === 'true',
        machine_learning: machine_learningFromUrl === 'true',
        Low_level: Low_levelFromUrl === 'true',
        cyber_security: cyber_securityFromUrl === 'true',
        second_year: second_yearFromUrl === 'true',
        first_year: first_yearFromUrl === 'true',
        web_development: web_developmentFromUrl === 'true',
        others: othersFromUrl === 'true',
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:7003/api/listing/get?${locationSearch}`);
        const data = await res.json();
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [locationSearch]);

  const handleChange = (e) => {
    const { id, value, checked } = e.target;
    if (id === 'AR_VR' ||
      id === 'machine_learning' ||
      id === 'Low_level' ||
      id === 'cyber_security' ||
      id === 'second_year' ||
      id === 'first_year' ||
      id === 'web_development' ||
      id === 'others') {
      setSidebardata({
        ...sidebardata,
        [id]: checked,
      });
    }

    if (id === 'sort_order') {
      const [sort, order] = value.split('_');
      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('AR_VR', sidebardata.AR_VR);
    urlParams.set('machine_learning', sidebardata.machine_learning);
    urlParams.set('Low_level', sidebardata.Low_level);
    urlParams.set('cyber_security', sidebardata.cyber_security);
    urlParams.set('second_year', sidebardata.second_year);
    urlParams.set('first_year', sidebardata.first_year);
    urlParams.set('web_development', sidebardata.web_development);
    urlParams.set('others', sidebardata.others);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };


  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-4  border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
          <div className='flex items-center gap-4'>
            <label className='whitespace-nowrap font-semibold'><br />Search Term:</label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='border rounded-lg p-2 w-full'
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <br /><hr />
          <div>
            <div className='flex gap-2 items-center'>
              <Checkbox
                onChange={handleChange}
                checked={sidebardata.first_year}
                id="first_year" />
              <Label id='first_year' onChange={handleChange}
                checked={sidebardata.first_year} >
                <span>first_year</span>
              </Label>
            </div>
            <div className='flex gap-2 items-center'>
              <Checkbox id="second_year" onChange={handleChange}
                checked={sidebardata.second_year} />
              <Label id='second_year' onChange={handleChange}
                checked={sidebardata.second_year} >
                <span>second_year</span>
              </Label>
            </div>
            <div className='flex gap-2 items-center'>
              <Checkbox id="AR_VR" onChange={handleChange}
                checked={sidebardata.AR_VR} />
              <Label id='AR_VR' onChange={handleChange}
                checked={sidebardata.AR_VR}>
                <span>AR_VR</span>
              </Label>
            </div>
            <div className='flex gap-2 items-center'>
              <Checkbox id="machine_learning" onChange={handleChange}
                checked={sidebardata.machine_learning} />
              <Label id='machine_learning' onChange={handleChange}
                checked={sidebardata.machine_learning}>
                <span>machine_learning</span>
              </Label>
            </div>
            <div className='flex gap-2 items-center'  >
              <Checkbox id="others" onChange={handleChange}
                checked={sidebardata.others} />
              <Label id='others' onChange={handleChange}
                checked={sidebardata.others}>
                <span>others</span>
              </Label>
            </div>
            <div className='flex gap-2 items-center' >
              <Checkbox id="Low_level" onChange={handleChange}
                checked={sidebardata.Low_level} />
              <Label id='Low_level' onChange={handleChange}
                checked={sidebardata.Low_level} >
                <span>Low_level</span>
              </Label>
            </div>
            <div className='flex gap-2 items-center ' >
              <Checkbox id="cyber_security" onChange={handleChange}
                checked={sidebardata.cyber_security} />
              <Label id='cyber_security' onChange={handleChange}
                checked={sidebardata.cyber_security}>
                <span>cyber_security</span>
              </Label>
            </div>
            <div className='flex gap-2 items-center'>
              <Checkbox id="web_development" onChange={handleChange}
                checked={sidebardata.web_development} />
              <Label id='web_development' onChange={handleChange}
                checked={sidebardata.web_development}>
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
      <div >
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && listings.length === 0 && (
            <p className='text-xl text-slate-700'>No listing found!</p>
          )}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>
              Loading...
            </p>
          )}

          {!loading &&
            Array.isArray(listings) &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
        </div>
      </div>
    </div>
  );
}
