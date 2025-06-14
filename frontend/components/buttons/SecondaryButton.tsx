"use client"
import React from 'react'

const SecondaryButton = ({children , onClick, size="small"}: {children: React.ReactNode , onClick: () => void , size?: "big" | "small"}) => {
  return (
    <div onClick={onClick} className={`flex flex-col justify-center ${size === "small" ? "text-sm" : "text-xl"} ${size === "small" ? "px-8 py-1" : "px-14 py-2"} border-2 rounded-full cursor-pointer font-md`}>
        {children}
    </div>
  )
}

export default SecondaryButton
