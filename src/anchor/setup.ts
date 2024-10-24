import { IdlAccounts, Program } from "@coral-xyz/anchor";
import { IDL, Presale } from "./idl";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Keypair,
} from "@solana/web3.js";
import { createMint, getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { BN } from "bn.js";

import adminKeypairArray from "./wallet/admin.json";
import buyerKeypairArray from "./wallet/buyer.json";

export const programId = new PublicKey("8N2g6ZSRJLf3JdJNtc2MadQnWhXxSg5AWNH1PUWBLivC");
export const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const TOKEN_DECIMALS = 6;
const mintAmount = new BN(10000000000000);

export const presaleProgram = new Program<Presale>(IDL, programId, {
  connection,
});

const PRESALE_SEED = "PRESALE_SEED";
const USER_SEED = "USER_SEED";
const PRESALE_VAULT = "PRESALE_VAULT";

let mint: PublicKey;
let adminAssociatedTokenAccount: PublicKey;
let buyerAssociatedTokenAccount: PublicKey;
let presaleAssociatedTokenAccount: PublicKey;

export const getUserInfoPda = (buyerPublicKey: PublicKey) => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(USER_SEED), buyerPublicKey.toBuffer()],
    programId
  )[0];
};

export const getPresaleVaultPda = () => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(PRESALE_VAULT)],
    programId
  );
};

export const getPresaleInfoPda = () => {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(PRESALE_SEED)],
    programId
  );
};

export const getMintAddress = () => {
  return new PublicKey("34y4xDyQRYvAJu4HrkoLgnXTUG7zLLpMCByu2pethkJ6");
};

export const getAdminKeypair = () => {
  return Keypair.fromSecretKey(Uint8Array.from(adminKeypairArray));
};

export const getAdminPublicKey = () => {
  return getAdminKeypair().publicKey;
};

export const getAdminAssociatedTokenAccount = () => {
  return adminAssociatedTokenAccount;
};

export const getBuyerAssociatedTokenAccount = () => {
  return buyerAssociatedTokenAccount;
};

export const getPresaleAssociatedTokenAccount = () => {
  return presaleAssociatedTokenAccount;
};

export const getBuyerPublicKey = () => {
  return getBuyerKeypair().publicKey;
};

export const getBuyerKeypair = () => {
  return Keypair.fromSecretKey(Uint8Array.from(buyerKeypairArray));
};

export const createNewDevnetTokenMint = async () => {
  try {

    const adminKeypair = getAdminKeypair();
    const adminPublicKey = getAdminPublicKey();
    const buyerPublicKey = getBuyerPublicKey();
    const buyerKeypair = getBuyerKeypair();

    mint = await createMint(
      connection,
      adminKeypair,
      adminPublicKey,
      null,
      TOKEN_DECIMALS,
    );
    console.log("new token mint created", mint.toBase58());

    adminAssociatedTokenAccount = (
      await getOrCreateAssociatedTokenAccount(
        connection,
        adminKeypair,
        mint,
        adminPublicKey,
      )
    ).address;

    console.log("admin associated token account", adminAssociatedTokenAccount.toBase58());

    buyerAssociatedTokenAccount = (
      await getOrCreateAssociatedTokenAccount(
        connection,
        buyerKeypair,
        mint,
        buyerPublicKey,
      )
    ).address;

    console.log("buyer associated token account", buyerAssociatedTokenAccount.toBase58());

    presaleAssociatedTokenAccount = (
      await getOrCreateAssociatedTokenAccount(
        connection,
        adminKeypair,
        mint,
        adminPublicKey,
      )
    ).address;

    console.log("presale associated token account", presaleAssociatedTokenAccount.toBase58());

    await mintTo(
      connection,
      adminKeypair,
      mint,
      adminAssociatedTokenAccount,
      adminPublicKey,
      mintAmount,
    )

    console.log("minted to admin associated token account", mintAmount.toString());
    
  } catch (error) {
    console.log(error);
  }

};

export type PresaleInfoData = IdlAccounts<Presale>["presaleInfo"];
export type UserInfoData = IdlAccounts<Presale>["userInfo"];
