import { clusterApiUrl, Connection } from "@solana/web3.js"
import * as token from "@solana/spl-token"
import * as web3 from "@solana/web3.js"
import { useWallet, Wallet } from "@solana/wallet-adapter-react"
import { Adapter, WalletAdapter } from "@solana/wallet-adapter-base"
import { sign } from "crypto"

export async function createTokenMint({connection,decimals,wallet}:{connection:web3.Connection,decimals:number,wallet:WalletAdapter}){
const lamports=await token.getMinimumBalanceForRentExemptMint(connection)
const programId=token.TOKEN_PROGRAM_ID;
const keypair=web3.Keypair.generate()
const transaction=new web3.Transaction().add(
    web3.SystemProgram.createAccount({
        fromPubkey:wallet.publicKey!,
        newAccountPubkey:keypair.publicKey,
        space:token.MINT_SIZE,
        lamports,
        programId,
    }),token.createInitializeMintInstruction(
        keypair.publicKey,
        decimals,
        wallet.publicKey!,
        wallet.publicKey,
        programId
    )
)
const signature=await wallet.sendTransaction(transaction,connection,{signers:[keypair]})
const confirmation=await connection.confirmTransaction(signature,'confirmed')
await token.getMint(connection,keypair.publicKey)
return keypair.publicKey;
}