import { fetchHeroes } from "./fetchHeroes.js"
import { updateTable, initTable, getSortState, setSort, setUrlUpdateCallback } from "./dom/table.js"
import { search } from "./filter.js"
import { debounce } from "./utils.js"
import { getUrlParams, updateUrl, serializeState } from "./utils-url.js"

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

let isPopstate = false
let isUrlUpdating = false

const updateCurrentUrl = (heroId = null) => {
  if (isUrlUpdating) return
  isUrlUpdating = true

  const $searchInput = document.getElementById("inputSearch")
  const $searchField = document.getElementById("searchField")
  const $searchOperator = document.getElementById("searchOperator")
  const $pageSize = document.getElementById("pageSize")

  const query = $searchInput?.value || ""
  const field = $searchField?.value || "name"
  const operator = $searchOperator?.value || "include"
  const size = $pageSize?.value || "20"
  const sortState = getSortState()

  const state = serializeState(
    query,
    field,
    operator,
    size,
    1,
    sortState.column,
    sortState.direction,
    heroId
  )

  updateUrl(state, isPopstate)
  isPopstate = false
  isUrlUpdating = false
}

const applyUrlState = async (params) => {
  const $searchInput = document.getElementById("inputSearch")
  const $searchField = document.getElementById("searchField")
  const $searchOperator = document.getElementById("searchOperator")
  const $pageSize = document.getElementById("pageSize")
  const dialog = document.getElementById("dialog")

  if ($searchInput) $searchInput.value = params.q || ""
  if ($searchField) $searchField.value = params.field || "name"
  if ($searchOperator) $searchOperator.value = params.op || "include"
  if ($pageSize) $pageSize.value = params.size || "20"

  setSort(params.sort || "id", params.dir || "asc", false)

  const perPage = params.size === "all" ? allHeroes.length : Number(params.size || "20")
  const filtered = filteredHeroes(params.q || "", params.field || "name", params.op || "include")
  updateTable(filtered, perPage, params.page || 1)

  if (params.hero) {
    const hero = allHeroes.find((h) => h.id === Number(params.hero))
    if (hero) {
      dialog.showModal()
      const { displayHeroDetails } = await import("./dom/hero-details.js")
      displayHeroDetails(hero)
    }
  }
}

const handlePopstate = () => {
  isPopstate = true
  const params = getUrlParams()
  applyUrlState(params)
}

/**
 * Gets filtered heroes based on search query
 * @param {string} query - Search query
 * @param {string} [field] - Search field
 * @param {string} [operator] - Search operator
 * @returns {Array} Filtered heroes
 */
const filteredHeroes = (query, field, operator) => {
  if (!query) {
    return allHeroes
  }
  const $searchField = document.getElementById("searchField")
  const $searchOperator = document.getElementById("searchOperator")
  const searchField = field || $searchField?.value || "name"
  const searchOperator = operator || $searchOperator?.value || "include"
  return search(allHeroes, { query, field: searchField, operator: searchOperator })
}

/**
 * Initializes the application
 */
const init = async () => {
  const $tbody = document.querySelector("tbody")
  const dialog = document.getElementById("dialog")

  initTable($tbody, dialog)
  setUrlUpdateCallback(updateCurrentUrl)

  window.addEventListener("popstate", handlePopstate)

  const $pageSize = document.getElementById("pageSize")
  const $searchInput = document.getElementById("inputSearch")
  const $searchField = document.getElementById("searchField")
  const $searchOperator = document.getElementById("searchOperator")
  const $closeButton = document.getElementById("close")

  $searchField.addEventListener("change", () => {
    if ($searchInput.value) {
      updateTable(filteredHeroes($searchInput.value), Number($pageSize.value), 1)
    }
    updateCurrentUrl()
  })

  $searchOperator.addEventListener("change", () => {
    if ($searchInput.value) {
      updateTable(filteredHeroes($searchInput.value), Number($pageSize.value), 1)
    }
    updateCurrentUrl()
  })

  $pageSize.addEventListener("change", (e) => {
    const value = e.target.value
    const perPage = value === "all" ? allHeroes.length : Number(value)
    updateTable(filteredHeroes($searchInput.value), perPage, 1)
    updateCurrentUrl()
  })

  const debouncedSearch = debounce((query) => {
    const perPage = $pageSize.value === "all" ? allHeroes.length : Number($pageSize.value)
    updateTable(filteredHeroes(query), perPage, 1)
    updateCurrentUrl()
  }, 300)

  $searchInput.addEventListener("input", (e) => {
    const query = e.target.value
    if (!query) {
      updateTable(allHeroes, Number($pageSize.value), 1)
      updateCurrentUrl()
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

    const urlParams = getUrlParams()
    if (urlParams.q || urlParams.hero) {
      await applyUrlState(urlParams)
    } else {
      updateTable(allHeroes, 20, 1)
    }
  } catch (error) {
    hideLoading()
    showError("Failed to load heroes. Please refresh the page.")
  }
}

document.addEventListener("DOMContentLoaded", init)
