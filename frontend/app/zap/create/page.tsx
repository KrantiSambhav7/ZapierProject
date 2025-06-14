"use client" 
import Appbar from '@/components/Appbar'
import LinkButton from '@/components/buttons/LinkButton';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import ZapCell from '@/components/ZapCell';
import React, { useState } from 'react'

const page = () => {
    const [selectedTrigger , setSelectedTrigger] = useState("");
    const [selectedAction , setSelectedAction] = useState<{
        availableActionId: string,
        availableActionName: string,
    }[]>([]);
  return (
    <div>
        <Appbar />
        <div className='w-full min-h-screen bg-red-200 flex pt-[-40px] flex-col justify-center'>
            <div className='flex justify-center w-full'>
            <ZapCell name={selectedTrigger ? selectedTrigger : "Trigger"} index={1}/>
            </div>
            <div className=' w-full pt-2 pb-2'>
                {selectedAction.map( (action , index)=> <div className='flex justify-center py-1'><ZapCell name={action.availableActionName ? action.availableActionName : "Action"} index={2 + index} /></div> )}
            </div>

            <div className='flex justify-center'>
            <div> 
            <PrimaryButton onClick={() => {
                setSelectedAction(prev => [...prev , {availableActionId: "" , availableActionName: ""}])
            }}>
                <div className='text-2xl'>+</div>
            </PrimaryButton>
            </div>
            </div>
        </div>
    </div>
  )
}

export default page