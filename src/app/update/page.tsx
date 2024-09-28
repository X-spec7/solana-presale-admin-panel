"use client";

import React, { useState } from 'react';
import { useTheme } from 'next-themes';

export default function UpdatePresale() {
  const { theme } = useTheme();
  const [updatePresaleData, setUpdatePresaleData] = useState({
    softcap: '',
    hardcap: '',
    maxTokenPerAddress: '',
    pricePerToken: '',
    startTime: '',
    endTime: '',
  });

  const handleUpdatePresaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatePresaleData({ ...updatePresaleData, [e.target.id]: e.target.value });
  };

  const handleUpdatePresale = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement presale update logic here
    console.log('Updating presale with:', updatePresaleData);
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
              type={key.includes('cap') || key.includes('Token') ? 'number' : key.includes('Time') ? 'datetime-local' : 'text'}
              value={value}
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
