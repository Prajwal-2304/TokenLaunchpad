
import { Connection, Keypair, SystemProgram, Transaction  } from "@solana/web3.js"
import { WalletContextState } from "@solana/wallet-adapter-react"
import { createInitializeMint2Instruction, getMinimumBalanceForRentExemptMint, MINT_SIZE, TOKEN_PROGRAM_ID } from "@solana/spl-token"

export async function createTokenMint({ connection, decimals, wallet }: { 
  connection: Connection, 
  decimals: number, 
  wallet: WalletContextState 
}) {
  const mintKeypair = Keypair.generate()
  const lamports = await getMinimumBalanceForRentExemptMint(connection)
  
  const transaction = new Transaction().add(
    SystemProgram.createAccount({
      fromPubkey: wallet.publicKey!,
      newAccountPubkey: mintKeypair.publicKey,
      space: MINT_SIZE,
      lamports,
      programId: TOKEN_PROGRAM_ID,
    }),
    createInitializeMint2Instruction(
      mintKeypair.publicKey,
      decimals,
      wallet.publicKey!,
      wallet.publicKey,
      TOKEN_PROGRAM_ID
    )
  )

  transaction.feePayer = wallet.publicKey!
  transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
  transaction.partialSign(mintKeypair)

  await wallet.sendTransaction(transaction, connection)
  console.log(`Token mint created at ${mintKeypair.publicKey.toBase58()}`);
  return mintKeypair.publicKey.toBase58()
}