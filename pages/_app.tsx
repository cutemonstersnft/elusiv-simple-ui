import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useMemo } from "react";
import { ConnectionProvider, WalletProvider, } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
require("@solana/wallet-adapter-react-ui/styles.css");
import { Toaster } from "@/components/ui/toaster"
require("../wallet.css")
import { SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()


export default function App({ Component, pageProps }: AppProps) {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  
  const wallets = useMemo(
    () => [
      new SolflareWalletAdapter({ network })
    ],
    []
  );
  return (
    <QueryClientProvider client={queryClient}>
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
            <Component {...pageProps} />
            <Toaster />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
    </QueryClientProvider>
);
}









