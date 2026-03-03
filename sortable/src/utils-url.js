/**
 * Gets all URL search parameters as an object
 * @returns {Object} URL parameters
 */
export const getUrlParams = () => {
  const params = new URLSearchParams(window.location.search)
  return {
    q: params.get("q") || "",
    field: params.get("field") || "name",
    op: params.get("op") || "include",
    size: params.get("size") || "20",
    page: Number(params.get("page")) || 1,
    sort: params.get("sort") || "id",
    dir: params.get("dir") || "asc",
    hero: params.get("hero") || null,
  }
}

/**
 * Updates the URL with the given state without page reload
 * @param {Object} state - State object to serialize to URL
 * @param {boolean} [replace=false] - Use replaceState instead of pushState
 */
export const updateUrl = (state, replace = false) => {
  const params = new URLSearchParams()

  if (state.q) params.set("q", state.q)
  if (state.field && state.field !== "name") params.set("field", state.field)
  if (state.op && state.op !== "include") params.set("op", state.op)
  if (state.size && state.size !== "20") params.set("size", state.size)
  if (state.page && state.page !== 1) params.set("page", String(state.page))
  if (state.sort && state.sort !== "id") params.set("sort", state.sort)
  if (state.dir && state.dir !== "asc") params.set("dir", state.dir)
  if (state.hero) params.set("hero", String(state.hero))

  const queryString = params.toString()
  const newUrl = queryString ? `?${queryString}` : window.location.pathname

  if (replace) {
    window.history.replaceState(null, "", newUrl)
  } else {
    window.history.pushState(null, "", newUrl)
  }
}

/**
 * Serializes current UI state to an object for URL
 * @param {string} query - Current search query
 * @param {string} field - Current search field
 * @param {string} operator - Current search operator
 * @param {string} pageSize - Current page size
 * @param {number} currentPage - Current page number
 * @param {string} sortColumn - Current sort column
 * @param {string} sortDirection - Current sort direction
 * @param {number|null} heroId - Currently selected hero ID (if dialog open)
 * @returns {Object} State object
 */
export const serializeState = (
  query,
  field,
  operator,
  pageSize,
  currentPage,
  sortColumn,
  sortDirection,
  heroId = null
) => ({
  q: query,
  field,
  op: operator,
  size: pageSize,
  page: currentPage,
  sort: sortColumn,
  dir: sortDirection,
  hero: heroId,
})
