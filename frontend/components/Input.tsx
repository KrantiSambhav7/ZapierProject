import React from 'react'

const Input = ({label , placeholder , onChange , type="text"} : {label : string , placeholder: string , onChange: (e: any) => void , type: "text" | "password"}) => {
  return (
    <div>
        <div className='p-2'>
        <label htmlFor="">{label}</label>
        </div>
        <input className='border-1 rounded-xl px-4 py-2 w-full' type={type} placeholder={placeholder} onChange={onChange}/>
    </div>
  )
}

export default Input