import * as token from "@solana/spl-token"
import * as web3 from "@solana/web3.js"
import { useWallet } from "@solana/wallet-adapter-react"
import { Adapter, WalletAdapter } from "@solana/wallet-adapter-base"


export async function mint({connection,wallet,amount,mint}:{connection:web3.Connection,wallet:WalletAdapter,amount:number,mint:web3.PublicKey}){
const transaction=new web3.Transaction().add(
    token.createMintToInstruction(mint,wallet.publicKey!,wallet.publicKey!,amount)
)
const res=wallet.sendTransaction(transaction,connection);
return res;
}