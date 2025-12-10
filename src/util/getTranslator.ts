/**
 * Get preferred translator.
 * @param resourceTrack Resource track position
 * @returns Translator numbers
 */
export default function getTranslator(resourceTrack : number) : number[] {
  const possiblePositions = [0,1,2,3,4,5,6,7]
  const startIndex = possiblePositions.indexOf(resourceTrack)
  return [...possiblePositions.slice(startIndex), ...possiblePositions.slice(0, startIndex)]
}
