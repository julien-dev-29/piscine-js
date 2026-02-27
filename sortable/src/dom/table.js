import { displayPagination } from "./pagination.js"
import { displayHeroDetails } from "./hero-details.js"
import { getPaginationRange, sortHeroes } from "../utils.js"

let currentHeroes = []
let dialogElement = null
let sortColumn = "id"
let sortDirection = "asc"

const COLUMN_MAP = {
  0: "id",
  1: "icon",
  2: "name",
  3: "fullName",
  4: "powerstats",
  5: "race",
  6: "gender",
  7: "height",
  8: "weight",
  9: "placeOfBirth",
  10: "alignment",
}

/**
 * Initializes the table with event delegation
 * @param {HTMLTableSectionElement} $tbody - Table body element
 * @param {HTMLDialogElement} dialog - Dialog element
 */
export const initTable = ($tbody, dialog) => {
  dialogElement = dialog

  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      dialog.close()
    }
  })

  $tbody.addEventListener("click", (e) => {
    const row = e.target.closest("tr")
    if (!row) return
    const heroId = row.dataset.id
    const hero = currentHeroes.find((h) => h.id === Number(heroId))
    if (hero) {
      dialogElement.showModal()
      displayHeroDetails(hero)
    }
  })

  const $thead = document.querySelector("thead")
  $thead.addEventListener("click", (e) => {
    const th = e.target.closest("th")
    if (!th || th.cellIndex === 1) return // Skip icon column

    const column = COLUMN_MAP[th.cellIndex]
    if (!column) return

    if (sortColumn === column) {
      sortDirection = sortDirection === "asc" ? "desc" : "asc"
    } else {
      sortColumn = column
      sortDirection = "asc"
    }

    updateSortIndicators()
    const sortedHeroes = sortHeroes(currentHeroes, sortColumn, sortDirection)
    updateTable(sortedHeroes, getCurrentPerPage(), 1)
  })
}

/**
 * Gets current per-page value
 * @returns {number}
 */
const getCurrentPerPage = () => {
  const $pageSize = document.getElementById("pageSize")
  return $pageSize.value === "all" ? currentHeroes.length : Number($pageSize.value)
}

/**
 * Updates sort indicators in table headers
 */
const updateSortIndicators = () => {
  const headers = document.querySelectorAll("thead th")
  headers.forEach((th, index) => {
    th.classList.remove("sort-asc", "sort-desc")
    if (COLUMN_MAP[index] === sortColumn) {
      th.classList.add(sortDirection === "asc" ? "sort-asc" : "sort-desc")
    }
  })
}

/**
 * Sets sort column and direction, then updates table
 * @param {string} column - Column to sort by
 * @param {string} direction - 'asc' or 'desc'
 */
export const setSort = (column, direction = "asc") => {
  sortColumn = column
  sortDirection = direction
  updateSortIndicators()
}

/**
 * Updates the table with heroes data
 * @param {Array} heroes - Array of hero objects
 * @param {number} [perPage=20] - Number of items per page
 * @param {number} [page=1] - Current page number
 */
export const updateTable = (heroes, perPage = 20, page = 1) => {
  currentHeroes = heroes

  const sortedHeroes = sortHeroes(heroes, sortColumn, sortDirection)

  const $tbody = document.querySelector("tbody")
  const { start, end } = getPaginationRange(page, perPage)
  const pageHeroes = sortedHeroes.slice(start, end)

  $tbody.replaceChildren()

  pageHeroes.forEach((hero) => {
    const $row = createHeroRow(hero)
    $tbody.appendChild($row)
  })

  displayPagination(sortedHeroes, perPage, page)
  updateSortIndicators()
}

/**
 * Creates a table row for a hero
 * @param {Object} hero - Hero object
 * @returns {HTMLTableRowElement}
 */
const createHeroRow = (hero) => {
  const $row = document.createElement("tr")
  $row.dataset.id = hero.id
  $row.classList.add("row")

  const cells = [
    createCell("th", hero.id, { "data-id": hero.id }),
    createImageCell(hero),
    createCell("td", hero.name),
    createCell("td", hero.biography.fullName || hero.name),
    createPowerstatsCell(hero.powerstats),
    createCell("td", hero.appearance.race || "unknown"),
    createCell("td", hero.appearance.gender),
    createCell("td", hero.appearance.height?.[1] || "unknown"),
    createCell("td", hero.appearance.weight?.[1] || "unknown"),
    createCell("td", hero.biography.placeOfBirth || "unknown"),
    createCell("td", hero.biography.alignment),
  ]

  $row.append(...cells)
  return $row
}

/**
 * Creates a table cell with text content
 * @param {string} tag - Tag name (td or th)
 * @param {string|number} text - Text content
 * @param {Object} [attributes] - Additional attributes
 * @returns {HTMLElement}
 */
const createCell = (tag, text, attributes = {}) => {
  const $cell = document.createElement(tag)
  $cell.textContent = text
  Object.entries(attributes).forEach(([key, value]) => {
    $cell.setAttribute(key, value)
  })
  return $cell
}

/**
 * Creates a cell with hero image
 * @param {Object} hero - Hero object
 * @returns {HTMLTableCellElement}
 */
const createImageCell = (hero) => {
  const $cell = document.createElement("td")
  $cell.classList.add("image")
  const $img = document.createElement("img")
  $img.src = hero.images.xs
  $img.alt = hero.name
  $cell.appendChild($img)
  return $cell
}

/**
 * Creates a cell with powerstats (safe from XSS)
 * @param {Object} powerstats - Powerstats object
 * @returns {HTMLTableCellElement}
 */
const createPowerstatsCell = (powerstats) => {
  const $cell = document.createElement("td")
  Object.entries(powerstats).forEach(([key, value]) => {
    const $span = document.createElement("div")
    $span.textContent = `${key}: ${value}`
    $cell.appendChild($span)
  })
  return $cell
}
