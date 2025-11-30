import ResourceTrackBenefit from '@/services/enum/ResourceTrackBenefit'
import getResourceTrackBenefit from '@/util/getResourceTrackBenefit'
import { expect } from 'chai'

describe('util/getResourceTrackBenefit', () => {
  it('getResourceTrackBenefit', () => {
    expect(getResourceTrackBenefit(0)).to.eq(ResourceTrackBenefit.INFLUENCE_PURPLE)
    expect(getResourceTrackBenefit(1)).to.eq(ResourceTrackBenefit.TRANSLATOR_PUT_GOLD)
    expect(getResourceTrackBenefit(2)).to.eq(ResourceTrackBenefit.INFLUENCE_ORANGE)
    expect(getResourceTrackBenefit(3)).to.eq(ResourceTrackBenefit.TRANSLATOR_PUT_GOLD)
    expect(getResourceTrackBenefit(4)).to.eq(ResourceTrackBenefit.INFLUENCE_GREEN)
    expect(getResourceTrackBenefit(5)).to.eq(ResourceTrackBenefit.TRANSLATOR_PUT_GOLD)
    expect(getResourceTrackBenefit(6)).to.eq(undefined)
  })
})
