"use client"
import React from 'react'

const DarkButton = ({children , onClick, size="small"}: {children: React.ReactNode , onClick: () => void , size?: "big" | "small"}) => {
  return (
    <div onClick={onClick} className={`flex flex-col text-white items-center justify-center px-8 py-1 bg-purple-950 rounded mr-8 cursor-pointer font-md`}>
        {children}
    </div>
  )
}

export default DarkButton
