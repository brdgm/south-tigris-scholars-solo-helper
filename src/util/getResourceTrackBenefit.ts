import { CardAction } from '@/services/Card'
import Action from '@/services/enum/Action'
import Guild from '@/services/enum/Guild'

/**
 * Get resource track benefit when wrapping over.
 * @param resourceTrack Current resource track position
 * @param resourceTrackAdd Steps to add to resource track
 * @param resourceTrackBenefitsClaimed Number of resource track benefits claimed
 * @returns Resource track benefit
 */
export default function getResourceTrackBenefit(resourceTrack: number, resourceTrackAdd: number, resourceTrackBenefitsClaimed: number) : CardAction|undefined {
  const oldReachedCount = getBenefitReachedCount(resourceTrack)
  const newReachedCount = getBenefitReachedCount(resourceTrack + resourceTrackAdd)
  if (newReachedCount > oldReachedCount) {
    switch (resourceTrackBenefitsClaimed) {
      case 0:
        return { action: Action.INFLUENCE, influenceBonus: [Guild.PURPLE], pageCard: true }
      case 1:
      case 3:
      case 5:
        return { action: Action.TRANSLATOR_PLACE_GOLD, pageCard: true }
      case 2:
        return { action: Action.INFLUENCE, influenceBonus: [Guild.ORANGE], pageCard: true }
      case 4:
        return { action: Action.INFLUENCE, influenceBonus: [Guild.GREEN], pageCard: true }
      default:
        return undefined
    }
  }
  else {
    return undefined
  }
}

function getBenefitReachedCount(resourceTrack: number) : number {
  return Math.floor(resourceTrack / 6)
}
