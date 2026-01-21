import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineSpeed } from "react-icons/md";
import { FaGasPump } from "react-icons/fa6";
import { GiGearStickPattern } from "react-icons/gi";
import { TbCar4Wd } from "react-icons/tb";
import {
    
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button';
import { LuClipboardPen } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteListing } from '@/db/services/sevices';

function HeaderDetails({carDetails , user}) {

    const navigate = useNavigate()
    
  return (
    <div>
        {carDetails?.title ? 
        <div>
            <div className='flex justify-between'>
                <div>
                        <h2 className='font-bold text-3xl'>{carDetails?.title}</h2>
                        <p className='text-sm'>{carDetails?.tagline}</p>
                </div>
                {carDetails?.createdBy === user?.primaryEmailAddress.emailAddress && 
                <div className='grid gap-1 sm:flex sm:justify-between sm:gap-4 '>
                    <Link to={`/add-listing?mode=edit&id=${carDetails?.id}`}>
                        <Button variant="outline" className="flex gap-2 text-lg bg-blue-100 hover:text-primary">Edit <LuClipboardPen className='text-lg' /></Button>
                    </Link>
                    <AlertDialog>
                        <AlertDialogTrigger  className="border bg-red-700 text-white h-9 flex items-center justify-center gap-2 px-2 rounded-lg hover:bg-white hover:text-red-700 hover:border hover:border-red-700" >Delete <RiDeleteBin6Line className='text-lg' /></AlertDialogTrigger>
                        <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure you want to delete listing?</AlertDialogTitle>
                            <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your listing
                            and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => {deleteListing(carDetails); navigate('/profile')}} className="border bg-red-700 hover:bg-white hover:text-red-700 hover:border hover:border-red-700">Continue</AlertDialogAction>
                        </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog> 
                </div>}
            </div>

            <div className='grid grid-cols-2 gap-2 sm:flex sm:gap-2 mt-3'>
                <div className='flex gap-2 items-center bg-blue-50 rounded-full p-2 px-4'>
                    <MdOutlineSpeed className='h-5 w-5 text-primary' />
                    <h2 className='text-primary text-sm'>{carDetails?.mileage}</h2>
                </div>
                <div className='flex gap-2 items-center bg-blue-50 rounded-full p-2 px-4'>
                    <FaGasPump  className='h-5 w-5 text-primary' />
                    <h2 className='text-primary text-sm'>{carDetails?.fuelType}</h2>
                </div>
                <div className='flex gap-2 items-center bg-blue-50 rounded-full p-2 px-4'>
                    <GiGearStickPattern  className='h-5 w-5 text-primary' />
                    <h2 className='text-primary text-sm'>{carDetails?.transmission}</h2>
                </div>
                <div className='flex gap-2 items-center bg-blue-50 rounded-full p-2 px-4'>
                    <TbCar4Wd className='h-5 w-5 text-primary' />
                    <h2 className='text-primary text-sm'>{carDetails?.driveType}</h2>
                </div>
            </div>
        </div> 
        : <div className='w-full rounded-xl h-[100px] bg-slate-200 animate-pulse'>
        
        </div>}
    </div>
  )
}

export default HeaderDetails