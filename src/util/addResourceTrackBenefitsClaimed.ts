import { CardAction } from '@/services/Card'
import { BotResources } from '@/store/state'

/**
 * Increment resource track benefits claimed counter.
 * @param botResources Bot resources
 * @param botBenefit Bot benefit obtained (may be undefined)
 * @returns New bot resources
 */
export default function addResourceTrackBenefitsClaimed(botResources: BotResources, botBenefit: CardAction|undefined) : BotResources {
  const { resourceTrackBenefitsClaimed } = botResources
  return {
    resourceTrack: botResources.resourceTrack,
    resourceTrackBenefitsClaimed: botBenefit ? resourceTrackBenefitsClaimed + 1 : resourceTrackBenefitsClaimed,
    diceSum: botResources.diceSum
  }
}
