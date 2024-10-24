import {
  SYSVAR_RENT_PUBKEY,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction
} from "@solana/web3.js";
import {
  presaleProgram,
  getAdminKeypair,
  getAdminPublicKey,
  getPresaleVaultPda,
  getPresaleInfoPda,
  getMintAddress,
  getAdminAssociatedTokenAccount,
  getPresaleAssociatedTokenAccount,
  connection,
} from "../setup";
import { BN } from "@coral-xyz/anchor";
import { ASSOCIATED_PROGRAM_ID, TOKEN_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";

interface WithdrawTokenProps {
  amount: number;
}

export const withdrawToken = async ({ amount }: WithdrawTokenProps) => {
  try {
    const transaction = new Transaction();
    const adminKeypair = getAdminKeypair();
    const adminPublicKey = getAdminPublicKey();
    const [ presaleInfo, bump ] = getPresaleInfoPda();
    const mintAccount = getMintAddress();
    const adminAssociatedTokenAccount = getAdminAssociatedTokenAccount();
    const presaleAssociatedTokenAccount = getPresaleAssociatedTokenAccount();
    const presaleTokenMintAccount = getMintAddress();
    const withdrawTokenIx = await presaleProgram.methods.withdrawToken(
      new BN(amount),
      bump
    ).accounts({
      mintAccount: mintAccount,
      adminAssociatedTokenAccount: adminAssociatedTokenAccount,
      presaleAssociatedTokenAccount: presaleAssociatedTokenAccount,
      presaleTokenMintAccount: presaleTokenMintAccount,
      presaleInfo: presaleInfo,
      adminAuthority: adminPublicKey,
      rent: SYSVAR_RENT_PUBKEY,
      systemProgram: SystemProgram.programId,
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
    }).instruction();

    transaction.add(withdrawTokenIx);

    const signature = await sendAndConfirmTransaction(connection, transaction, [adminKeypair]);
    console.log("Withdraw transaction sent and confirmed:", signature);
    return signature;
  } catch (error) {
    console.error(error);
  }
};
