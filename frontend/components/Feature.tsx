import React from 'react'
import { TiTick } from "react-icons/ti";
const Feature = ({title , subtitle} : {title: string , subtitle: string}) => {
  return (
    <div className='flex gap-2 items-center  justify-center px-2 rounded-full'>   
        <TiTick />
        <div className='font-semibold'>
        {title}
        </div>
        <div className='font-light'>
        {subtitle}
        </div>
    </div>
  )
}

export default Feature