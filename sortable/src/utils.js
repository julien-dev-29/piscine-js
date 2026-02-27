/**
 * Extracts numeric value from a string like "180 cm" or "80 kg"
 * @param {string|number} value - The value to extract number from
 * @returns {number|null} - The numeric value or null if not parseable
 */
const extractNumber = (value) => {
  if (typeof value === "number") return value
  if (!value || value === "unknown") return null
  const num = parseInt(value.toString().replace(/\D/g, ""), 10)
  return isNaN(num) ? null : num
}

/**
 * Gets the sort value for a hero based on column
 * @param {Object} hero - Hero object
 * @param {string} column - Column name
 * @returns {number|string|null}
 */
const getSortValue = (hero, column) => {
  switch (column) {
    case "id":
      return hero.id

    case "name":
      return hero.name?.toLowerCase() || ""

    case "fullName":
      return (hero.biography?.fullName || hero.name || "").toLowerCase()

    case "powerstats": {
      const stats = hero.powerstats || {}
      return Object.values(stats).reduce((sum, val) => sum + extractNumber(val), 0)
    }

    case "race":
      return (hero.appearance?.race || "").toLowerCase()

    case "gender":
      return (hero.appearance?.gender || "").toLowerCase()

    case "height":
      return extractNumber(hero.appearance?.height?.[1])

    case "weight":
      return extractNumber(hero.appearance?.weight?.[1])

    case "placeOfBirth":
      return (hero.biography?.placeOfBirth || "").toLowerCase()

    case "alignment":
      return (hero.biography?.alignment || "").toLowerCase()

    default:
      return null
  }
}

/**
 * Creates a debounced version of a function
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (fn, delay = 300) => {
  let timeoutId = null
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

/**
 * Calculates pagination indices
 * @param {number} page - Current page number (1-indexed)
 * @param {number} perPage - Items per page
 * @returns {{start: number, end: number}}
 */
export const getPaginationRange = (page, perPage) => {
  const start = perPage * (page - 1)
  const end = start + perPage
  return { start, end }
}

/**
 * Sorts heroes by column
 * @param {Array} heroes - Array of hero objects
 * @param {string} column - Column to sort by
 * @param {string} direction - 'asc' or 'desc'
 * @returns {Array} Sorted heroes array
 */
export const sortHeroes = (heroes, column, direction = "asc") => {
  const isAsc = direction === "asc"

  return [...heroes].sort((a, b) => {
    const valueA = getSortValue(a, column)
    const valueB = getSortValue(b, column)

    if (valueA === null && valueB === null) return 0
    if (valueA === null) return 1
    if (valueB === null) return -1

    let result
    if (typeof valueA === "number" && typeof valueB === "number") {
      result = valueA - valueB
    } else {
      result = String(valueA).localeCompare(String(valueB))
    }

    return isAsc ? result : -result
  })
}
