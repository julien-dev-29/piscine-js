import { describe, it, expect } from "vitest"
import { createHeroRow, createCell, createImageCell, createPowerstatsCell } from "../dom/table.js"

describe("table.js - createCell", () => {
  it("should create a cell with correct tag", () => {
    const cell = createCell("td", "test")
    expect(cell.tagName).toBe("TD")
  })

  it("should create a th cell", () => {
    const cell = createCell("th", "test")
    expect(cell.tagName).toBe("TH")
  })

  it("should set text content safely", () => {
    const cell = createCell("td", "<script>alert('xss')</script>")
    expect(cell.innerHTML).toBe("&lt;script&gt;alert('xss')&lt;/script&gt;")
    expect(cell.textContent).toBe("<script>alert('xss')</script>")
  })

  it("should set attributes", () => {
    const cell = createCell("td", "test", { "data-id": "123", class: "my-class" })
    expect(cell.getAttribute("data-id")).toBe("123")
    expect(cell.getAttribute("class")).toBe("my-class")
  })

  it("should handle empty text", () => {
    const cell = createCell("td", "")
    expect(cell.textContent).toBe("")
  })

  it("should handle numeric text", () => {
    const cell = createCell("th", 42)
    expect(cell.textContent).toBe("42")
  })
})

describe("table.js - createImageCell", () => {
  it("should create a td cell", () => {
    const hero = { name: "Batman", images: { xs: "batman.jpg" } }
    const cell = createImageCell(hero)
    expect(cell.tagName).toBe("TD")
  })

  it("should add image class", () => {
    const hero = { name: "Batman", images: { xs: "batman.jpg" } }
    const cell = createImageCell(hero)
    expect(cell.classList.contains("image")).toBe(true)
  })

  it("should create img with correct src", () => {
    const hero = { name: "Batman", images: { xs: "batman.jpg" } }
    const cell = createImageCell(hero)
    const img = cell.querySelector("img")
    expect(img.src).toBe("http://localhost:3000/batman.jpg")
  })

  it("should create img with correct alt", () => {
    const hero = { name: "Batman", images: { xs: "batman.jpg" } }
    const cell = createImageCell(hero)
    const img = cell.querySelector("img")
    expect(img.alt).toBe("Batman")
  })
})

describe("table.js - createPowerstatsCell", () => {
  it("should create a td cell", () => {
    const powerstats = { intelligence: 100, strength: 80 }
    const cell = createPowerstatsCell(powerstats)
    expect(cell.tagName).toBe("TD")
  })

  it("should create div for each powerstat", () => {
    const powerstats = { intelligence: 100, strength: 80, speed: 50 }
    const cell = createPowerstatsCell(powerstats)
    const divs = cell.querySelectorAll("div")
    expect(divs).toHaveLength(3)
  })

  it("should display powerstat key and value", () => {
    const powerstats = { intelligence: 100 }
    const cell = createPowerstatsCell(powerstats)
    const div = cell.querySelector("div")
    expect(div.textContent).toBe("intelligence: 100")
  })

  it("should use textContent for safety", () => {
    const powerstats = { intelligence: "<script>alert('xss')</script>" }
    const cell = createPowerstatsCell(powerstats)
    const div = cell.querySelector("div")
    expect(div.innerHTML).not.toContain("<script>")
  })

  it("should handle empty powerstats", () => {
    const powerstats = {}
    const cell = createPowerstatsCell(powerstats)
    const divs = cell.querySelectorAll("div")
    expect(divs).toHaveLength(0)
  })
})

describe("table.js - createHeroRow", () => {
  const mockHero = {
    id: 1,
    name: "Batman",
    biography: {
      fullName: "Bruce Wayne",
      placeOfBirth: "Gotham",
      alignment: "good",
    },
    appearance: {
      race: "Human",
      gender: "Male",
      height: ["6 ft", "183 cm"],
      weight: ["180 lb", "81 kg"],
    },
    powerstats: {
      intelligence: 100,
      strength: 80,
      speed: 30,
      durability: 40,
      power: 60,
      combat: 90,
    },
    images: {
      xs: "batman-xs.jpg",
    },
  }

  it("should create a tr element", () => {
    const row = createHeroRow(mockHero)
    expect(row.tagName).toBe("TR")
  })

  it("should set data-id attribute", () => {
    const row = createHeroRow(mockHero)
    expect(row.dataset.id).toBe("1")
  })

  it("should add row class", () => {
    const row = createHeroRow(mockHero)
    expect(row.classList.contains("row")).toBe(true)
  })

  it("should create 11 cells", () => {
    const row = createHeroRow(mockHero)
    const cells = row.querySelectorAll("th, td")
    expect(cells).toHaveLength(11)
  })

  it("should create first cell as th with hero id", () => {
    const row = createHeroRow(mockHero)
    const firstCell = row.querySelector("th")
    expect(firstCell.textContent).toBe("1")
    expect(firstCell.getAttribute("data-id")).toBe("1")
  })

  it("should create name cell", () => {
    const row = createHeroRow(mockHero)
    const cells = row.querySelectorAll("td")
    expect(cells[1].textContent).toBe("Batman")
  })

  it("should create fullName cell", () => {
    const row = createHeroRow(mockHero)
    const cells = row.querySelectorAll("td")
    expect(cells[2].textContent).toBe("Bruce Wayne")
  })

  it("should fallback to name when fullName is empty", () => {
    const hero = { ...mockHero, biography: { fullName: "" } }
    const row = createHeroRow(hero)
    const cells = row.querySelectorAll("td")
    expect(cells[2].textContent).toBe("Batman")
  })

  it("should create powerstats cell", () => {
    const row = createHeroRow(mockHero)
    const cells = row.querySelectorAll("td")
    const powerstatsCell = cells[3]
    const divs = powerstatsCell.querySelectorAll("div")
    expect(divs).toHaveLength(6)
  })

  it("should create appearance cells", () => {
    const row = createHeroRow(mockHero)
    const cells = row.querySelectorAll("td")
    expect(cells[4].textContent).toBe("Human")
    expect(cells[5].textContent).toBe("Male")
    expect(cells[6].textContent).toBe("183 cm")
    expect(cells[7].textContent).toBe("81 kg")
  })

  it("should handle missing appearance values", () => {
    const hero = {
      ...mockHero,
      appearance: {},
    }
    const row = createHeroRow(hero)
    const cells = row.querySelectorAll("td")
    expect(cells[4].textContent).toBe("unknown")
    expect(cells[6].textContent).toBe("unknown")
    expect(cells[7].textContent).toBe("unknown")
  })
})
