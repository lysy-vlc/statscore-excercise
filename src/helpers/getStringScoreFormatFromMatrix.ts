export function getStringScoreFormatFromMatrix(matrix) {
  const flattenMatrix = matrix.flat()

  return flattenMatrix.join(',')
}
