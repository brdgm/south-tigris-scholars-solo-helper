import Action from './enum/Action'
import CardColor from './enum/CardColor'

export default interface Card {
  id: number
  cardColor: CardColor
  silverValue: number
  actions: Action[]
}
