"use client"

import { ThemeProvider } from "@/components/ThemeProvider"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import '@solana/wallet-adapter-react-ui/styles.css'
import * as walletAdapters from "@solana/wallet-adapter-wallets"

export default function Providers({ children }: { 
    children: React.ReactNode 
}) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ConnectionProvider endpoint={process.env.SOLANA_DEVNET_RPC_URL || "https://api.devnet.solana.com"}>
                <WalletProvider wallets={[new walletAdapters.PhantomWalletAdapter()]} autoConnect>
                    <WalletModalProvider>
                    {children}
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </ThemeProvider>
    )
}