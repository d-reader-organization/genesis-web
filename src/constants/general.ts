import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { WalletName } from '@solana/wallet-adapter-base'
import { PublicKey } from '@solana/web3.js'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { clusterApiUrl } from '@solana/web3.js'

export const baseApiUrl = `${process.env.NEXT_PUBLIC_API_ENDPOINT}`
export const accessTokenKey = 'access_token'
export const refreshTokenKey = 'refresh_token'
export const googleAccessTokenKey = 'google_access_token'
export const SUCC_RESPONSE_STATUS_CODES = [200, 201]
export const redirectToKey = 'redirectTo'

export const jwtCookieProps: Partial<ResponseCookie> = {
  httpOnly: true,
  secure: true,
  maxAge: 100 * 24 * 60 * 60,
}

export const LOCAL_STORAGE = {
  IS_UNWRAP_HINT_READ: 'is-unwrap-hint-read',
  IS_INVESTMENT_DISCLAIMER_READ: 'is-investment-disclaimer-read',
  IS_MINT_PAGE_VISITED: 'is-mint-page-visited',
  IS_CLAIM_HINT_READ: 'is-claim-hint-read',
  IS_CLAIM_WALKTHROUGH_COMPELETE: 'is-claim-walkthrough-compelete',
}

// links
export const TWITTER_LINK = 'https://x.com/dReaderApp'
export const DISCORD_LINK = 'https://discord.gg/PBW84NaEE2'
export const GOOGLE_PLAY_LINK = 'https://play.google.com/store/apps/details?id=io.app.dreader'
export const INSTAGRAM_LINK = 'https://www.instagram.com/d_reader_app'
export const TENSOR_LINK = 'https://www.tensor.trade/creator/dreader'
export const GOOGLE_PLAY_APP_LINK = 'https://play.google.com/store/apps/details?id=io.app.dreader'
export const LINKTREE_LINK = 'https://dreader.io/links'
export const D_PUBLISHER_LINK = 'https://www.dpublisher.app'
export const D_READER_LINK = 'https://www.dreader.app'
export const SUPPORT_EMAIL = 'support@dreader.io'
export const SUPPORT_LINK = 'mailto:' + SUPPORT_EMAIL

// metadata
export const METADATA_IMAGE_SIZE = { width: 1200, height: 630 }

// wallet
export const WALLET_LABELS = {
  'change-wallet': 'Change wallet',
  connecting: 'Connecting',
  'copy-address': 'Copy address',
  copied: 'Copied',
  disconnect: 'Disconnect',
  'has-wallet': 'Connect',
  'no-wallet': 'Connect',
} as const

export const LEDGER_ADAPTERS = {
  SOLFLARE: {
    NAME: 'Solflare Ledger' as WalletName<'Solflare'>,
    URL: 'https://docs.solflare.com/solflare/onboarding/mobile/connect-a-ledger-wallet',
  },
  PHANTOM: {
    NAME: 'Phantom Ledger' as WalletName<'Phantom'>,
    URL: 'https://help.phantom.app/hc/en-us/articles/4406388670483-How-to-use-your-Ledger-Nano-hardware-wallet',
  },
} as const

export const MEMO_PROGRAM_ID = new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr')

export const MONSTER_CLAIM_QR_SLUG = 'mark-spears-monsters'

export const payoutDetails: string =
  '*Previous payouts are not indicative of future results, and no representation is made that any investment will or is likely to achieve profits or losses similar to those discussed on this website. All investments involve risks, and the value of investments may fluctuate over time.'

export const roiTooltip = (roiPercent: number) =>
  `This means that the issuer returned 100% of the initial investment amount for each investor plus ${roiPercent}% of that initial investment. So if an  investor invested $100, the issuer returned $100 + $${roiPercent} which equals $${100 + roiPercent}.`

// Solana RPC Node Endpoint
export const endpoint = (process.env.NEXT_PUBLIC_SOLANA_RPC_NODE_ENDPOINT as string) || clusterApiUrl('devnet')
export const network = (process.env.NEXT_PUBLIC_SOLANA_CLUSTER as WalletAdapterNetwork) || WalletAdapterNetwork.Devnet
