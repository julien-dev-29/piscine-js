/**
 * Calculates Levenshtein distance between two strings
 * @param {string} a - First string
 * @param {string} b - Second string
 * @returns {number} - Edit distance
 */
const levenshteinDistance = (a, b) => {
  if (a.length === 0) return b.length
  if (b.length === 0) return a.length

  const matrix = []

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i]
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        )
      }
    }
  }

  return matrix[b.length][a.length]
}

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
 * Gets the field value from a hero object based on field name
 * @param {Object} hero - Hero object
 * @param {string} field - Field name
 * @returns {string|number|null}
 */
const getFieldValue = (hero, field) => {
  switch (field) {
    case "name":
      return hero.name || ""

    case "fullName":
      return hero.biography?.fullName || hero.name || ""

    case "powerstats": {
      const stats = hero.powerstats || {}
      return Object.values(stats).reduce((sum, val) => sum + extractNumber(val), 0)
    }

    case "race":
      return hero.appearance?.race || "unknown"

    case "gender":
      return hero.appearance?.gender || "unknown"

    case "height":
      return extractNumber(hero.appearance?.height?.[1])

    case "weight":
      return extractNumber(hero.appearance?.weight?.[1])

    case "placeOfBirth":
      return hero.biography?.placeOfBirth || "unknown"

    case "alignment":
      return hero.biography?.alignment || "unknown"

    default:
      return hero[field] || ""
  }
}

/**
 * Applies a search operator to compare query with field value
 * @param {string|number} value - Field value
 * @param {string} normalizedQuery - Normalized query string
 * @param {string} operator - Operator type
 * @returns {boolean}
 */
const applyOperator = (value, normalizedQuery, operator) => {
  if (value === null || value === undefined) {
    return false
  }

  const stringValue = value.toString().toLowerCase()

  switch (operator) {
    case "include":
      return stringValue.includes(normalizedQuery)

    case "exclude":
      return !stringValue.includes(normalizedQuery)

    case "equal":
      return stringValue === normalizedQuery

    case "notEqual":
      return stringValue !== normalizedQuery

    case "fuzzy": {
      if (typeof value !== "string") {
        return false
      }
      const distance = levenshteinDistance(stringValue, normalizedQuery)
      return distance > 0 && distance <= 3
    }

    case "gt": {
      const queryNum = parseFloat(normalizedQuery)
      if (isNaN(queryNum) || typeof value !== "number") {
        return false
      }
      return value > queryNum
    }

    case "lt": {
      const queryNum = parseFloat(normalizedQuery)
      if (isNaN(queryNum) || typeof value !== "number") {
        return false
      }
      return value < queryNum
    }

    default:
      return stringValue.includes(normalizedQuery)
  }
}

/**
 * Filters heroes by search query on a specific field with operators
 * @param {Array} heroes - Array of hero objects
 * @param {string|Object} options - Search query string or options object
 * @param {string} [options.query] - Search query (when using object format)
 * @param {string} [options.field="name"] - Field to search in (when using object format)
 * @param {string} [options.operator="include"] - Search operator
 * @returns {Array} Filtered heroes array
 */
export const search = (heroes, options) => {
  let query
  let field = "name"
  let operator = "include"

  if (typeof options === "string") {
    query = options
  } else if (options && typeof options === "object") {
    query = options.query
    field = options.field || "name"
    operator = options.operator || "include"
  } else {
    query = null
  }

  if (!query || !heroes) {
    return heroes || []
  }

  const normalizedQuery = query.toLowerCase().trim()

  return heroes.filter((hero) => {
    const value = getFieldValue(hero, field)
    return applyOperator(value, normalizedQuery, operator)
  })
}
