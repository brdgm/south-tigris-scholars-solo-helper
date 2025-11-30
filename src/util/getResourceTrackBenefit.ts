import ResourceTrackBenefit from '@/services/enum/ResourceTrackBenefit'

/**
 * Get resource track benefit when wrapping over.
 * @param resourceTrackBenefitsClaimed Number of resource track benefits claimed
 * @returns Resource track benefit
 */
export default function getResourceTrackBenefit(resourceTrackBenefitsClaimed: number) : ResourceTrackBenefit|undefined {
  switch (resourceTrackBenefitsClaimed) {
    case 0:
      return ResourceTrackBenefit.INFLUENCE_PURPLE
    case 1:
    case 3:
    case 5:
      return ResourceTrackBenefit.TRANSLATOR_PUT_GOLD
    case 2:
      return ResourceTrackBenefit.INFLUENCE_ORANGE
    case 4:
      return ResourceTrackBenefit.INFLUENCE_GREEN
    default:
      return undefined
  }
}
