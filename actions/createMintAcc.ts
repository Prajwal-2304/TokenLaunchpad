
import { Connection, Keypair, PublicKey, SystemProgram, Transaction  } from "@solana/web3.js"
import { WalletContextState } from "@solana/wallet-adapter-react"
import { createInitializeMetadataPointerInstruction, createInitializeMintInstruction, ExtensionType, getMintLen, LENGTH_SIZE, TOKEN_2022_PROGRAM_ID, TYPE_SIZE } from "@solana/spl-token"
import { createInitializeInstruction, pack } from '@solana/spl-token-metadata';

interface Metadata {
  mint: PublicKey,
  name: string,
  symbol: string,
  uri: string,
  additionalMetadata: []
}

export async function createTokenMint({ connection, decimals, wallet, tokenName, tokenSymbol }: { 
  connection: Connection, 
  decimals: number, 
  wallet: WalletContextState,
  tokenName: string,
  tokenSymbol: string
}) {
  const mintKeypair = Keypair.generate()

  const metadata: Metadata = {
    mint: mintKeypair.publicKey,
    name: tokenName,
    symbol: tokenSymbol,
    uri: "",
    additionalMetadata: []
  }

  const mintLen = getMintLen([ExtensionType.MetadataPointer])
  const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;

  const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);
  
  const transaction = new Transaction().add(
    SystemProgram.createAccount({
      fromPubkey: wallet.publicKey!,
      newAccountPubkey: mintKeypair.publicKey,
      space: mintLen,
      lamports,
      programId: TOKEN_2022_PROGRAM_ID,
    }),
    createInitializeMetadataPointerInstruction(mintKeypair.publicKey, wallet.publicKey, mintKeypair.publicKey, TOKEN_2022_PROGRAM_ID),
    createInitializeMintInstruction(mintKeypair.publicKey, decimals, wallet.publicKey!, null, TOKEN_2022_PROGRAM_ID),
    createInitializeInstruction({
        programId: TOKEN_2022_PROGRAM_ID,
        mint: mintKeypair.publicKey,
        metadata: mintKeypair.publicKey,
        name: metadata.name,
        symbol: metadata.symbol,
        uri: metadata.uri,
        mintAuthority: wallet.publicKey!,
        updateAuthority: wallet.publicKey!,
    }),
  )

  transaction.feePayer = wallet.publicKey!
  transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
  transaction.partialSign(mintKeypair)

  await wallet.sendTransaction(transaction, connection)
  console.log(`Token mint created at ${mintKeypair.publicKey.toBase58()}`);
  return mintKeypair.publicKey.toBase58()
}