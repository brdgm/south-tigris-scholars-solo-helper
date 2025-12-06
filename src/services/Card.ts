import Action from './enum/Action'
import Guild from './enum/Guild'
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
  influenceBonus?: Guild[]
  requireEmployedTranslators?: number
  requireScrollCardsHouseOfWisdom?: number
  travelInfluence?: number[]
  retireTranslator?: number
  pageCard?: boolean
  diceSumModifier?: number
}
