import Language from '@/services/enum/Language'
import getResourceTrackLanguage from '@/util/getResourceTrackLanguage'
import { expect } from 'chai'

describe('util/getResourceTrackLanguage', () => {
  it('getResourceTrackLanguage', () => {
    expect(getResourceTrackLanguage(0)).to.eql([Language.CHINESE, Language.SANSKRIT, Language.GREEK, Language.HEBREW, Language.PERSIAN, Language.SYRIAC])
    expect(getResourceTrackLanguage(1)).to.eql([Language.SANSKRIT, Language.GREEK, Language.HEBREW, Language.PERSIAN, Language.SYRIAC, Language.CHINESE])
    expect(getResourceTrackLanguage(2)).to.eql([Language.GREEK, Language.HEBREW, Language.PERSIAN, Language.SYRIAC, Language.CHINESE, Language.SANSKRIT])
    expect(getResourceTrackLanguage(3)).to.eql([Language.HEBREW, Language.PERSIAN, Language.SYRIAC, Language.CHINESE, Language.SANSKRIT, Language.GREEK])
    expect(getResourceTrackLanguage(4)).to.eql([Language.PERSIAN, Language.SYRIAC, Language.CHINESE, Language.SANSKRIT, Language.GREEK, Language.HEBREW])
    expect(getResourceTrackLanguage(5)).to.eql([Language.SYRIAC, Language.CHINESE, Language.SANSKRIT, Language.GREEK, Language.HEBREW, Language.PERSIAN])
  })
})
