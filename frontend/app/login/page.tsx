"use client"
import Appbar from '@/components/Appbar'
import PrimaryButton from '@/components/buttons/PrimaryButton'
import Feature from '@/components/Feature'
import Input from '@/components/Input'
import React, { useState } from 'react'
import { BACKEND_URL } from '../config'
import { useRouter } from 'next/navigation'
import axios from "axios"

const page = () => {
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const router = useRouter();

  return (
    <div className='h-screen'>
            <Appbar />
    <div className='grid grid-cols-8 mt-40'>
        <div className='col-start-2 col-span-2 '>
            <div className='font-bold text-3xl pb-10'>Join millions worldwide who automate their work using Zapier</div>
            <div className='flex '>
            <Feature title='Easy setup,' subtitle='no coding required' />
            </div>
            <div className='flex '>
            <Feature title='Free forever,' subtitle='for core features' />
            </div>
            <div className='flex '>
            <Feature title='One Week' subtitle='of free trail of apps' />
            </div>
        </div>
        <div className='col-start-6'>
            <div className='w-[20rem]'> 
                <Input type='text' placeholder='Your email' label='Email' onChange={(e) => {
                  setEmail(e.target.value)
                }}/>
                <Input type='password' placeholder='Your password' label='Password' onChange={(e) => {
                  setPassword(e.target.value)
                }}/>
                <div className='pt-4'>
                <PrimaryButton size='big' children={"Login"} onClick={async () => {
                   const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin` , {
                    username: email,
                    password: password,
                   });
                   localStorage.setItem("token" , res.data.token ) // First we need to set the token to in the local storage before moving 
                   router.push("/dashboard")}} /> 
                </div>
            </div>

    </div> 
    </div>

    </div>

  )
}

export default page