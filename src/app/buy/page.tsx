"use client";

import React, { useState, useEffect } from 'react';
import { buyToken } from '@/anchor';
import { useTheme } from 'next-themes';

export default function BuyToken() {
  const { theme } = useTheme();
  const [solAmount, setSolAmount] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');

  // This should be fetched from your backend or smart contract
  const exchangeRate = 10; // 1 SOL = 10 tokens

  useEffect(() => {
    // Update token amount when SOL amount changes
    if (solAmount !== '') {
      const calculatedTokens = parseFloat(solAmount) * exchangeRate;
      setTokenAmount(calculatedTokens.toFixed(2));
    }
  }, [solAmount]);

  useEffect(() => {
    // Update SOL amount when token amount changes
    if (tokenAmount !== '') {
      const calculatedSol = parseFloat(tokenAmount) / exchangeRate;
      setSolAmount(calculatedSol.toFixed(4));
    }
  }, [tokenAmount]);

  const handleSolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSolAmount(e.target.value);
  };

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTokenAmount(e.target.value);
  };

  const handleBuy = async (e: React.FormEvent) => {
    e.preventDefault();
    const tx = await buyToken({
      quoteInLamports: Number(solAmount),
    });

    // TODO: Implement token purchase logic here
    console.log('buy transaction: ', tx);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 flex items-center min-h-screen">
      <form onSubmit={handleBuy} className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Buy Token</h1>

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="solAmount">
            SOL Amount
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="solAmount"
            type="number"
            step="0.0001"
            value={solAmount}
            onChange={handleSolChange}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="tokenAmount">
            Token Amount
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="tokenAmount"
            type="number"
            step="0.01"
            value={tokenAmount}
            onChange={handleTokenChange}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Buy Token
          </button>
        </div>
      </form>
    </div>
  );
}
