import CardDeck from '@/services/CardDeck'
import { BotPersistence, BotResources } from '@/store/state'
import mockCardDeck from './mockCardDeck'

export default function mockBotPersistence(params?: MockBotPersistenceParams) : BotPersistence {  
  return {
    cardDeck: (params?.cardDeck ?? mockCardDeck()).toPersistence(),
    botResources: params?.botResources ?? { resourceTrack: 0, diceSum: 0}
  }
}

export interface MockBotPersistenceParams {
  cardDeck?: CardDeck
  botResources?: BotResources
}
