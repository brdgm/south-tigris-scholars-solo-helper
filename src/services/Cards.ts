import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import Card from './Card'
import Action from './enum/Action'
import SchemeCardColor from './enum/SchemeCardColor'

/**
 * Scheme cards
 */
const cards : Card[] = [
  {
    id: 1,
    color: SchemeCardColor.BLUE,
    silverValue: 0,
    actions: [
      { action: Action.TRANSLATOR_PLACE_GOLD, requireEmployedTranslators: 7, silverBonus: 2},
      { action: Action.TRANSLATOR_EMPLOY }
    ]
  },
  {
    id: 2,
    color: SchemeCardColor.BLUE,
    silverValue: 1,
    actions: [
      { action: Action.TRANSLATE, requireScrollCardsHouseOfWisdom: 5 },
      { action: Action.TRAVEL, travelInfluence: [1,2] }
    ]
  },
  {
    id: 3,
    color: SchemeCardColor.BLUE,
    silverValue: 2,
    actions: [
      { action: Action.TRANSLATE, requireScrollCardsHouseOfWisdom: 3 },
      { action: Action.TRAVEL, travelInfluence: [2] }
    ]
  },
  {
    id: 4,
    color: SchemeCardColor.RED,
    silverValue: 0,
    actions: [
      { action: Action.TRANSLATE, requireScrollCardsHouseOfWisdom: 3 },
      { action: Action.TRAVEL, travelInfluence: [2], silverBonus: 1 }
    ]
  },
  {
    id: 5,
    color: SchemeCardColor.RED,
    silverValue: 1,
    actions: [
      { action: Action.TRANSLATOR_PLACE_GOLD, requireEmployedTranslators: 5, anyInfluenceBonus: true },
      { action: Action.TRANSLATOR_EMPLOY, silverBonus: 2 }
    ]
  },
  {
    id: 6,
    color: SchemeCardColor.RED,
    silverValue: 2,
    actions: [
      { action: Action.INFLUENCE_CARD, requireEmployedTranslators: 6, anyInfluenceBonus: true },
      { action: Action.TRANSLATOR_EMPLOY }
    ]
  },
]

const cardsMap = new Map<number,Card>()
for (const card of cards) {
  cardsMap.set(card.id, card)
}

export default {

  /**
   * Get card by ID
   * @param id ID
   * @returns Card
   */
  get(id: number) : Card {
    return findMandatory(cardsMap, id)
  },

  /**
   * Get all cards
   * @param cardType Card type
   * @returns Cards
   */
  getAll() : Card[] {
    return cards
  }

}
