import Action from '@/services/enum/Action'
import addResourceTrackBenefitsClaimed from '@/util/addResourceTrackBenefitsClaimed'
import { expect } from 'chai'

describe('util/addResourceTrackBenefitsClaimed', () => {
  it('addResourceTrackBenefitsClaimed', () => {
    expect(addResourceTrackBenefitsClaimed({resourceTrack: 4, resourceTrackBenefitsClaimed:1, diceSum:-1}, undefined))
        .to.eql({resourceTrack: 4, resourceTrackBenefitsClaimed:1, diceSum:-1})
    expect(addResourceTrackBenefitsClaimed({resourceTrack: 4, resourceTrackBenefitsClaimed:1, diceSum:-1}, {action: Action.SILVER, silverBonus: 2}))
        .to.eql({resourceTrack: 4, resourceTrackBenefitsClaimed:2, diceSum:-1})
  })
})
