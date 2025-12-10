import getTranslator from '@/util/getTranslator'
import { expect } from 'chai'

describe('util/getTranslator', () => {
  it('getTranslator', () => {
    expect(getTranslator(0)).to.eql([0,1,2,3,4,5,6,7])
    expect(getTranslator(1)).to.eql([1,2,3,4,5,6,7,0])
    expect(getTranslator(2)).to.eql([2,3,4,5,6,7,0,1])
    expect(getTranslator(3)).to.eql([3,4,5,6,7,0,1,2])
    expect(getTranslator(4)).to.eql([4,5,6,7,0,1,2,3])
    expect(getTranslator(5)).to.eql([5,6,7,0,1,2,3,4])
    expect(getTranslator(6)).to.eql([6,7,0,1,2,3,4,5])
    expect(getTranslator(7)).to.eql([7,0,1,2,3,4,5,6])
  })
})
