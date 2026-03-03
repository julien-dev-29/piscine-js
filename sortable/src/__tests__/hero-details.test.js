import { describe, it, expect } from "vitest"
import {
  createPowerstatsSection,
  createAppearanceSection,
  createBiographySection,
} from "../dom/hero-details.js"

describe("hero-details.js - createPowerstatsSection", () => {
  it("should create a section with correct class", () => {
    const powerstats = { intelligence: 100, strength: 80, speed: 50 }
    const section = createPowerstatsSection(powerstats)
    expect(section.classList.contains("detail-section")).toBe(true)
  })

  it("should have Powerstats title", () => {
    const powerstats = { intelligence: 100 }
    const section = createPowerstatsSection(powerstats)
    const title = section.querySelector("h3")
    expect(title.textContent).toBe("Powerstats")
  })

  it("should create grid with all powerstats", () => {
    const powerstats = {
      intelligence: 100,
      strength: 80,
      speed: 50,
      durability: 60,
      power: 70,
      combat: 90,
    }
    const section = createPowerstatsSection(powerstats)
    const grid = section.querySelector(".powerstats-grid")
    const items = grid.querySelectorAll(".stat-item")
    expect(items).toHaveLength(6)
  })

  it("should capitalize stat keys", () => {
    const powerstats = { intelligence: 100 }
    const section = createPowerstatsSection(powerstats)
    const label = section.querySelector(".stat-label")
    expect(label.textContent).toBe("Intelligence")
  })

  it("should display stat values", () => {
    const powerstats = { intelligence: 100 }
    const section = createPowerstatsSection(powerstats)
    const value = section.querySelector(".stat-value")
    expect(value.textContent).toBe("100")
  })

  it("should handle empty powerstats", () => {
    const powerstats = {}
    const section = createPowerstatsSection(powerstats)
    const grid = section.querySelector(".powerstats-grid")
    const items = grid.querySelectorAll(".stat-item")
    expect(items).toHaveLength(0)
  })
})

describe("hero-details.js - createAppearanceSection", () => {
  it("should create a section with correct class", () => {
    const appearance = {
      race: "Human",
      gender: "Male",
      height: ["5 ft", "152 cm"],
      weight: ["150 lb", "68 kg"],
    }
    const section = createAppearanceSection(appearance)
    expect(section.classList.contains("detail-section")).toBe(true)
  })

  it("should have Appearance title", () => {
    const appearance = { race: "Human" }
    const section = createAppearanceSection(appearance)
    const title = section.querySelector("h3")
    expect(title.textContent).toBe("Appearance")
  })

  it("should display all appearance items", () => {
    const appearance = {
      race: "Human",
      gender: "Male",
      height: ["5 ft", "152 cm"],
      weight: ["150 lb", "68 kg"],
    }
    const section = createAppearanceSection(appearance)
    const listItems = section.querySelectorAll("li")
    expect(listItems).toHaveLength(4)
  })

  it("should handle missing values with Unknown", () => {
    const appearance = {}
    const section = createAppearanceSection(appearance)
    const listItems = section.querySelectorAll("li")
    listItems.forEach((item) => {
      expect(item.textContent).toContain("Unknown")
    })
  })

  it("should use height[1] for display", () => {
    const appearance = {
      race: "Human",
      gender: "Male",
      height: ["5 ft", "152 cm"],
      weight: ["150 lb", "68 kg"],
    }
    const section = createAppearanceSection(appearance)
    const heightItem = Array.from(section.querySelectorAll("li")).find((li) =>
      li.textContent.includes("Height")
    )
    expect(heightItem.textContent).toContain("152 cm")
  })
})

describe("hero-details.js - createBiographySection", () => {
  it("should create a section with correct class", () => {
    const biography = {
      fullName: "Bruce Wayne",
      placeOfBirth: "Gotham",
      firstAppearance: "Detective Comics #27",
      publisher: "DC Comics",
      alignment: "good",
    }
    const section = createBiographySection(biography)
    expect(section.classList.contains("detail-section")).toBe(true)
  })

  it("should have Biography title", () => {
    const biography = { fullName: "Bruce Wayne" }
    const section = createBiographySection(biography)
    const title = section.querySelector("h3")
    expect(title.textContent).toBe("Biography")
  })

  it("should display all biography items", () => {
    const biography = {
      fullName: "Bruce Wayne",
      placeOfBirth: "Gotham",
      firstAppearance: "Detective Comics #27",
      publisher: "DC Comics",
      alignment: "good",
    }
    const section = createBiographySection(biography)
    const listItems = section.querySelectorAll("li")
    expect(listItems).toHaveLength(5)
  })

  it("should handle missing values with Unknown", () => {
    const biography = {}
    const section = createBiographySection(biography)
    const listItems = section.querySelectorAll("li")
    listItems.forEach((item) => {
      expect(item.textContent).toContain("Unknown")
    })
  })

  it("should display fullName", () => {
    const biography = { fullName: "Bruce Wayne" }
    const section = createBiographySection(biography)
    const firstItem = section.querySelector("li")
    expect(firstItem.textContent).toContain("Bruce Wayne")
  })

  it("should display placeOfBirth", () => {
    const biography = { placeOfBirth: "Gotham" }
    const section = createBiographySection(biography)
    const listItems = section.querySelectorAll("li")
    const birthItem = Array.from(listItems).find((item) =>
      item.textContent.includes("Place of Birth")
    )
    expect(birthItem.textContent).toContain("Gotham")
  })
})
