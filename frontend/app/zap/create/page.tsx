"use client";
import { BACKEND_URL } from '@/app/config';
import Appbar from '@/components/Appbar';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import ZapCell from '@/components/ZapCell';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function useAvailableActionsAndTriggers(){
  const [availableActions, setAvailableActions] = useState([]);
  const [availableTriggers, setAvailableTriggers] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/trigger/available`).then((res) =>{
      setAvailableTriggers(res.data.availableTriggers);
    })

    axios.get(`${BACKEND_URL}/api/v1/action/available`).then((res) =>{
      setAvailableActions(res.data.availableActions);
    })

  }, []);

  return {
    availableActions,
    availableTriggers
  };
}

const Page = () => {
  const { availableActions, availableTriggers } = useAvailableActionsAndTriggers();
  const [selectedTrigger, setSelectedTrigger] = useState<{
    index: number;
    name: string
  }>({
    index: 1,
    name: ""
  });
  const [selectedAction, setSelectedAction] = useState<{
    index: number;
    availableActionId: string;
    availableActionName: string;
  }[]>([]);
  const [selectedModelIndex, setSelectedModelIndex] = useState<number | null>(null);
  const router = useRouter();

  return (
    <div>
      <Appbar />
      <div className='flex justify-end bg-red-200 p-4'>
        <PrimaryButton onClick={async () =>{
          const res = await axios.post(`${BACKEND_URL}/api/v1/zap/`,{
            "availableTriggerId": selectedTrigger.index,
            "triggerMetadata": {},
            "actions": selectedAction.map(action => {
              return {
                "availableActionId": action.availableActionId,
                "actionMetadata": {}
              }
            })
          }, {
            headers:{
              Authorization: localStorage.getItem("token") 
            }
          } )
          console.log(res)
          router.push("/dashboard")
        }}>Publish</PrimaryButton>
      </div>
      <div className="w-full min-h-screen bg-red-200 flex pt-[-40px] flex-col justify-center ">
        <div className="flex justify-center w-full">
          <ZapCell  onClick={() => {
            setSelectedModelIndex(1);
        }} name={selectedTrigger.name ? selectedTrigger.name : "Trigger"} index={1} />
        </div>
        <div className="w-full pt-2 pb-2">
          {selectedAction.map((action, index) => (
            <div key={index} className="flex justify-center py-1">
              <ZapCell  
                onClick={() => {
                    setSelectedModelIndex(action.index);
                }}
                name={action.availableActionName ? action.availableActionName : "Action"}
                index={action.index}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <div>
            <PrimaryButton
              onClick={() => {
                setSelectedAction(prev => [
                  ...prev,
                  { index: prev.length + 1, availableActionId: "", availableActionName: "" }
                ]);
              }}
            >
              <div className="text-2xl">+</div>
            </PrimaryButton>
          </div>
        </div>
      </div>
      {selectedModelIndex && <Modal availableItems={selectedModelIndex === 1 ? availableTriggers : availableActions} index={selectedModelIndex} onSelect={ (props : null | {name: string, id: string}) => {
        if(props === null) setSelectedModelIndex(null);
        if(selectedModelIndex === 1){
          setSelectedTrigger({
            index: Number(props?.id),
            name: props?.name || ""
          }) 
        }else{
          setSelectedAction(prev => {
            const newActions = [...prev];
            newActions[selectedModelIndex - 2] = {
              index: selectedModelIndex,
              availableActionId: props?.id || "",
              availableActionName: props?.name || ""
            }
            return newActions;
          })
        }
      }} />}
    </div>
  );
};

function Modal({ index, onSelect, availableItems }: { index: number, onSelect: (props : null | {name: string, id: string}) => void, availableItems: {
  id: string;
  name: string;
  image: string;
}[] }) {
  return (
    <div>
      <div
        id="default-modal"
        className="overflow-x-hidden flex items-center justify-center overflow-y-hidden min-h-[30rem] w-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full h-80  flex items-center justify-center ">
          <div className="relative bg-white rounded-lg shadow-sm  h-full w-full ">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 ">
                Select {index === 1 ? "Trigger" : "Action" }
              </h3>
              <button
                onClick={() => {
                  onSelect(null);
                }}
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                data-modal-hide="default-modal"
              >
                <svg
                  className="w-3 h-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              {availableItems.map((item) => {
                const { id, name, image } = item;
                return <div onClick={() => {
                  onSelect({ name, id });
                }} key={id} className='flex p-4 cursor-pointer'>
                  <Image src={image} alt={name} className='rounded-full'/>
                  <div className='flex flex-col justify-center'>{name}</div>
                </div>
              })}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
