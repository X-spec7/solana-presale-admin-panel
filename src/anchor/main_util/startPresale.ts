import {
  presaleProgram,
  getPresaleInfoPda,
  getAdminPublicKey,
  getAdminKeypair,
  connection,
} from "../setup";
import {
  sendAndConfirmTransaction,
  Transaction,
} from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";

interface StartPresaleProps {
  startDate: BN;
  endDate: BN;
}

export const startPresale = async ({ startDate, endDate }: StartPresaleProps) => {

  try { 
    const transaction = new Transaction();
    const adminPublicKey = getAdminPublicKey();
    const adminKeypair = getAdminKeypair();
    const [ presaleInfoPda ] = getPresaleInfoPda();

    const startPresaleIx = await presaleProgram.methods.startPresale(
      new BN(startDate.getTime() / 1000),
      new BN(endDate.getTime() / 1000),
    ).accounts({
      presaleInfo: presaleInfoPda,
      authority: adminPublicKey,
    }).signers([adminKeypair])
    .instruction();

    transaction.add(startPresaleIx);

    const signature = await sendAndConfirmTransaction(connection, transaction, [adminKeypair]);

    return signature;

  } catch (error) {
    console.log(error);
  }
};
