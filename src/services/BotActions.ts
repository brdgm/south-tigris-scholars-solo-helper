import { BotResources } from '@/store/state'
import CardDeck from './CardDeck'
import Action from './enum/Action'
import Benefit from './enum/Benefit'
import getResourceTrackBenefit from '@/util/getResourceTrackBenefit'

/**
 * Bot actions derived from scheme card deck.
 */
export default class BotActions {

  public readonly actions : Action[]
  public readonly benefit? : Benefit
  public readonly newBotResources : BotResources
  
  private constructor(actions : Action[], benefit: Benefit|undefined, newBotResources : BotResources) {
    this.actions = actions
    this.benefit = benefit
    this.newBotResources = newBotResources
  }

  public static drawCard(cardDeck : CardDeck, botResources : BotResources) : BotActions {
    // draw card
    const card = cardDeck.draw()

    // resource track advancements
    const advanceSteps = card.silverValue
    const oldResourceTrack = botResources.resourceTrack
    let newResourceTrack = oldResourceTrack + advanceSteps

    // benefits from resource track and drawn card
    let resourceTrackBenefitsClaimed = botResources.resourceTrackBenefitsClaimed
    const benefit = getResourceTrackBenefit(oldResourceTrack, advanceSteps, resourceTrackBenefitsClaimed)
    if (benefit) {
      resourceTrackBenefitsClaimed++
    }
    
    if (newResourceTrack > 5) {
      newResourceTrack -= 6
    }

    return new BotActions(card.actions, benefit, {
      resourceTrack: newResourceTrack,
      resourceTrackBenefitsClaimed,
      diceSum: botResources.diceSum
    })
  }

}
