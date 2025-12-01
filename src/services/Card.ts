import Action from './enum/Action'
import SchemeCardColor from './enum/SchemeCardColor'

export default interface Card {
  id: number
  color: SchemeCardColor
  silverValue: number
  actions: CardAction[]
}

export interface CardAction {
  action: Action
  silverBonus?: number
  anyInfluenceBonus?: boolean
  requireEmployedTranslators?: number
  requireScrollCardsHouseOfWisdom?: number
  travelInfluence?: number[]
}
