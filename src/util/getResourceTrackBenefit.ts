import Benefit from '@/services/enum/Benefit'

/**
 * Get resource track benefit when wrapping over.
 * @param resourceTrack Current resource track position
 * @param resourceTrackAdd Steps to add to resource track
 * @param resourceTrackBenefitsClaimed Number of resource track benefits claimed
 * @returns Resource track benefit
 */
export default function getResourceTrackBenefit(resourceTrack: number, resourceTrackAdd: number, resourceTrackBenefitsClaimed: number) : Benefit|undefined {
  const newResourceTrack = resourceTrack + resourceTrackAdd
  if (resourceTrack < 6 && newResourceTrack >= 6) {
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
  else {
    return undefined
  }
}
