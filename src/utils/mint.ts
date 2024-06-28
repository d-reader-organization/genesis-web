import { CandyMachine } from '@/models/candyMachine'
import { CandyMachineGroupWithSource, WhiteListType } from '@/models/candyMachine/candyMachineGroup'

export const validateMintEligibilty = (group: CandyMachineGroupWithSource | undefined) => {
  let isMintLimitReached, isEligible

  if (group?.whiteListType == WhiteListType.Public || group?.whiteListType == WhiteListType.WalletWhiteList) {
    isMintLimitReached = group?.mintLimit && group?.wallet.itemsMinted && group?.mintLimit <= group?.wallet.itemsMinted
    isEligible = group?.wallet.isEligible
  } else {
    isMintLimitReached = group?.mintLimit && group?.user.itemsMinted && group?.mintLimit <= group?.user.itemsMinted
    isEligible = group?.user.isEligible
  }

  if (isMintLimitReached) return { isEligible: false, error: `Your Mint Limit Reached.` }
  else if (!isEligible) return { isEligible: false, error: `Not Eligible` }

  return { isEligible: true }
}

export const getActiveGroup = (candyMachineData: CandyMachine | undefined) => {
  return candyMachineData?.groups.find((group) => {
    const startDate = new Date(group.startDate)
    const endDate = new Date(group.endDate)
    const currentDate = new Date(new Date().toUTCString())

    return startDate <= currentDate && currentDate <= endDate
  })
}
