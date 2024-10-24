import {
  Transaction,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  sendAndConfirmTransaction
} from "@solana/web3.js";
import {
  presaleProgram,
  getBuyerPublicKey,
  getBuyerKeypair,
  getPresaleVaultPda,
  getPresaleInfoPda,
  getAdminPublicKey,
  getAdminKeypair,
  getUserInfoPda,
  connection,
} from "../setup";
import { BN } from "bn.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { ASSOCIATED_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/utils/token";

interface BuyTokenProps {
  quoteInLamports: number;
}

export const buyToken = async ({ quoteInLamports }: BuyTokenProps) => {
  try {
    const transaction = new Transaction();
    const buyerPublicKey = getBuyerPublicKey();
    const buyerKeypair = getBuyerKeypair();
    const [ presaleVault ] = getPresaleVaultPda();
    const [ presaleInfo ] = getPresaleInfoPda();
    const adminPublicKey = getAdminPublicKey();
    const adminKeypair = getAdminKeypair();
    const userInfo = getUserInfoPda(buyerPublicKey);

    const buyTokenIx = await presaleProgram.methods.buyToken(new BN(quoteInLamports))
    .accounts({
      presaleInfo: presaleInfo,
      presaleAuthority: adminPublicKey,
      userInfo: userInfo,
      presaleVault: presaleVault,
      buyer: buyerPublicKey,
      rent: SYSVAR_RENT_PUBKEY,
      systemProgram: SystemProgram.programId,
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_PROGRAM_ID,
    }).instruction();

    transaction.add(buyTokenIx);

    const signature = await sendAndConfirmTransaction(connection, transaction, [adminKeypair, buyerKeypair]);
    console.log("transaction signature", signature);

    return signature;
  } catch (error) {
    console.log(error);
  }
}
