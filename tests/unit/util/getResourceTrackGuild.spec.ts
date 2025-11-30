import Guild from '@/services/enum/Guild'
import getResourceTrackGuild from '@/util/getResourceTrackGuild'
import { expect } from 'chai'

describe('util/getResourceTrackGuild', () => {
  it('getResourceTrackGuild', () => {
    expect(getResourceTrackGuild(0)).to.eql([Guild.PURPLE, Guild.ORANGE, Guild.GREEN])
    expect(getResourceTrackGuild(1)).to.eql([Guild.ORANGE, Guild.GREEN, Guild.PURPLE])
    expect(getResourceTrackGuild(2)).to.eql([Guild.GREEN, Guild.PURPLE, Guild.ORANGE])
    expect(getResourceTrackGuild(3)).to.eql([Guild.PURPLE, Guild.ORANGE, Guild.GREEN])
    expect(getResourceTrackGuild(4)).to.eql([Guild.ORANGE, Guild.GREEN, Guild.PURPLE])
    expect(getResourceTrackGuild(5)).to.eql([Guild.GREEN, Guild.PURPLE, Guild.ORANGE])
  })
})
