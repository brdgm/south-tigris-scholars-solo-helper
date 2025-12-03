import Action from '@/services/enum/Action'
import Guild from '@/services/enum/Guild'
import getResourceTrackBenefit from '@/util/getResourceTrackBenefit'
import { expect } from 'chai'

describe('util/getResourceTrackBenefit', () => {
  it('getResourceTrackBenefit', () => {
    expect(getResourceTrackBenefit(5,1,0)).to.eql({ action: Action.INFLUENCE, influenceBonus: [Guild.PURPLE] })
    expect(getResourceTrackBenefit(5,1,1)).to.eql({ action: Action.TRANSLATOR_PLACE_GOLD })
    expect(getResourceTrackBenefit(5,1,2)).to.eql({ action: Action.INFLUENCE, influenceBonus: [Guild.ORANGE] })
    expect(getResourceTrackBenefit(5,1,3)).to.eql({ action: Action.TRANSLATOR_PLACE_GOLD })
    expect(getResourceTrackBenefit(5,1,4)).to.eql({ action: Action.INFLUENCE, influenceBonus: [Guild.GREEN] })
    expect(getResourceTrackBenefit(5,1,5)).to.eql({ action: Action.TRANSLATOR_PLACE_GOLD })
    expect(getResourceTrackBenefit(5,1,6)).to.undefined
    expect(getResourceTrackBenefit(4,1,0)).to.undefined
  })
})
