import Guild from '@/services/enum/Guild'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'

/**
 * Get color priorities from current resource track position.
 * @param resourceTrack Resource track position
 * @returns Color priority
 */
export default function getResourceTrackGuild(resourceTrack : number) : Guild[] {
  switch (resourceTrack) {
    case 0:
    case 3:
      return getGuildsStartingWith(Guild.PURPLE)
    case 1:
    case 4:
      return getGuildsStartingWith(Guild.ORANGE)
    case 2:
    case 5:
      return getGuildsStartingWith(Guild.GREEN)
    default:
      throw new Error(`Invalid resource track position: ${resourceTrack}`)
  }
}

function getGuildsStartingWith(guild: Guild): Guild[] {
  const guildsInOrder : Guild[] = getAllEnumValues(Guild).filter(g => g !== Guild.ANY)
  const startIndex = guildsInOrder.indexOf(guild)
  return [...guildsInOrder.slice(startIndex), ...guildsInOrder.slice(0, startIndex)]
}
