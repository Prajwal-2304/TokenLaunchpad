import React from "react"
import { Rocket } from "lucide-react"
import { ModeToggle } from "./ModeToggle"
import WalletButton from "./WalletConnect"

export default function Appbar() {
    return (
        <header className="px-4 sticky top-0 z-50 w-full border-b-2 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
            <div className="flex flex-1">
            <a className="flex items-center space-x-2" href="">
                <Rocket className="h-6 w-6" />
                <span className="font-bold">Token Launchpad</span>
            </a>
            </div>
            <div className="flex flex-1 items-center justify-end space-x-4">
                <ModeToggle/>
                <div>SOON LOGO</div>
                <WalletButton/>
            </div>
        </div>
        </header>
  )
}