import React, { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
const Search = () => {
    const[sidebardata,setSidebardata] = useState({
        searchTerm: '',
        type: '',
        parking:false,
        furnished: false,
        offer : false,
        sort : 'created_at',
        order: 'desc',
    });
    const[loading,setLoading] = useState(false);
    const[listing,setListing] = useState([]);
    const[showMore,setShowMore] = useState(false);

useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');
    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
        setLoading(true);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data =await res.json();
        if(data.length > 8){
            setShowMore(true);
        }
        setListing(data);
        setLoading(false);
    }

    fetchListings();
},[location.search]);

    const handleChange = (e) => {
        if(e.target.value === 'all' || e.target.value === 'rent' || e.target.value === 'sale'){
            setSidebardata({...sidebardata,type: e.target.id})
        }

        if(e.target.id === 'searchTerm'){
            setSidebardata({...sidebardata,searchTerm: e.target.value});
        }

        if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
            setSidebardata({
                ...sidebardata, [e.target.id] : e.target.checked ||  e.target.checked == 'true' ? true : false
            })
        }

        if(e.target.id  === 'sort_order'){
            const sort = e.target.value.split('_')[0];
            const order = e.target.value.split('_')[1];
            setSidebardata({...sidebardata,sort,order});
        }


    }

const navigate = useNavigate();
const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm',sidebardata.searchTerm);
    urlParams.set('type',sidebardata.type);
    urlParams.set('parking',sidebardata.parking);
    urlParams.set('furnished',sidebardata.furnished);
    urlParams.set('order',sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
}

const onShowMoreClick = async () => {
    const numberOfListings  = listing.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex',startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if(data.length < 9){
        setShowMore(false);
    }
    setListing([...listing,...data]);
}
  return (
    <div className='flex flex-col md:flex-row'>
        {/* Left Side */}
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
            <div className='flex items-center gap-2'>
                <label className='whitespace-nowrap'>Search Term</label>
                <input 
                type='text' 
                id='searchTerm'
                placeholder='Search...'
                className='border rounded-lg p-3 w-full'
                value={sidebardata.searchTerm}
                onChange={handleChange}
                
                />
            </div>
            <div className='flex gap-2 flex-wrap items-center'>
                    <label className='font-semibold'>Type: </label>
                    <div className='flex gap-2'>
                        <input type="checkbox" name="" 
                        id="all" 
                        className='w-5'
                        checked={sidebardata.type === 'all'}
                        onChange={handleChange}
                        />
                        <span>Rent and Sale</span>
                    </div>

                    <div className='flex gap-2'>
                        <input type="checkbox" name="" id="rent" className='w-5'/>
                        <span>Rent</span>
                    </div>

                    <div className='flex gap-2'>
                        <input 
                        type="checkbox" 
                        name="" id="sale" 
                        className='w-5'
                        onChange={handleChange}
                        checked={sidebardata.type === 'sale'}
                        />
                        <span>Sale</span>
                    </div>

                    <div className='flex gap-2'>
                        <input 
                        type="checkbox" 
                        name="" 
                        id="offer" 
                        className='w-5'
                        onChange={handleChange}
                        checked={sidebardata.type === 'offer'}
                        />
                        <span>Offer</span>
                    </div>
            </div>


            <div className='flex gap-2 flex-wrap items-center'>
                    <label className='font-semibold'>Amenities: </label>
                    <div className='flex gap-2'>
                        <input 
                        type="checkbox" 
                        name="" 
                        id="parking" 
                        className='w-5'
                        onChange={handleChange}
                        checked={sidebardata.type === 'parking'}
                        />
                        <span>Parking</span>
                    </div>

                    <div className='flex gap-2'>
                        <input 
                        type="checkbox" 
                        name="" id="furnished" 
                        className='w-5'
                        onChange={handleChange}
                        checked={sidebardata.type === 'furnished'}
                        />
                        <span>Furnished</span>
                    </div>

                    <div className='flex items-center gap-2'>
                        <label>Sort: </label>
                        <select id='sort_order' className='border rounded-lg p-3'>
                            <option value='regularPrice_desc'>High to low</option>
                            <option value='regularPrice_asc' >Low to high</option>
                            <option value='createdAt_desc'>Latest</option>
                            <option value='createdAt_asc'>Oldest</option>
                        </select>
                    </div>
                    <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
                        Search
                    </button>
            </div>
        </form>
      </div>
      {/* Right side */}
      <div className='text-3xl font-semibold border-b p-3 text-slate-700 mt-7'>
        <h1>Listing Results:</h1>
        <div className='p-7 flex flex-wrap'>
            {
                !loading && listing.length === 0 && (
                    <p className='text-xl text-slate-700'>No Listing Found!</p>
                )
            }
            {
                loading && (
                    <p className='text-xl text-slate-700 text-center w-full'>Loading...</p>
                )
            }

            {
                !loading && 
                listing && 
                listing.map((listing) => {
                    <ListingItem 
                    key={listing._id} listing={listing}
                    />
                })
            }
            {
                showMore &&  (
                    <button onClick={
                        () => {
                            onShowMoreClick();
                        }}
                        className = 'text-green-700 hover:underline p-7'
                    >
                        'Show More
                    </button>
                )
            }
        </div>
      </div>
      
    </div>
  )
}

export default Search
