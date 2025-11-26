import CardDeck from '@/services/CardDeck'
import { expect } from 'chai'

describe('services/CardDeck', () => {
  it('new', () => {
    const deck = CardDeck.new()

    expect(deck.currentCard, 'actionCard').to.undefined
    expect(deck.pile.length, 'pile').to.eq(6)
    expect(deck.discard.length, 'discard').to.eq(0)

    const persistence = deck.toPersistence()
    expect(persistence.pile.length, 'pile').to.eq(6)
    expect(persistence.discard.length, 'discard').to.eq(0)
  })

  it('draw', () => {
    const deck = CardDeck.fromPersistence({pile: [1,2,5,6,3], discard: [4]})

    expect(deck.currentCard?.id).to.eq(4)  // red
    expect(deck.isRest).to.eq(false)

    deck.draw()
    expect(deck.currentCard?.id).to.eq(1)  // blue
    expect(deck.isRest).to.eq(false)

    deck.draw()
    expect(deck.currentCard?.id).to.eq(2)  // blue
    expect(deck.isRest).to.eq(false)

    deck.draw()
    expect(deck.currentCard?.id).to.eq(5)  // red
    expect(deck.isRest).to.eq(false)

    deck.draw()
    expect(deck.currentCard?.id).to.eq(6)  // red
    expect(deck.isRest).to.eq(true)
  })

  it('shuffle', () => {
    const deck = CardDeck.fromPersistence({pile: [5,6,3], discard: [4,1,2]})

    deck.shuffle()

    expect(deck.currentCard, 'actionCard').to.undefined
    expect(deck.pile.length, 'pile').to.eq(6)
    expect(deck.discard.length, 'discard').to.eq(0)
  })

})
