import React from 'react'

const ZapCell = ({name , index, onClick} : {name?: string , index: number, onClick: () => void}) => {
  return (
    <div className='border border-black py-8 pl-8 flex w-[300px] justify-center cursor-pointer ' onClick={onClick}>
        <div className='flex text-xl'>
        <div className='font-bold'>
            {index}. 
        </div>
        <div>
            {name}
        </div>
        </div>
    </div>
  )
}

export default ZapCell