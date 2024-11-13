import { clusterApiUrl, Connection } from "@solana/web3.js"
import * as token from "@solana/spl-token"
import * as web3 from "@solana/web3.js"
import { useWallet } from "@solana/wallet-adapter-react"
import { Adapter, WalletAdapter } from "@solana/wallet-adapter-base"
import { resolve } from "path"

export async function createAccount({connection,wallet,mint}:{connection:web3.Connection,wallet:WalletAdapter,mint:web3.PublicKey}){
   
    await new Promise(resolve=>setTimeout(resolve,1000))
    const state = await token.getMint(connection,mint,'confirmed',token.TOKEN_PROGRAM_ID);
    const keypair=await web3.Keypair.generate();
    const space =token.getAccountLenForMint(state);
    const lamports=await connection.getMinimumBalanceForRentExemption(space);
    const programId=token.TOKEN_PROGRAM_ID;

    const transaction=new web3.Transaction().add(
        web3.SystemProgram.createAccount({
            fromPubkey:wallet.publicKey!,
            newAccountPubkey:keypair.publicKey,
            space,
            lamports,
            programId
        }),
        token.createInitializeAccountInstruction(
            keypair.publicKey,
            mint,
            wallet.publicKey!,
            programId
        )
    )
    const signature=await wallet.sendTransaction(transaction,connection)
    await connection.confirmTransaction(signature, 'confirmed');
    return keypair.publicKey
}