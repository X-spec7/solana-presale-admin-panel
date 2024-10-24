import {
  presaleProgram,
  getPresaleInfoPda,
  getMintAddress,
  getAdminPublicKey,
  getAdminKeypair,
  connection,
} from "../setup";
import { BN } from "bn.js";
import {
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
} from "@solana/web3.js";

interface CreatePresaleProps {
  // mint: PublicKey;
  softCapAmount: number;
  hardCapAmount: number;
  maxTokenAmountPerUser: number;
  pricePerToken: number;
}

export const createPresale = async ({
  // mint,
  softCapAmount,
  hardCapAmount,
  maxTokenAmountPerUser,
  pricePerToken,
}: CreatePresaleProps) => {
  try {
    const mint = getMintAddress();
    const [ presaleInfoPda ] = getPresaleInfoPda();
    const adminPublicKey = getAdminPublicKey();
    const adminKeypair = getAdminKeypair();

    const transaction = new Transaction();

    const createPresaleIx = await presaleProgram.methods.createPresale(
      mint,
      new BN(softCapAmount),
      new BN(hardCapAmount),
      new BN(maxTokenAmountPerUser),
      new BN(pricePerToken),
    ).accounts({
      presaleInfo: presaleInfoPda,
      authority: adminPublicKey,
      systemProgram: SystemProgram.programId,
    }).instruction();

    transaction.add(createPresaleIx);

    const signature = await sendAndConfirmTransaction(connection, transaction, [adminKeypair]);
    console.log("transaction signature", signature);

    return signature;

  } catch (error) {
    console.log(error);
  }
};
