import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Language from '@/services/enum/Language'

/**
 * Get settings for difficulty level.
 * @param difficultyLevel Difficulty level
 * @returns Difficulty level settings
 */
export default function getDifficultyLevelSettings(difficultyLevel : DifficultyLevel) : DifficultyLevelSettings {
  switch (difficultyLevel) {
    case DifficultyLevel.LEVEL_1:
      return { startingDiceSum: -2 }
    case DifficultyLevel.LEVEL_2:
      return { startingDiceSum: 0, startingScrollCard: Language.PERSIAN }
    case DifficultyLevel.LEVEL_3:
      return { startingDiceSum: 1, startingScrollCard: Language.GREEK, influencePurpleGuildScrollCard: 1, goldOnLeftMostTranslatorCount: 1 }
    case DifficultyLevel.LEVEL_4:
      return { startingDiceSum: 3, startingScrollCard: Language.CHINESE, influenceOrangeGuild: 1,
        influencePurpleGuildScrollCard: 1, influenceScrollCardNeutralMarker: 1, goldOnLeftMostTranslatorCount: 2 }
    default:
      throw new Error(`Invalid difficulty level: ${difficultyLevel}`)
  }
}

export interface DifficultyLevelSettings {
  startingDiceSum: number
  startingScrollCard?: Language
  influenceOrangeGuild?: number
  influencePurpleGuildScrollCard?: number
  influenceScrollCardNeutralMarker?: number
  goldOnLeftMostTranslatorCount?: number
}
