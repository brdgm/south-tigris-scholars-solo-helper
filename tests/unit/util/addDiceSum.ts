import addDiceSum from '@/util/addDiceSum'
import { expect } from 'chai'

describe('util/addDiceSum', () => {
  it('addDiceSum', () => {
    expect(addDiceSum({resourceTrack: 4, resourceTrackBenefitsClaimed:1, diceSum:-1}, 1)).to.eql({resourceTrack: 4, resourceTrackBenefitsClaimed:1, diceSum:0})
    expect(addDiceSum({resourceTrack: 4, resourceTrackBenefitsClaimed:1, diceSum:-1}, 2)).to.eql({resourceTrack: 4, resourceTrackBenefitsClaimed:1, diceSum:1})
    expect(addDiceSum({resourceTrack: 4, resourceTrackBenefitsClaimed:1, diceSum:5}, 2)).to.eql({resourceTrack: 4, resourceTrackBenefitsClaimed:1, diceSum:6})
    expect(addDiceSum({resourceTrack: 4, resourceTrackBenefitsClaimed:1, diceSum:-4}, -10)).to.eql({resourceTrack: 4, resourceTrackBenefitsClaimed:1, diceSum:-6})
  })
})
