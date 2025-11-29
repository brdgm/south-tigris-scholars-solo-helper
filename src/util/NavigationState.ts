import { BotPersistence, BotResources, State } from '@/store/state'
import { RouteLocation } from 'vue-router'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import CardDeck from '@/services/CardDeck'
import { cloneDeep } from 'lodash'
import getDifficultyLevelSettings from './getDifficultyLevelSettings'
import Player from '@/services/enum/Player'

export default class NavigationState {

  readonly turn : number
  readonly player : Player
  readonly action : number
  readonly cardDeck: CardDeck
  readonly botResources : BotResources

  constructor(route: RouteLocation, state: State) {    
    this.turn = getIntRouteParam(route, 'turn')
    this.player = (route.name == 'TurnPlayer') ? Player.PLAYER : Player.BOT
    this.action = getIntRouteParam(route, 'action')

    const lastTurn = (route.name == 'GameEnd')
    const botPersistence = getBotPersistence(state, this.turn, lastTurn)
    this.cardDeck = CardDeck.fromPersistence(botPersistence.cardDeck)
    this.botResources = cloneDeep(botPersistence.botResources)

    if (this.player == Player.BOT) {
      this.cardDeck.draw()
    }
  }

}

function getBotPersistence(state: State, turn: number, lastTurn: boolean) : BotPersistence {
  return getLastBotPersistence(state, turn, lastTurn)
    ?? {
      cardDeck: state.setup.initialCardDeck ?? CardDeck.new().toPersistence(),
      botResources: {
        resourceTrack: 0,
        diceSum: getDifficultyLevelSettings(state.setup.difficultyLevel).startingDiceSum
      }
    }
}

function getLastBotPersistence(state: State, turn: number, lastTurn: boolean) : BotPersistence | undefined {
  return state.turns
      .toSorted((item1,item2) => item1.turn - item2.turn)
      .findLast(item => (item.turn < turn) || lastTurn)?.botPersistence
}
