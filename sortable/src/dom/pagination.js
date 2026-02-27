import { updateTable } from "./table.js"

/**
 * Displays pagination controls
 * @param {Array} heroes - Array of hero objects
 * @param {number} perPage - Items per page
 * @param {number} [currentPage=1] - Current page number
 */
export const displayPagination = (heroes, perPage, currentPage = 1) => {
  const $navigation = document.querySelector(".pagination")
  $navigation.replaceChildren()

  if (!heroes || heroes.length === 0) {
    return
  }

  const totalPages = Math.ceil(heroes.length / perPage)

  for (let i = 1; i <= totalPages; i++) {
    if (shouldShowPageButton(i, totalPages, currentPage)) {
      const $button = createPageButton(i, currentPage, perPage, heroes)
      $navigation.appendChild($button)
    } else if (shouldShowSeparator(i, totalPages, currentPage)) {
      const $separator = createSeparator()
      $navigation.appendChild($separator)
    }
  }
}

/**
 * Determines if a page button should be shown
 */
const shouldShowPageButton = (i, totalPages, currentPage) => {
  return i <= 5 || i > totalPages - 5 || Math.abs(i - currentPage) <= 1
}

/**
 * Determines if a separator should be shown
 */
const shouldShowSeparator = (i, totalPages, currentPage) => {
  return (i === 6 && currentPage > 4) || (i === totalPages - 5 && currentPage < totalPages - 3)
}

/**
 * Creates a pagination button
 */
const createPageButton = (pageNum, currentPage, perPage, heroes) => {
  const $button = document.createElement("button")
  $button.classList.add("btn")
  $button.textContent = pageNum

  if (pageNum === currentPage) {
    $button.disabled = true
    $button.classList.add("active")
  }

  $button.style.borderRadius = getBorderRadius(Math.ceil(heroes.length / perPage), pageNum)

  $button.addEventListener("click", () => {
    updateTable(heroes, perPage, pageNum)
  })

  return $button
}

/**
 * Gets border radius based on button position
 */
const getBorderRadius = (totalPages, pageNum) => {
  if (pageNum === 1 && totalPages === 1) {
    console.log("yolo")
    return "5px"
  } else if (pageNum === 1) {
    return "5px 0 0 5px"
  } else if (pageNum === totalPages) {
    return "0 5px 5px 0"
  }
  return ""
}

/**
 * Creates a separator span
 */
const createSeparator = () => {
  const $separator = document.createElement("span")
  $separator.textContent = "..."
  $separator.style.padding = "8px"
  return $separator
}
