/**
 * Displays hero details in the dialog
 * @param {Object} hero - Hero object
 */
export const displayHeroDetails = (hero) => {
  const $heroDetails = document.querySelector(".hero-details")
  $heroDetails.replaceChildren()

  const $image = document.createElement("img")
  $image.src = hero.images.lg
  $image.alt = hero.name
  $image.classList.add("hero-image")

  const $info = document.createElement("div")
  $info.classList.add("hero-info")

  const $name = document.createElement("h2")
  $name.textContent = hero.name
  $name.classList.add("hero-name")

  const $fullName = document.createElement("p")
  $fullName.textContent = `Real Name: ${hero.biography.fullName || "Unknown"}`
  $fullName.classList.add("hero-fullname")

  const $alignment = document.createElement("span")
  $alignment.textContent = hero.biography.alignment || "unknown"
  $alignment.classList.add("hero-alignment", hero.biography.alignment || "unknown")

  const $powerstats = createPowerstatsSection(hero.powerstats)
  const $appearance = createAppearanceSection(hero.appearance)
  const $biography = createBiographySection(hero.biography)

  $info.appendChild($name)
  $info.appendChild($fullName)
  $info.appendChild($alignment)
  $info.appendChild($powerstats)
  $info.appendChild($appearance)
  $info.appendChild($biography)

  $heroDetails.appendChild($image)
  $heroDetails.appendChild($info)
}

/**
 * Creates powerstats section
 * @param {Object} powerstats - Powerstats object
 * @returns {HTMLDivElement}
 */
const createPowerstatsSection = (powerstats) => {
  const $section = document.createElement("div")
  $section.classList.add("detail-section")

  const $title = document.createElement("h3")
  $title.textContent = "Powerstats"
  $section.appendChild($title)

  const $grid = document.createElement("div")
  $grid.classList.add("powerstats-grid")

  Object.entries(powerstats).forEach(([key, value]) => {
    const $stat = document.createElement("div")
    $stat.classList.add("stat-item")

    const $label = document.createElement("span")
    $label.textContent = key.charAt(0).toUpperCase() + key.slice(1)
    $label.classList.add("stat-label")

    const $value = document.createElement("span")
    $value.textContent = value
    $value.classList.add("stat-value")

    $stat.appendChild($label)
    $stat.appendChild($value)
    $grid.appendChild($stat)
  })

  $section.appendChild($grid)
  return $section
}

/**
 * Creates appearance section
 * @param {Object} appearance - Appearance object
 * @returns {HTMLDivElement}
 */
const createAppearanceSection = (appearance) => {
  const $section = document.createElement("div")
  $section.classList.add("detail-section")

  const $title = document.createElement("h3")
  $title.textContent = "Appearance"
  $section.appendChild($title)

  const $list = document.createElement("ul")
  $list.classList.add("detail-list")

  const items = [
    ["Race", appearance.race || "Unknown"],
    ["Gender", appearance.gender || "Unknown"],
    ["Height", appearance.height?.[1] || "Unknown"],
    ["Weight", appearance.weight?.[1] || "Unknown"],
  ]

  items.forEach(([label, value]) => {
    const $item = document.createElement("li")
    $item.innerHTML = `<strong>${label}:</strong> ${value}`
    $list.appendChild($item)
  })

  $section.appendChild($list)
  return $section
}

/**
 * Creates biography section
 * @param {Object} biography - Biography object
 * @returns {HTMLDivElement}
 */
const createBiographySection = (biography) => {
  const $section = document.createElement("div")
  $section.classList.add("detail-section")

  const $title = document.createElement("h3")
  $title.textContent = "Biography"
  $section.appendChild($title)

  const $list = document.createElement("ul")
  $list.classList.add("detail-list")

  const items = [
    ["Full Name", biography.fullName || "Unknown"],
    ["Place of Birth", biography.placeOfBirth || "Unknown"],
    ["First Appearance", biography.firstAppearance || "Unknown"],
    ["Publisher", biography.publisher || "Unknown"],
    ["Alignment", biography.alignment || "Unknown"],
  ]

  items.forEach(([label, value]) => {
    const $item = document.createElement("li")
    $item.innerHTML = `<strong>${label}:</strong> ${value}`
    $list.appendChild($item)
  })

  $section.appendChild($list)
  return $section
}
