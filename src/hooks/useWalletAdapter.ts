import { ledger } from "@/constants/ledgerAdapter"
import { tiplinkWalletAdpater } from "@/constants/tiplinkAdapter"
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets"
import { useMemo } from "react"
import { network } from '@/constants/environment'
import { TipLinkWalletAdapter } from "@tiplink/wallet-adapter"

type WalletAdapterHook = ()=>(PhantomWalletAdapter | SolflareWalletAdapter | TipLinkWalletAdapter)[]

export const useWalletAdapter : WalletAdapterHook = () =>{ 
    return useMemo(()=>{
    if (typeof window === 'undefined') return []
	else return [new PhantomWalletAdapter(), new SolflareWalletAdapter({ network }), tiplinkWalletAdpater, ledger]
},[])}