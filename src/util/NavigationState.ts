import { BotPersistence, BotResources, State } from '@/store/state'
import { RouteLocation } from 'vue-router'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import CardDeck from '@/services/CardDeck'
import getDifficultyLevelSettings from './getDifficultyLevelSettings'
import Player from '@/services/enum/Player'
import BotActions from '@/services/BotActions'

export default class NavigationState {

  readonly turn : number
  readonly player : Player
  readonly action : number
  readonly cardDeck: CardDeck
  readonly botActions? : BotActions
  readonly botResources : BotResources

  constructor(route: RouteLocation, state: State) {    
    this.turn = getIntRouteParam(route, 'turn')
    this.player = (route.name == 'TurnBot' || route.name == 'TurnBotAction') ? Player.BOT : Player.PLAYER
    this.action = getIntRouteParam(route, 'action')

    const lastTurn = (route.name == 'GameEnd')
    const botPersistence = getBotPersistence(state, this.turn, lastTurn)
    this.cardDeck = CardDeck.fromPersistence(botPersistence.cardDeck)

    if (this.player == Player.BOT) {
      this.botActions = BotActions.drawCard(this.cardDeck, botPersistence.botResources)
      this.botResources = this.botActions.newBotResources
    }
    else {
      this.botResources = botPersistence.botResources
    }
  }

}

function getBotPersistence(state: State, turn: number, lastTurn: boolean) : BotPersistence {
  return getLastBotPersistence(state, turn, lastTurn)
    ?? {
      cardDeck: state.setup.initialCardDeck ?? CardDeck.new().toPersistence(),
      botResources: {
        resourceTrack: 0,
        resourceTrackBenefitsClaimed: 0,
        diceSum: getDifficultyLevelSettings(state.setup.difficultyLevel).startingDiceSum
      }
    }
}

function getLastBotPersistence(state: State, turn: number, lastTurn: boolean) : BotPersistence | undefined {
  return state.turns
      .toSorted((item1,item2) => item1.turn - item2.turn)
      .findLast(item => (item.turn < turn) || lastTurn)?.botPersistence
}
