import { JsonMetadata } from '@metaplex-foundation/js'
import { RARITY_TRAIT, SIGNED_TRAIT, USED_TRAIT } from '../constants/general'
import { ComicRarity } from '@/enums/comicRarity'
import { isNil } from 'lodash'

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
