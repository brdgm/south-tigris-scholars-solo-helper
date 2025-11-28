import { BotPersistence, Turn } from '@/store/state'
import mockBotPersistence from './mockBotPersistence'
import Player from '@/services/enum/Player'

export default function mockTurn(params?: MockTurnParams) : Turn {
  return {
    turn: params?.turn ?? 1,
    player: params?.player ?? Player.PLAYER,
    botPersistence: params?.botPersistence ?? mockBotPersistence()
  }
}

export interface MockTurnParams {
  round? : number
  turn? : number
  player?: Player
  botPersistence?: BotPersistence
}
