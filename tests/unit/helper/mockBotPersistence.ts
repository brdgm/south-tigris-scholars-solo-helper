import CardDeck from '@/services/CardDeck'
import { BotPersistence } from '@/store/state'
import mockCardDeck from './mockCardDeck'

export default function mockBotPersistence(params?: MockBotPersistenceParams) : BotPersistence {  
  return {
    cardDeck: (params?.cardDeck ?? mockCardDeck()).toPersistence(),
    botResources: {
      resourceTrack: params?.resourceTrack ?? 0,
      resourceTrackBenefitsClaimed: params?.resourceTrackBenefitsClaimed ?? 0,
      diceSum: params?.diceSum ?? 0
    }
  }
}

export interface MockBotPersistenceParams {
  cardDeck?: CardDeck
  resourceTrack?: number
  resourceTrackBenefitsClaimed?: number
  diceSum?: number
}
