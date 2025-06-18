"use client"
import Appbar from '@/components/Appbar'
import DarkButton from '@/components/buttons/DarkButton'
import React, { useEffect, useState } from 'react'
import { BACKEND_URL, HOOKS_URL } from '../config';
import axios from "axios";
import LinkButton from '@/components/buttons/LinkButton';
import { useRouter } from 'next/navigation';

interface Zap{
    id: string,
    triggerId: string,
    userId: number,
    actions: {
        id: string,
        zapId: string,
        actionId: string,
        sortingOrder: number,
        type: {
            id: string,
            name: string,
            image: string
        }
    }[],
    trigger: {
        id: string,
        zapId: string,
        triggerId: string,
        type: {
            id: string,
            name: string,
            image: string
        }
    }
}

function useZaps(){
    const [loading , setLoading] = useState(false);
    const [zaps , setZaps] = useState<Zap[]>([]);
    useEffect(() => {
        const func = async() => {
            const res = await axios.get(`${BACKEND_URL}/api/v1/zap`, {
                headers: {
                    "Authorization": localStorage.getItem("token") // Set the token in the header
                }
            });
            setZaps(res.data.zaps);
            setLoading(false);
        }
        func();
    } , [])
    return {loading , zaps};
}

const page = () => {
    const {loading , zaps} = useZaps();
    const router = useRouter();
  return (
    <div>
        <Appbar />
        <div className='flex justify-center'>
        <div className='pt-8 max-w-screen-lg  w-full'>
            <div className='flex justify-between'>
                <div className='text-2xl font-bold'>My Zaps</div>
                <DarkButton onClick={() => {
                    router.push("/zap/create")
                }}>Create </DarkButton></div>
        </div>
        </div>
        {loading ? "Loading" : <div className='flex justify-center w-full'><ZapTable zaps={zaps}/></div> }

    </div>
  )
}

function ZapTable({zaps} : {zaps: Zap[]}){
    const router = useRouter();

    return <div className='p-8 max-w-screen-lg w-full'>
    <div className='flex'>
        <div className='flex-1'></div>
        <div className='flex-1'>Name</div>
        <div className='flex-1'>ID</div>
        <div className='flex-1'>Created At</div>
        <div className='flex-1'>Webhook URL</div>
        <div className='flex-1'>Go</div>
    </div>
    <div>
        {zaps.map(item => <div key={item.id} className='flex py-4 border-b border-t'>
            <div className='flex-1 flex '><img src={item.trigger.type.image} className='h-[30px] w-[30px]' ></img> {item.actions.map(action => <img key={action.id} src={action.type.image} alt="" className='h-[30px] w-[30px]'/> )}</div>
            <div className='flex-1'>{item.id}</div>
            <div className='flex-1'>Nov 13, 2023</div>
            <div className='flex-1'>{`${HOOKS_URL}/hooks/catch/1${item.id}`}</div>
            <div className='flex-1'><LinkButton onClick={() => {
                router.push("/zap/" + item.id)
            }}>Go</LinkButton></div>
        </div>
        )}
    </div>
  </div>
}

export default page