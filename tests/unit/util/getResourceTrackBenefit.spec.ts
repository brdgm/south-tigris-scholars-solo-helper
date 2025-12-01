import Benefit from '@/services/enum/Benefit'
import getResourceTrackBenefit from '@/util/getResourceTrackBenefit'
import { expect } from 'chai'

describe('util/getResourceTrackBenefit', () => {
  it('getResourceTrackBenefit', () => {
    expect(getResourceTrackBenefit(5,1,0)).to.eq(Benefit.INFLUENCE_PURPLE)
    expect(getResourceTrackBenefit(5,1,1)).to.eq(Benefit.TRANSLATOR_PUT_GOLD)
    expect(getResourceTrackBenefit(5,1,2)).to.eq(Benefit.INFLUENCE_ORANGE)
    expect(getResourceTrackBenefit(5,1,3)).to.eq(Benefit.TRANSLATOR_PUT_GOLD)
    expect(getResourceTrackBenefit(5,1,4)).to.eq(Benefit.INFLUENCE_GREEN)
    expect(getResourceTrackBenefit(5,1,5)).to.eq(Benefit.TRANSLATOR_PUT_GOLD)
    expect(getResourceTrackBenefit(5,1,6)).to.undefined
    expect(getResourceTrackBenefit(4,1,0)).to.undefined
  })
})
