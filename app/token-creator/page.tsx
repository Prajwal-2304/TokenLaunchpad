"use client"

import * as React from "react"
import { Upload } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function Component() {

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white p-8 transition-colors duration-200">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="flex justify-end mb-4">
          </div>
          <h1 className="text-4xl font-bold">Solana Token Creator</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Easily Create your own Solana SPL Token in just 7+1 steps without Coding.
          </p>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="Put the name of your Token"
                className="bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-800"
              />
            </div>
            <div className="space-y-2">
              <Label>
                Symbol <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="Put the symbol of your Token"
                className="bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Decimals <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                defaultValue="6"
                className="bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-800"
              />
            </div>
            <div className="space-y-2">
              <Label>
                Supply <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                defaultValue="1"
                className="bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-800"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>
              Image <span className="text-red-500">*</span>
            </Label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-800 rounded-lg p-8 transition-colors hover:border-gray-400 dark:hover:border-gray-700">
              <div className="flex flex-col items-center justify-center gap-2">
                <Upload className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400">Upload Image</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Most meme coin use a squared 1000x1000 logo</p>
          </div>

          <div className="space-y-2">
            <Label>
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              placeholder="Put the description of your Token"
              className="bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-800 min-h-[100px]"
            />
          </div>

          <div className="flex items-center gap-2">
            <Label>Add Social Links</Label>
            <Switch />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Website</Label>
              <Input
                placeholder="Put your website"
                className="bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-800"
              />
            </div>
            <div className="space-y-2">
              <Label>Twitter</Label>
              <Input
                placeholder="Put your twitter"
                className="bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-800"
              />
            </div>
            <div className="space-y-2">
              <Label>Telegram</Label>
              <Input
                placeholder="Put your telegram"
                className="bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-800"
              />
            </div>
            <div className="space-y-2">
              <Label>Discord</Label>
              <Input
                placeholder="Put your discord"
                className="bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-800"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Revoke Authorities</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Solana Token have 3 authorities: Freeze Authority, Mint Authority and Update Authority. Revoke them to attract
              more investors.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Revoke Update (Immutable)</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Update Authority allows you to update token metadata</p>
                  </div>
                  <Switch />
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">(+0.1 SOL)</div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Revoke Freeze</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Freeze Authority allows you to freeze token accounts</p>
                  </div>
                  <Switch />
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">(+0.1 SOL)</div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Revoke Mint</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Mint Authority allows you to mint more supply</p>
                  </div>
                  <Switch />
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">(+0.1 SOL)</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-6">Create Token</Button>
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              Total Fees: <span className="text-teal-500 dark:text-teal-400">0.10 SOL</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}