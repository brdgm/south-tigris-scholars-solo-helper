import Benefit from '@/services/enum/Benefit'

/**
 * Get resource track benefit when wrapping over.
 * @param resourceTrackBenefitsClaimed Number of resource track benefits claimed
 * @returns Resource track benefit
 */
export default function getResourceTrackBenefit(resourceTrackBenefitsClaimed: number) : Benefit|undefined {
  switch (resourceTrackBenefitsClaimed) {
    case 0:
      return Benefit.INFLUENCE_PURPLE
    case 1:
    case 3:
    case 5:
      return Benefit.TRANSLATOR_PUT_GOLD
    case 2:
      return Benefit.INFLUENCE_ORANGE
    case 4:
      return Benefit.INFLUENCE_GREEN
    default:
      return undefined
  }
}
