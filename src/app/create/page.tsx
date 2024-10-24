"use client";

import React, { useState } from 'react';
import { createPresale, startPresale } from '@/anchor';
import { createNewDevnetTokenMint } from '@/anchor/setup';
import { BN } from '@coral-xyz/anchor';

export default function CreatePresale() {
  const [createPresaleData, setCreatePresaleData] = useState({
    // mintAddress: '',
    softcapInSol: '',
    hardcapInSol: '',
    maxTokenPerAddress: '',
    pricePerTokenInLamports: '',
  });

  const [startPresaleData, setStartPresaleData] = useState({
    startTime: '',
    endTime: '',
  });

  const handleCreatePresaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreatePresaleData({ ...createPresaleData, [e.target.id]: e.target.value });
  };

  const handleStartPresaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartPresaleData({ ...startPresaleData, [e.target.id]: e.target.value });
  };

  const handleCreatePresale = async (e: React.FormEvent) => {
    e.preventDefault();
    const tx = await createPresale({
      softCapAmount: new BN(createPresaleData.softcapInSol),
      hardCapAmount: new BN(createPresaleData.hardcapInSol),
      maxTokenAmountPerUser: new BN(createPresaleData.maxTokenPerAddress),
      pricePerToken: new BN(createPresaleData.pricePerTokenInLamports),
    });
    // TODO: Implement presale creation logic here
    console.log('create presale transaction: ', tx);
  };

  const handleStartPresale = async (e: React.FormEvent) => {

    e.preventDefault();
    const tx = await startPresale({
      startDate: new BN(Math.floor(new Date(startPresaleData.startTime).getTime() / 1000)),
      endDate: new BN(Math.floor(new Date(startPresaleData.endTime).getTime() / 1000)),
    });
    // TODO: Implement start presale logic here
    console.log('start presale transaction: ', tx);
  };

  const handleCreateMint = async (e: React.FormEvent) => {
    e.preventDefault();
    await createNewDevnetTokenMint();
    console.log("new token mint created on devnet");
    // TODO: Implement mint creation logic here
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 flex items-center min-h-screen">
      <div className="flex flex-col md:flex-row gap-8 w-full">
        <form onSubmit={handleCreatePresale} className="flex-1 bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Create Presale</h1>
          {Object.entries(createPresaleData).map(([key, value]) => (
            <div className="mb-4" key={key}>
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor={key}>
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={key}
                type={key.includes('cap') || key.includes('Token') ? 'number' : 'text'}
                value={value}
                onChange={handleCreatePresaleChange}
                required
              />
            </div>
          ))}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Create Presale
            </button>
          </div>
        </form>

        <form onSubmit={handleStartPresale} className="flex-1 flex-col justify-between bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div>

            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Start Presale</h2>
            {Object.entries(startPresaleData).map(([key, value]) => (
              <div className="mb-4" key={key}>
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id={key}
                  type="datetime-local"
                  value={value}
                  onChange={handleStartPresaleChange}
                  required
                />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Start Presale
            </button>
          </div>
          <div className="flex items-center justify-between mt-5">
            <button
              className="bg-red-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              onClick={handleCreateMint}
            >
              Create Mint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}