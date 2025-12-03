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
  const newResourceTrack = resourceTrack + resourceTrackAdd
  if (resourceTrack < 6 && newResourceTrack >= 6) {
    switch (resourceTrackBenefitsClaimed) {
      case 0:
        return { action: Action.INFLUENCE, influenceBonus: [Guild.PURPLE] }
      case 1:
      case 3:
      case 5:
        return { action: Action.TRANSLATOR_PLACE_GOLD }
      case 2:
        return { action: Action.INFLUENCE, influenceBonus: [Guild.ORANGE] }
      case 4:
        return { action: Action.INFLUENCE, influenceBonus: [Guild.GREEN] }
      default:
        return undefined
    }
  }
  else {
    return undefined
  }
}
