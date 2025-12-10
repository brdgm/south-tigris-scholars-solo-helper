/**
 * Get preferred translator rooms based on their costs.
 * @param silverValueSum Silver value sum from card deck
 * @returns Translator room costs
 */
export default function getTranslatorRoom(silverValueSum : number) : number[] {
  const possiblePositions = [0,1,2,3,4]
  const startIndex = possiblePositions.indexOf(silverValueSum)
  return [...possiblePositions.slice(startIndex), ...possiblePositions.slice(0, startIndex)]
}
