"use client"
import React from 'react'

const LinkButton = ({children , onClick} : {children: React.ReactNode , onClick: () => void}) => {
  return (
    <div className='flex justify-center items-center px-2 py-1 cursor-pointer hover:bg-slate-300 transition font-normal' onClick={onClick}>
        {children}
    </div>
  )
}

export default LinkButton