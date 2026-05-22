export function getColumnStats<T>(
  rows: T[],
  accessor: (row: T) => number
) {
  const values = rows
    .map(accessor)
    .filter((v) => Number.isFinite(v))
    .sort((a, b) => a - b)

  const min = values[0]
  const max = values[values.length - 1]

  const middle = Math.floor(values.length / 2)

  const median =
    values.length % 2 === 0
      ? (values[middle - 1] + values[middle]) / 2
      : values[middle]

  return {
    min,
    max,
    median,
  }
}