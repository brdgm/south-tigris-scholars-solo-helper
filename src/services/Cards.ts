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
    cardColor: SchemeCardColor.BLUE,
    silverValue: 0,
    actions: [
      Action.TRANSLATOR_PLACE_GOLD_SILVER_2_IF_7_TRANSLATORS,
      Action.TRANSLATOR_EMPLOY
    ]
  },
  {
    id: 2,
    cardColor: SchemeCardColor.BLUE,
    silverValue: 1,
    actions: [
      Action.TRANSLATE_IF_5_SCROLLS,
      Action.TRAVEL_INFLUENCE_1_2
    ]
  },
  {
    id: 3,
    cardColor: SchemeCardColor.BLUE,
    silverValue: 2,
    actions: [
      Action.TRANSLATE_IF_3_SCROLLS,
      Action.TRAVEL_INFLUENCE_2
    ]
  },
  {
    id: 4,
    cardColor: SchemeCardColor.RED,
    silverValue: 0,
    actions: [
      Action.TRANSLATE_IF_3_SCROLLS,
      Action.TRAVEL_INFLUENCE_2_SILVER_1
    ]
  },
  {
    id: 5,
    cardColor: SchemeCardColor.RED,
    silverValue: 1,
    actions: [
      Action.PLACE_INFLUENCE_TRANSLATOR_PLACE_GOLD_IF_5_TRANSLATORS,
      Action.TRANSLATOR_EMPLOY_SILVER_2
    ]
  },
  {
    id: 6,
    cardColor: SchemeCardColor.RED,
    silverValue: 2,
    actions: [
      Action.INFLUENCE_CARD_PLACE_INFLUENCE_IF_6_TRANSLATORS,
      Action.TRANSLATOR_EMPLOY
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
