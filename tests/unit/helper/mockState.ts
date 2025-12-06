import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Expansion from '@/services/enum/Expansion'
import { CardDeckPersistence, State, Turn } from '@/store/state'

export default function mockState(params?: MockStateParams) : State {  
  return {
    language: 'en',
    baseFontSize: 1,
    setup: {
      difficultyLevel: params?.difficultyLevel ?? DifficultyLevel.LEVEL_1,
      expansions: params?.expansions ?? [],
      initialCardDeck: params?.initialCardDeck
    },
    turns: params?.turns ?? []
  }
}

export interface MockStateParams {
  difficultyLevel?: DifficultyLevel
  expansions?: Expansion[]
  initialCardDeck?: CardDeckPersistence
  turns?: Turn[]
}
