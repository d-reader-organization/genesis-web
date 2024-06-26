import { TipLinkWalletAdapter } from "@tiplink/wallet-adapter";

export const tiplinkWalletAdpater = new TipLinkWalletAdapter({ 
  title: "dReader", 
  clientId: process.env.TIPLINK_CLIENT_ID ?? '',
  theme: "dark"
})
