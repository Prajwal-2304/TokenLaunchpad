
import { Connection, Keypair, SystemProgram, Transaction } from "@solana/web3.js"
import { WalletContextState } from "@solana/wallet-adapter-react"
import { createAssociatedTokenAccountInstruction, createInitializeMetadataPointerInstruction, createInitializeMintInstruction, createMintToInstruction, ExtensionType, getAssociatedTokenAddressSync, getMintLen, LENGTH_SIZE, TOKEN_2022_PROGRAM_ID, TYPE_SIZE } from "@solana/spl-token"
import { createInitializeInstruction, pack, TokenMetadata } from '@solana/spl-token-metadata';
import { HandleJsonUpload } from "@/cloud/uploadJSON";


export async function createTokenMint({ connection, decimals, wallet, tokenName, tokenSymbol, imgURL, supply, description }: {
  connection: Connection,
  decimals: number,
  wallet: WalletContextState,
  tokenName: string,
  tokenSymbol: string,
  imgURL: string,
  supply: number,
  description: string
}) {
  const mintKeypair = Keypair.generate()

  const metadataJSON = {
    name: tokenName,
    symbol: tokenSymbol,
    description,
    image: imgURL,
    attributes: []
  }

  const fileKey = await HandleJsonUpload(metadataJSON)
  const metaDataJSONUrl = `${process.env.R2_PUBLIC_URL}/token-launchpad/${fileKey}`

  console.log(metaDataJSONUrl)

  const metadata: TokenMetadata = {
    mint: mintKeypair.publicKey,
    name: tokenName,
    symbol: tokenSymbol,
    uri: metaDataJSONUrl,
    additionalMetadata: []
  }

  const mintLen = getMintLen([ExtensionType.MetadataPointer])
  const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;

  const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);

  const associatedToken = getAssociatedTokenAddressSync(
    mintKeypair.publicKey,
    wallet.publicKey!,
    false,
    TOKEN_2022_PROGRAM_ID,
  );

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
    createAssociatedTokenAccountInstruction(
      wallet.publicKey!,
      associatedToken,
      wallet.publicKey!,
      mintKeypair.publicKey,
      TOKEN_2022_PROGRAM_ID,
    ),
    createMintToInstruction(mintKeypair.publicKey, associatedToken, wallet.publicKey!, supply * 1000000, [], TOKEN_2022_PROGRAM_ID)
  )

  transaction.feePayer = wallet.publicKey!
  transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash
  transaction.partialSign(mintKeypair)

  try {
    await wallet.sendTransaction(transaction, connection)
    console.log(`Token mint created at ${mintKeypair.publicKey.toBase58()}`)
    console.log("ATA: ", associatedToken.toBase58())
    return mintKeypair.publicKey.toBase58()
  } catch (err) {
    console.log("Error in transaction");
    console.log(err)
  }
}
