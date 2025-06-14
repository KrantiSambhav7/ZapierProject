"use client"
import React from 'react'
import PrimaryButton from './buttons/PrimaryButton'
import SecondaryButton from './buttons/SecondaryButton'
import Feature from './Feature'
import { useRouter } from 'next/navigation'

const Hero = () => {
    const router = useRouter();
  return (
    <div>
        <div className='flex justify-center'>
        <div className='text-6xl font-semibold text-center pt-6 max-w-lg'>
            Automate as fast as you can type 
        </div>
        </div>
        <div className='flex justify-center'>
        <div className='text-xl font-normal text-center pt-6 max-w-3xl'>
            AI gives you automation power, and Zapier puts them to work. Pairing AI and Zapier helps you turn ideas into workflows and bots that work for you.
        </div>
        </div>
        <div className='flex justify-center pt-10 gap-20'> 
            <PrimaryButton onClick={() => {
                router.push("/signup")
            }} size='big'>Get Started Free</PrimaryButton>
            <SecondaryButton onClick={() => {}} size='big'>Contact Sales</SecondaryButton>
        </div>
        <div className='flex gap-10 justify-center pt-8'>
            <Feature title='Free forever' subtitle='for core features'/>
            <Feature title='More apps' subtitle='than any other platform'/>
            <Feature title='Cutting edge' subtitle='AI features'/>
        </div>
    </div>
  )
}

export default Hero