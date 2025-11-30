import Language from '@/services/enum/Language'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'

/**
 * Get language priorities from current resource track position.
 * @param resourceTrack Resource track position
 * @returns Language priority
 */
export default function getResourceTrackLanguage(resourceTrack : number) : Language[] {
  if (resourceTrack < 0 || resourceTrack > 5) {
    throw new Error(`Invalid resource track position: ${resourceTrack}`)
  }
  const languagesInOrder = getAllEnumValues(Language)
  return [...languagesInOrder.slice(resourceTrack), ...languagesInOrder.slice(0, resourceTrack)]
}
