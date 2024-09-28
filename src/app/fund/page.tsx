"use client";

import React, { useState } from 'react';
import { useTheme } from 'next-themes';

export default function FundManagement() {
  const { theme } = useTheme();
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawSolAmount, setWithdrawSolAmount] = useState('');
  const [withdrawTokenAmount, setWithdrawTokenAmount] = useState('');

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement deposit logic here
    console.log('Depositing:', depositAmount);
  };

  const handleWithdrawSol = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement SOL withdrawal logic here
    console.log('Withdrawing SOL:', withdrawSolAmount);
  };

  const handleWithdrawToken = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement token withdrawal logic here
    console.log('Withdrawing tokens:', withdrawTokenAmount);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 flex items-center min-h-screen">
      <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Fund Management</h1>
        
        <form onSubmit={handleDeposit} className="mb-6">
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="depositAmount">
              Deposit Amount
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="depositAmount"
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              required
            />
          </div>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Deposit
          </button>
        </form>

        <form onSubmit={handleWithdrawSol} className="mb-6">
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="withdrawSolAmount">
              Withdraw SOL Amount
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="withdrawSolAmount"
              type="number"
              value={withdrawSolAmount}
              onChange={(e) => setWithdrawSolAmount(e.target.value)}
              required
            />
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Withdraw SOL
          </button>
        </form>

        <form onSubmit={handleWithdrawToken}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="withdrawTokenAmount">
              Withdraw Token Amount
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="withdrawTokenAmount"
              type="number"
              value={withdrawTokenAmount}
              onChange={(e) => setWithdrawTokenAmount(e.target.value)}
              required
            />
          </div>
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Withdraw Token
          </button>
        </form>
      </div>
    </div>
  );
}
