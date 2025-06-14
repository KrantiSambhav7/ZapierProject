"use client"
import React from 'react'
import LinkButton from './buttons/LinkButton'
import { useRouter } from 'next/navigation'
import PrimaryButton from './buttons/PrimaryButton';

const Appbar = () => {
    const router = useRouter();
  return (
    <div className='flex border-b justify-between p-2'>
        <div className='flex flex-col justify-center text-3xl font-bold pl-2'>
            Zapier
        </div>
        <div className='flex gap-10'>
            <LinkButton children={"Contact Sales"} onClick={() => {}} />
            <LinkButton children={"Login"} onClick={() => {
                router.push("/login")
            }} />
            <PrimaryButton size='small' onClick={() => {
                router.push("/signup")
            }}>Signup</PrimaryButton>
        </div>
    </div>
  )
}

export default Appbar