import { fetchHeroes } from "./fetchHeroes.js"
import { updateTable, initTable } from "./dom/table.js"
import { search } from "./filter.js"
import { debounce } from "./utils.js"

let allHeroes = []
let loadingElement = null

/**
 * Shows loading state
 */
const showLoading = () => {
  if (!loadingElement) {
    loadingElement = document.createElement("div")
    loadingElement.id = "loading"
    loadingElement.textContent = "Loading heroes..."
    loadingElement.style.cssText = "text-align: center; padding: 20px; font-size: 18px;"
    document.body.insertBefore(loadingElement, document.querySelector("table"))
  }
  loadingElement.style.display = "block"
}

/**
 * Hides loading state
 */
const hideLoading = () => {
  if (loadingElement) {
    loadingElement.style.display = "none"
  }
}

/**
 * Shows error message to user
 * @param {string} message - Error message
 */
const showError = (message) => {
  const existingError = document.getElementById("error")
  if (existingError) {
    existingError.remove()
  }
  const errorElement = document.createElement("div")
  errorElement.id = "error"
  errorElement.textContent = message
  errorElement.style.cssText = "color: red; text-align: center; padding: 20px; font-size: 18px;"
  document.body.insertBefore(errorElement, document.querySelector("table"))
}

/**
 * Gets filtered heroes based on search query
 * @param {string} query - Search query
 * @returns {Array} Filtered heroes
 */
const filteredHeroes = (query) => {
  if (!query) {
    return allHeroes
  }
  const $searchField = document.getElementById("searchField")
  const $searchOperator = document.getElementById("searchOperator")
  const field = $searchField?.value || "name"
  const operator = $searchOperator?.value || "include"
  return search(allHeroes, { query, field, operator })
}

/**
 * Initializes the application
 */
const init = async () => {
  const $tbody = document.querySelector("tbody")
  const dialog = document.getElementById("dialog")

  initTable($tbody, dialog)

  const $pageSize = document.getElementById("pageSize")
  const $searchInput = document.getElementById("inputSearch")
  const $searchField = document.getElementById("searchField")
  const $searchOperator = document.getElementById("searchOperator")
  const $closeButton = document.getElementById("close")

  $searchField.addEventListener("change", () => {
    if ($searchInput.value) {
      updateTable(filteredHeroes($searchInput.value), Number($pageSize.value), 1)
    }
  })

  $searchOperator.addEventListener("change", () => {
    if ($searchInput.value) {
      updateTable(filteredHeroes($searchInput.value), Number($pageSize.value), 1)
    }
  })

  $pageSize.addEventListener("change", (e) => {
    const value = e.target.value
    const perPage = value === "all" ? allHeroes.length : Number(value)
    updateTable(filteredHeroes($searchInput.value), perPage, 1)
  })

  const debouncedSearch = debounce((query) => {
    const perPage = $pageSize.value === "all" ? allHeroes.length : Number($pageSize.value)
    updateTable(filteredHeroes(query), perPage, 1)
  }, 300)

  $searchInput.addEventListener("input", (e) => {
    const query = e.target.value
    if (!query) {
      updateTable(allHeroes, Number($pageSize.value), 1)
      return
    }
    debouncedSearch(query)
  })

  $closeButton.addEventListener("click", () => {
    dialog.returnValue = ""
    dialog.close()
  })

  try {
    showLoading()
    allHeroes = await fetchHeroes()
    hideLoading()
    updateTable(allHeroes, 20, 1)
  } catch (error) {
    hideLoading()
    showError("Failed to load heroes. Please refresh the page.")
  }
}

document.addEventListener("DOMContentLoaded", init)
