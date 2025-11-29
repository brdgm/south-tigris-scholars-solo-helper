import Action from './enum/Action'
import SchemeCardColor from './enum/SchemeCardColor'

export default interface Card {
  id: number
  cardColor: SchemeCardColor
  silverValue: number
  actions: Action[]
}
