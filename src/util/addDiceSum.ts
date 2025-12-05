import { BotResources } from '@/store/state'

/**
 * Move the dice sum marker.
 * @param botResources Bot resources
 * @param value Progress steps (positive or negative)
 * @returns New bot resources
 */
export default function addDiceSum(botResources: BotResources, value: number) : BotResources {
  let diceSum = botResources.diceSum + value
  if (diceSum > 6) {
    diceSum = 6
  }
  if (diceSum < -6) {
    diceSum = -6
  }
  return {
    resourceTrack: botResources.resourceTrack,
    resourceTrackBenefitsClaimed: botResources.resourceTrackBenefitsClaimed,
    diceSum
  }
}
