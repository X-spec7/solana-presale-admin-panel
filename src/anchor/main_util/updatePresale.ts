import {
  presaleProgram,
  getPresaleInfoPda,
  getAdminPublicKey,
  getAdminKeypair,
  connection,
} from "../setup";
import {
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";

interface UpdatePresaleProps {
  startTime: BN;
  endTime: BN;
  maxTokenAmountPerUser: BN;
  pricePerToken: BN;
  softCapAmount: BN;
  hardCapAmount: BN;
}

export const updatePresale = async ({ startTime, endTime, maxTokenAmountPerUser, pricePerToken, softCapAmount, hardCapAmount }: UpdatePresaleProps) => {
  try {
    const transaction = new Transaction();
    const adminPublicKey = getAdminPublicKey();
    const adminKeypair = getAdminKeypair();
    const [ presaleInfoPda ] = getPresaleInfoPda();

    const updatePresaleIx = await presaleProgram.methods.updatePresale(
      startTime,
      endTime,
      maxTokenAmountPerUser,
      pricePerToken,
      softCapAmount,
      hardCapAmount,
    ).accounts({
      presaleInfo: presaleInfoPda,
      authority: adminPublicKey,
      systemProgram: SystemProgram.programId,
    }).signers([adminKeypair])
    .instruction(); 

    transaction.add(updatePresaleIx);

    const signature = await sendAndConfirmTransaction(connection, transaction, [adminKeypair]);

    return signature;

  } catch (error) {
    console.log(error);
  }
}
