import getTranslatorRoom from '@/util/getTranslatorRoom'
import { expect } from 'chai'

describe('util/getTranslatorRoom', () => {
  it('getTranslatorRoom', () => {
    expect(getTranslatorRoom(0)).to.eql([0,1,2,3,4])
    expect(getTranslatorRoom(1)).to.eql([1,2,3,4,0])
    expect(getTranslatorRoom(2)).to.eql([2,3,4,0,1])
    expect(getTranslatorRoom(3)).to.eql([3,4,0,1,2])
    expect(getTranslatorRoom(4)).to.eql([4,0,1,2,3])
  })
})
