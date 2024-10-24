import {
  presaleProgram,
  getMintAddress,
  getAdminAssociatedTokenAccount,
  getBuyerAssociatedTokenAccount,
  getPresaleVaultPda,
  getPresaleInfoPda,
  getAdminPublicKey,
  connection,
  getAdminKeypair,
} from "../setup";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_PROGRAM_ID
} from "@coral-xyz/anchor/dist/cjs/utils/token";
import { BN } from "bn.js";
import {
  Transaction,
  SYSVAR_RENT_PUBKEY,
  SystemProgram,
  sendAndConfirmTransaction
} from "@solana/web3.js";

interface DepositPresaleProps {
  amount: number;
}

export const depositToken = async ({ amount }: DepositPresaleProps) => {
  try {
    const mintAccount = getMintAddress();
    const adminAssociatedTokenAccount = getAdminAssociatedTokenAccount();
    const buyerAssociatedTokenAccount = getBuyerAssociatedTokenAccount();
    const [ presaleVault ] = getPresaleVaultPda();
    const [ presaleInfo ] = getPresaleInfoPda();
    const adminPublicKey = getAdminPublicKey();
    const adminKeypair = getAdminKeypair();

    const transaction = new Transaction();

    const depositIx = await presaleProgram.methods.depositToken(new BN(amount)).accounts({
      mintAccount: mintAccount,
      fromAssociatedTokenAccount: adminAssociatedTokenAccount,
      toAssociatedTokenAccount: buyerAssociatedTokenAccount,
      presaleVault: presaleVault,
      presaleInfo: presaleInfo,
      admin: adminPublicKey,
      rent: SYSVAR_RENT_PUBKEY,
      systemProgram: SystemProgram.programId,
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
    }).instruction();

    transaction.add(depositIx);

    const signature = await sendAndConfirmTransaction(connection, transaction, [adminKeypair]);
    console.log("Deposit transaction sent and confirmed:", signature);
    return signature;

  } catch (error) {
    console.error(error);
  }
};
