import {
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction
} from "@solana/web3.js";
import {
  presaleProgram,
  getAdminKeypair,
  getAdminPublicKey,
  getPresaleVaultPda,
  getPresaleInfoPda,
  connection,
} from "../setup";
import { BN } from "@coral-xyz/anchor";

interface WithdrawSolProps {
  amount: number;
}

export const withdrawSol = async ({ amount }: WithdrawSolProps) => {
  try {
    const transaction = new Transaction();
    const adminKeypair = getAdminKeypair();
    const adminPublicKey = getAdminPublicKey();
    const [ presaleVault, bump ] = getPresaleVaultPda();
    const [ presaleInfo ] = getPresaleInfoPda();

    const withdrawSolIx = await presaleProgram.methods.withdrawSol(
      new BN(amount),
      bump  
    ).accounts({
      presaleInfo: presaleInfo,
      presaleVault: presaleVault,
      admin: adminPublicKey,
      systemProgram: SystemProgram.programId,
    }).instruction();

    transaction.add(withdrawSolIx);

    const signature = await sendAndConfirmTransaction(connection, transaction, [adminKeypair]);
    console.log("Withdraw transaction sent and confirmed:", signature);
    return signature;

  } catch (error) {
    console.error(error);
  }
}
