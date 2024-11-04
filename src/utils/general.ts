import { VersionedTransaction, Transaction } from '@solana/web3.js'
import { RoutePath } from '@/utils/enums'
import { CarouselSlide } from '@/models/carousel/carouselSlide'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { JwtPayload } from '@/models/auth'
import { JsonMetadata } from '@metaplex-foundation/js'
import { RARITY_TRAIT, SIGNED_TRAIT, USED_TRAIT } from '../constants/general'
import { ComicRarity } from '@/utils/enums'
import { isNil } from 'lodash'
import { StatefulCover } from '@/models/comicIssue/statefulCover'
import { StatelessCover } from '@/models/comicIssue/statelessCover'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// numbers
const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export const formatUSD = (value: number) => {
  return usdFormatter.format(value)
}

export const formatPercentage = (value: number): string => {
  return value.toString() + '%'
}

export const roundNumber = (number: number | null, maxDecimals = 1) => {
  if (!number) return number
  const decimalUnits = Math.pow(10, maxDecimals)
  return Math.round(number * decimalUnits) / decimalUnits
}

export const formatNumberWithCommas = (num: number): string => {
  return num.toLocaleString()
}

// queries
export const generateQueryParamsArray = (params: Array<object>, queryKey: string): Record<string, string> =>
  params.reduce((prev, curr, index) => {
    return { ...prev, [`${queryKey}[${index}]`]: JSON.stringify(curr) }
  }, {}) as Record<string, string>

export const generateMinLengthErrorMessage = (name: string, minLength: string | number) =>
  `Max length for ${name} is ${minLength} characters`

export const generateMaxLengthErrorMessage = (name: string, maxLength: string | number) =>
  `Max length for ${name} is ${maxLength} characters`

// transactions
export function decodeBs58(encodedString: string) {
  return new TextEncoder().encode(encodedString)
}

export function decodeBs64(encodedString: string) {
  return Buffer.from(encodedString, 'base64')
}

export function txFromBs58(encodedString: string) {
  return Transaction.from(decodeBs58(encodedString))
}

export function txFromBs64(encodedString: string) {
  return Transaction.from(decodeBs64(encodedString))
}

// fix
export function versionedTransactionFromBs64(encodedString: string) {
  return VersionedTransaction.deserialize(decodeBs64(encodedString))
}

export type SupportedEncoding = 'base58' | 'base64'
export const decodeTransaction = (encodedTransaction: string, encoding: SupportedEncoding = 'base64') => {
  if (encoding === 'base58') {
    return txFromBs58(encodedTransaction)
  } else if (encoding === 'base64') {
    return txFromBs64(encodedTransaction)
  } else {
    throw new Error('Unsupported encoding format, base58 and base64 supported')
  }
}

// helpers
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * @param string string to shorten
 * @param slice size of a slice
 * @returns short version of the string in a format '[slice]...[slice]'
 */
export const shortenString = (string: string, slice = 4): string => {
  if (string.length < slice * 2 + 3) return string
  return `${string.slice(0, slice)}..${string.slice(-slice)}`
}

export function formatPrice(price: number) {
  return price ? price / LAMPORTS_PER_SOL : price
}

export const pluralizeString = (count: number, value: string) => (count > 1 ? `${value}s` : value)

export const shortenSolanaAddress = ({ address, slice = 4 }: { address: string; slice?: number }) =>
  address.slice(0, slice) + '...' + address.slice(-slice)

export const shortenAssetName = (name: string): string => {
  const splitted = name.split('#')
  const last = splitted.at(splitted.length - 1)
  return `#${last}`
}

export const getSlideFallbackUrl = (slide: CarouselSlide): string => {
  if (slide.comicIssueId) return RoutePath.Mint(slide.comicIssueId)
  else if (slide.creatorSlug) return RoutePath.Creator(slide.creatorSlug)
  else if (slide.comicSlug) return RoutePath.Comic(slide.comicSlug)
  else return slide.externalLink ?? ''
}

// objects
export const getKeys = Object.keys as <T extends object>(object: T) => Array<keyof T>

/**
 * Returns a JS object representation of a Javascript Web Token from its common encoded
 * string form.
 *
 * @template T the expected shape of the parsed token
 * @param {string} token a Javascript Web Token in base64 encoded, `.` separated form
 * @returns {(T | undefined)} an object-representation of the token
 * or undefined if parsing failed
 */
export function parseJwtPayload<T extends object = { [k: string]: string | number }>(token: string): JwtPayload<T> {
  try {
    const base64Payload = token.split('.')[1]
    const base64 = base64Payload.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = JSON.parse(
      decodeURIComponent(
        atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          })
          .join('')
      )
    )

    return jsonPayload
  } catch {
    throw new Error('Invalid session token')
  }
}

// asset metadata
const findTrait = (jsonMetadata: JsonMetadata, traitType: string) => {
  const trait = jsonMetadata.attributes?.find((a) => a.trait_type === traitType)

  if (isNil(trait)) return undefined
  return trait
}

export const findUsedTrait = (jsonMetadata: JsonMetadata) => findTrait(jsonMetadata, USED_TRAIT)?.value === 'true'

export const findSignedTrait = (jsonMetadata: JsonMetadata) => findTrait(jsonMetadata, SIGNED_TRAIT)?.value === 'true'

export const findRarityTrait = (jsonMetadata: JsonMetadata): ComicRarity | undefined => {
  const rarityTrait = findTrait(jsonMetadata, RARITY_TRAIT)?.value as ComicRarity
  return rarityTrait ? ComicRarity[rarityTrait] : undefined
}

export const fetchOffChainMetadata = async (uri: string) => {
  return (await fetch(uri)).json()
}

// covers
export const statelessCoverToStatefulCovers = (cover: StatelessCover): StatefulCover[] => {
  return [
    {
      rarity: cover.rarity,
      artist: cover.artist,
      isSigned: false,
      isUsed: false,
      image: cover.image,
    },
    {
      rarity: cover.rarity,
      artist: cover.artist,
      isSigned: false,
      isUsed: true,
      image: cover.image,
    },
    {
      rarity: cover.rarity,
      artist: cover.artist,
      isSigned: true,
      isUsed: false,
      image: cover.image,
    },
    {
      rarity: cover.rarity,
      artist: cover.artist,
      isSigned: true,
      isUsed: true,
      image: cover.image,
    },
  ]
}

export const statelessCoversToStatefulCovers = (covers: StatelessCover[]): StatefulCover[] => {
  return covers.reduce<StatefulCover[]>((acc, cover) => {
    return acc.concat(statelessCoverToStatefulCovers(cover))
  }, [])
}
