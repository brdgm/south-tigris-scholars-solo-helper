import { BotResources } from '@/store/state'
import CardDeck from './CardDeck'
import getResourceTrackBenefit from '@/util/getResourceTrackBenefit'
import { CardAction } from './Card'
import Action from './enum/Action'
import SchemeCardColor from './enum/SchemeCardColor'
import Guild from './enum/Guild'

/**
 * Bot actions derived from scheme card deck.
 */
export default class BotActions {

  public readonly actions : CardAction[]
  public readonly benefit? : CardAction
  public readonly newBotResources : BotResources
  public readonly isRest : boolean
  
  private constructor(actions : CardAction[], benefit: CardAction|undefined, newBotResources : BotResources, isRest: boolean) {
    this.actions = actions
    this.benefit = benefit
    this.newBotResources = newBotResources
    this.isRest = isRest
  }

  public static drawCard(cardDeck : CardDeck, botResources : BotResources) : BotActions {
    if (cardDeck.isRest) {
      // resting
      const actions : CardAction[] = []
      switch (cardDeck.discard.length) {
        case 3:
          actions.push({ action: Action.INFLUENCE_CARD, influenceBonus: [Guild.ANY] })
          break
        case 4:
          actions.push({ action: Action.INFLUENCE_CARD })
          break
        case 5:
          actions.push({ action: Action.TRANSLATOR_RETIRE,
            retireTranslator: cardDeck.colorMajority == SchemeCardColor.BLUE ? 6 : 7 })
          break
      }
      cardDeck.shuffle()
      return new BotActions(actions, undefined, botResources, true)
    }
    else {
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
        diceSum: botResources.diceSum,
      }, false)
    }
  }

}
