"use client";

import React, { useState } from 'react';
import { updatePresale } from '@/anchor';
import { useTheme } from 'next-themes';
import { BN } from '@coral-xyz/anchor';
import { useRouter } from 'next/navigation';

type UpdatePresaleData = {
  softcap: number;
  hardcap: number;
  maxTokenPerAddress: number;
  pricePerToken: number;
  startTime: Date;
  endTime: Date;
}

export default function UpdatePresale() {
  const { theme } = useTheme();
  const router = useRouter();
  const [updatePresaleData, setUpdatePresaleData] = useState<UpdatePresaleData | null>({
    softcap: 0,
    hardcap: 0,
    maxTokenPerAddress: 0,
    pricePerToken: 0,
    startTime: new Date(),
    endTime: new Date(),
  });

  const handleUpdatePresaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === 'startTime' || id === 'endTime') {
      // For date-time fields, combine the date with a default time
      const dateWithTime = new Date(value + 'T00:00');
      setUpdatePresaleData(prevData => ({ ...prevData, [id]: dateWithTime }));
    } else {
      setUpdatePresaleData(prevData => ({ ...prevData, [id]: value }));
    }
  };

  const handleUpdatePresale = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      console.log("updatePresaleData", updatePresaleData);
      const updatePresaleDataForTx = {
        softCapAmount: new BN(updatePresaleData.softcap),
        hardCapAmount: new BN(updatePresaleData.hardcap),
        maxTokenAmountPerUser: new BN(updatePresaleData.maxTokenPerAddress),
        pricePerToken: new BN(updatePresaleData.pricePerToken),
        startTime: new BN(Math.floor(new Date(updatePresaleData.startTime).getTime() / 1000)),
        endTime: new BN(Math.floor(new Date(updatePresaleData.endTime).getTime() / 1000)),
      };
      console.log("updatePresaleDataForTx", updatePresaleDataForTx);
      const tx = await updatePresale(updatePresaleDataForTx);
      console.log('Update presale transaction: ', tx);
      router.push('/presale-info');
    } catch (error) {
      console.error('Error updating presale:', error);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 flex items-center min-h-screen">
      <form onSubmit={handleUpdatePresale} className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Update Presale</h1>
        {Object.entries(updatePresaleData).map(([key, value]) => (
          <div className="mb-4" key={key}>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor={key}>
              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id={key}
              type={key.includes('cap') || key.includes('Token') ? 'number' : key.includes('Time') ? 'date' : 'text'}
              value={key === 'startTime' || key === 'endTime' 
                ? (value instanceof Date ? value.toISOString().split('T')[0] : '')
                : value.toString()}
              onChange={handleUpdatePresaleChange}
              required
            />
          </div>
        ))}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Update Presale
          </button>
        </div>
      </form>
    </div>
  );
}
