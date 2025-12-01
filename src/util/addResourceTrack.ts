import { BotResources } from '@/store/state'

/**
 * Add silver to resource track.
 * @param botResources Bot resources
 * @param value Progress steps
 * @returns New bot resources
 */
export default function addResourceTrack(botResources: BotResources, value: number) : BotResources {
  return {
    resourceTrack: (botResources.resourceTrack + value) % 6,
    resourceTrackBenefitsClaimed: botResources.resourceTrackBenefitsClaimed,
    diceSum: botResources.diceSum
  }
}
