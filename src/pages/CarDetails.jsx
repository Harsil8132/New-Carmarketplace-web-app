import { getListingById } from '@/db/services/sevices'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@/customQuery'
import { useUser } from '@clerk/clerk-react'
import { Description, Features, FinanceCalculator, HeaderDetails, ImageGallery, MostSearchedCars, OwnerInfo, Pricing, Specification } from '@/components'


function CarDetails() {

  const {id} = useParams()
  const {user} = useUser()
  
  const navigate = useNavigate()

  const getListing = () => {
    return getListingById(id);
  }

  const {data:carDetails, loader, error} = useQuery(getListing)  
  
  if(loader){
    return (
      <div> Loading... </div>
    )
  }

  if(error){
    return (
      <div> Something Went Wrong... </div>
    )
  }

 
  return (
    <div>
      <div className='p-10 md:px-20'>
        {/* Header Details componenet */}
        <HeaderDetails carDetails={carDetails[0]} user={user} />

        <div className='grid grid-cols-1 md:grid-cols-3 mt-10 gap-20'>
          {/* left */}
          <div className='md:col-span-2'>
            {/* Image gallary */}
            <ImageGallery carDetails={carDetails[0]} />
            {/* Desciption */}
            <Description carDetails={carDetails[0]} />
            {/* Fatures List  */}
            <Features features={carDetails[0]?.features} />
            {/* Finance Calculator */}
            <FinanceCalculator />
          </div>

          {/* right */}
          <div>
            {/* Pricing */}
            <Pricing carDetails={carDetails[0]}/>
            {/* Car Specificatio */}
            <Specification carDetails={carDetails[0]} />

            {/* Owner Details */}
            <OwnerInfo carDetails={carDetails[0]} />
          </div>
        </div>
      </div>
      <MostSearchedCars />
    </div>
  )
}

export default CarDetails