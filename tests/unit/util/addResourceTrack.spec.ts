import addResourceTrack from '@/util/addResourceTrack'
import { expect } from 'chai'

describe('util/addResourceTrack', () => {
  it('addResourceTrack', () => {
    expect(addResourceTrack({resourceTrack: 4, resourceTrackBenefitsClaimed:1, diceSum:-1}, 1)).to.eql({resourceTrack: 5, resourceTrackBenefitsClaimed:1, diceSum:-1})
    expect(addResourceTrack({resourceTrack: 4, resourceTrackBenefitsClaimed:1, diceSum:-1}, 2)).to.eql({resourceTrack: 0, resourceTrackBenefitsClaimed:1, diceSum:-1})
  })
})
