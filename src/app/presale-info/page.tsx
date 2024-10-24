"use client";

import {
  PresaleInfoData,
  getPresaleInfoPda,
  presaleProgram,
} from "@/anchor/setup";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function PresaleInfoPage() {
  const [presaleInfo, setPresaleInfo] = useState<PresaleInfoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPresaleInfo = async () => {
      try {
        setLoading(true);
        const [presaleInfoPda] = getPresaleInfoPda();
        const fetchedPresaleInfo = await presaleProgram.account.presaleInfo.fetch(presaleInfoPda);
        setPresaleInfo(fetchedPresaleInfo);
      } catch (err) {
        console.error('Error fetching presale info:', err);
        setError('Failed to fetch presale info. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPresaleInfo();
  }, []);

  const formatNumber = (value: number | bigint) => {
    return Number(value).toLocaleString();
  };

  const formatDate = (timestamp: number | bigint) => {
    return new Date(Number(timestamp) * 1000).toLocaleString();
  };

  if (loading) return <p>Loading presale info...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Presale Info</h1>
      {presaleInfo ? (
        <div className="bg-gray-100 p-4 rounded-lg">
          <p><strong>Token Mint:</strong> {presaleInfo.tokenMintAddress.toBase58()}</p>
          <p><strong>Soft Cap:</strong> {formatNumber(presaleInfo.softcapAmount)}</p>
          <p><strong>Hard Cap:</strong> {formatNumber(presaleInfo.hardcapAmount)}</p>
          <p><strong>Deposit Token Amount:</strong> {formatNumber(presaleInfo.depositTokenAmount)}</p>
          <p><strong>Sold Token Amount:</strong> {formatNumber(presaleInfo.soldTokenAmount)}</p>
          <p><strong>Max Token Per Address:</strong> {formatNumber(presaleInfo.maxTokenAmountPerAddress)}</p>
          <p><strong>Price Per Token:</strong> {formatNumber(presaleInfo.pricePerToken)}</p>
          <p><strong>Start Date:</strong> {formatDate(presaleInfo.startTime)}</p>
          <p><strong>End Date:</strong> {formatDate(presaleInfo.endTime)}</p>
        </div>
      ) : (
        <p>No presale info available.</p>
      )}
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => router.push('/update')}
      >
        Update Presale
      </button>
    </div>
  );
}
