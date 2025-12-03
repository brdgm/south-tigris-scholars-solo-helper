import BotActions from '@/services/BotActions'
import CardDeck from '@/services/CardDeck'
import Action from '@/services/enum/Action'
import Guild from '@/services/enum/Guild'
import { expect } from 'chai'

describe('services/BotActions', () => {
  it('card-1', () => {
    const deck = CardDeck.fromPersistence({pile: [1,3,5,6], discard: [4]})
    const underTest = BotActions.drawCard(deck, {resourceTrack: 0, resourceTrackBenefitsClaimed:0, diceSum: 0})

    expect(underTest.actions).to.eql([
      { action: Action.TRANSLATOR_PLACE_GOLD, requireEmployedTranslators: 7, silverBonus: 2},
      { action: Action.TRANSLATOR_EMPLOY }
    ])
    expect(underTest.benefit).to.undefined
    expect(underTest.newBotResources).to.eql({resourceTrack: 0, resourceTrackBenefitsClaimed:0, diceSum: 0})
    expect(underTest.isRest).to.false
  })

  it('card-3', () => {
    const deck = CardDeck.fromPersistence({pile: [3,5,6], discard: [1,4]})
    const underTest = BotActions.drawCard(deck, {resourceTrack: 2, resourceTrackBenefitsClaimed:0, diceSum: 1})

    expect(underTest.actions).to.eql([
      { action: Action.TRANSLATE, requireScrollCardsHouseOfWisdom: 3 },
      { action: Action.TRAVEL, travelInfluence: [2] }
    ])
    expect(underTest.benefit).to.undefined
    expect(underTest.newBotResources).to.eql({resourceTrack: 4, resourceTrackBenefitsClaimed:0, diceSum: 1})
    expect(underTest.isRest).to.false
  })

  it('card-6-wrap-over', () => {
    const deck = CardDeck.fromPersistence({pile: [6], discard: [5,3,1,4]})
    const underTest = BotActions.drawCard(deck, {resourceTrack: 5, resourceTrackBenefitsClaimed:2, diceSum: 1})

    expect(underTest.actions).to.eql([
      { action: Action.INFLUENCE_CARD, requireEmployedTranslators: 6, influenceBonus: [Guild.ANY] },
      { action: Action.TRANSLATOR_EMPLOY }
    ])
    expect(underTest.benefit).to.eql({ action: Action.INFLUENCE, influenceBonus: [Guild.ORANGE] })
    expect(underTest.newBotResources).to.eql({resourceTrack: 1, resourceTrackBenefitsClaimed:3, diceSum: 1})
    expect(underTest.isRest).to.false
  })

  it('rest-3', () => {
    const deck = CardDeck.fromPersistence({pile: [6], discard: [1,2,3]})
    const underTest = BotActions.drawCard(deck, {resourceTrack: 5, resourceTrackBenefitsClaimed:2, diceSum: 1})

    expect(underTest.actions).to.eql([
      { action: Action.INFLUENCE_CARD, influenceBonus: [Guild.ANY] }
    ])
    expect(underTest.benefit).to.undefined
    expect(underTest.newBotResources).to.eql({resourceTrack: 5, resourceTrackBenefitsClaimed:2, diceSum: 1})
    expect(underTest.isRest).to.true
  })

  it('rest-4', () => {
    const deck = CardDeck.fromPersistence({pile: [6], discard: [5,1,2,3]})
    const underTest = BotActions.drawCard(deck, {resourceTrack: 5, resourceTrackBenefitsClaimed:2, diceSum: 1})

    expect(underTest.actions).to.eql([
      { action: Action.INFLUENCE_CARD }
    ])
    expect(underTest.benefit).to.undefined
    expect(underTest.newBotResources).to.eql({resourceTrack: 5, resourceTrackBenefitsClaimed:2, diceSum: 1})
    expect(underTest.isRest).to.true
  })

  it('rest-5', () => {
    const deck = CardDeck.fromPersistence({pile: [6], discard: [5,4,1,2,3]})
    const underTest = BotActions.drawCard(deck, {resourceTrack: 5, resourceTrackBenefitsClaimed:2, diceSum: 1})

    expect(underTest.actions).to.eql([
      { action: Action.TRANSLATOR_RETIRE, retireTranslator: 6 }
    ])
    expect(underTest.benefit).to.undefined
    expect(underTest.newBotResources).to.eql({resourceTrack: 5, resourceTrackBenefitsClaimed:2, diceSum: 1})
    expect(underTest.isRest).to.true
  })
})
