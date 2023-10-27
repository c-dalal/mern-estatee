import React from 'react'
import { Link } from 'react-router-dom'

const ListingItem = ({listing}) => {
  return (
    <div 
    className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg flex flex-col gap-4'>
    <Link to={`/listing/${listing._id}`}>
        <img
        src={listing.imageUrls[0]}
        alt='listing cover'
        className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
        />

        <div className='p-3'>
            <p className='text-lg truncate font-semibold text-slate-700'> {listing.name}</p>
            <div className=''>
                <MdLocationOn className='h-4 w-4 text-green-700'/>
                <p className='text-sm text-gray-600 truncate w-full'>{listing.address}</p>
            </div>
            <p className='text-sm text-gray-600 line-clamp-2'>{listing.description}</p>
            {
                listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')
            }
            <div className=''>
                <div className=''>
                    {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
                </div>
            </div>
        </div>
    </Link>
    </div>
  )
}

export default ListingItem
