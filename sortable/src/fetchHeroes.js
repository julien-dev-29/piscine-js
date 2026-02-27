const API_URL = "https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json"

/**
 * @typedef {Object} Hero
 * @property {number} id
 * @property {string} name
 * @property {Object} biography
 * @property {string} biography.fullName
 * @property {string} biography.placeOfBirth
 * @property {string} biography.alignment
 * @property {Object} powerstats
 * @property {Object} appearance
 * @property {string} appearance.race
 * @property {string} appearance.gender
 * @property {string[]} appearance.height
 * @property {string[]} appearance.weight
 * @property {Object} images
 * @property {string} images.xs
 * @property {string} images.lg
 */

/**
 * Fetches heroes from the superhero API
 * @returns {Promise<Hero[]>}
 * @throws {Error} When network fails or API returns invalid data
 */
export const fetchHeroes = async () => {
  try {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const heroes = await response.json()
    if (!Array.isArray(heroes)) {
      throw new Error("Invalid API response: expected array of heroes")
    }
    return heroes
  } catch (error) {
    console.error("Failed to fetch heroes:", error)
    throw error
  }
}

export { API_URL }
