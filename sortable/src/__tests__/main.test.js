import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { search } from "../filter.js"
import { debounce, getPaginationRange, sortHeroes, extractNumber } from "../utils.js"
import { fetchHeroes, API_URL } from "../fetchHeroes.js"

describe("filter.js", () => {
  const mockHeroes = [
    { name: "Batman" },
    { name: "Superman" },
    { name: "Wonder Woman" },
    { name: "The Flash" },
    { name: "Aquaman" },
  ]

  describe("search", () => {
    it("should return all heroes when query is empty", () => {
      expect(search(mockHeroes, "")).toEqual(mockHeroes)
      expect(search(mockHeroes, null)).toEqual(mockHeroes)
      expect(search(mockHeroes, undefined)).toEqual(mockHeroes)
    })

    it("should filter heroes by name (case insensitive)", () => {
      expect(search(mockHeroes, "batman")).toEqual([{ name: "Batman" }])
      expect(search(mockHeroes, "BATMAN")).toEqual([{ name: "Batman" }])
      expect(search(mockHeroes, "man")).toEqual([
        { name: "Batman" },
        { name: "Superman" },
        { name: "Wonder Woman" },
        { name: "Aquaman" },
      ])
    })

    it("should return empty array when no match", () => {
      expect(search(mockHeroes, "spiderman")).toEqual([])
    })

    it("should handle empty heroes array", () => {
      expect(search([], "batman")).toEqual([])
    })

    it("should trim whitespace from query", () => {
      expect(search(mockHeroes, "  batman  ")).toEqual([{ name: "Batman" }])
    })
  })
})

describe("utils.js", () => {
  describe("debounce", () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it("should debounce function calls", () => {
      const fn = vi.fn()
      const debouncedFn = debounce(fn, 300)

      debouncedFn()
      debouncedFn()
      debouncedFn()

      expect(fn).not.toHaveBeenCalled()

      vi.advanceTimersByTime(300)

      expect(fn).toHaveBeenCalledTimes(1)
    })

    it("should pass arguments to debounced function", () => {
      const fn = vi.fn()
      const debouncedFn = debounce(fn, 300)

      debouncedFn("arg1", "arg2")
      vi.advanceTimersByTime(300)

      expect(fn).toHaveBeenCalledWith("arg1", "arg2")
    })
  })

  describe("getPaginationRange", () => {
    it("should calculate correct range for page 1", () => {
      expect(getPaginationRange(1, 20)).toEqual({ start: 0, end: 20 })
    })

    it("should calculate correct range for page 2", () => {
      expect(getPaginationRange(2, 20)).toEqual({ start: 20, end: 40 })
    })

    it("should calculate correct range for page 3 with 10 items", () => {
      expect(getPaginationRange(3, 10)).toEqual({ start: 20, end: 30 })
    })

    it("should handle perPage of 1", () => {
      expect(getPaginationRange(5, 1)).toEqual({ start: 4, end: 5 })
    })
  })
})

describe("fetchHeroes.js", () => {
  it("should export fetchHeroes as a function", () => {
    expect(typeof fetchHeroes).toBe("function")
  })

  it("should export API_URL constant", () => {
    expect(API_URL).toBe("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
  })
})

describe("utils.js - sortHeroes", () => {
  const mockHeroes = [
    {
      id: 3,
      name: "Charlie",
      biography: { fullName: "" },
      appearance: {
        race: "Human",
        gender: "Male",
        height: ["6 ft", "183 cm"],
        weight: ["180 lb", "81 kg"],
      },
      powerstats: {
        intelligence: 50,
        strength: 70,
        speed: 30,
        durability: 40,
        power: 60,
        combat: 80,
      },
    },
    {
      id: 1,
      name: "Alice",
      biography: { fullName: "Alice Smith" },
      appearance: {
        race: "Alien",
        gender: "Female",
        height: ["5 ft", "152 cm"],
        weight: ["100 lb", "45 kg"],
      },
      powerstats: {
        intelligence: 100,
        strength: 80,
        speed: 50,
        durability: 60,
        power: 90,
        combat: 40,
      },
    },
    {
      id: 2,
      name: "Bob",
      biography: { fullName: "Robert" },
      appearance: {
        race: "Human",
        gender: "Male",
        height: ["6 ft", "183 cm"],
        weight: ["200 lb", "90 kg"],
      },
      powerstats: {
        intelligence: 60,
        strength: 90,
        speed: 40,
        durability: 80,
        power: 70,
        combat: 50,
      },
    },
  ]

  describe("sort by id", () => {
    it("should sort by id ascending", () => {
      const sorted = sortHeroes(mockHeroes, "id", "asc")
      expect(sorted[0].id).toBe(1)
      expect(sorted[1].id).toBe(2)
      expect(sorted[2].id).toBe(3)
    })

    it("should sort by id descending", () => {
      const sorted = sortHeroes(mockHeroes, "id", "desc")
      expect(sorted[0].id).toBe(3)
      expect(sorted[1].id).toBe(2)
      expect(sorted[2].id).toBe(1)
    })
  })

  describe("sort by name", () => {
    it("should sort by name ascending", () => {
      const sorted = sortHeroes(mockHeroes, "name", "asc")
      expect(sorted[0].name).toBe("Alice")
      expect(sorted[1].name).toBe("Bob")
      expect(sorted[2].name).toBe("Charlie")
    })

    it("should sort by name descending", () => {
      const sorted = sortHeroes(mockHeroes, "name", "desc")
      expect(sorted[0].name).toBe("Charlie")
      expect(sorted[1].name).toBe("Bob")
      expect(sorted[2].name).toBe("Alice")
    })

    it("should handle case insensitive sorting", () => {
      const heroes = [{ name: "alice" }, { name: "Bob" }, { name: "CHARLIE" }]
      const sorted = sortHeroes(heroes, "name", "asc")
      expect(sorted[0].name).toBe("alice")
      expect(sorted[1].name).toBe("Bob")
      expect(sorted[2].name).toBe("CHARLIE")
    })
  })

  describe("sort by fullName", () => {
    it("should sort by fullName ascending", () => {
      const sorted = sortHeroes(mockHeroes, "fullName", "asc")
      expect(sorted[0].biography.fullName).toBe("Alice Smith")
      expect(sorted[1].biography.fullName).toBe("")
    })

    it("should fallback to name when fullName is empty", () => {
      const sorted = sortHeroes(mockHeroes, "fullName", "asc")
      expect(sorted[2].name).toBe("Bob")
    })
  })

  describe("sort by powerstats", () => {
    it("should sort by total powerstats ascending", () => {
      const sorted = sortHeroes(mockHeroes, "powerstats", "asc")
      expect(sorted[0].name).toBe("Charlie")
      expect(sorted[1].name).toBe("Bob")
      expect(sorted[2].name).toBe("Alice")
    })

    it("should sort by total powerstats descending", () => {
      const sorted = sortHeroes(mockHeroes, "powerstats", "desc")
      expect(sorted[0].name).toBe("Alice")
      expect(sorted[1].name).toBe("Bob")
      expect(sorted[2].name).toBe("Charlie")
    })
  })

  describe("sort by race", () => {
    it("should sort by race ascending", () => {
      const sorted = sortHeroes(mockHeroes, "race", "asc")
      expect(sorted[0].appearance.race).toBe("Alien")
      expect(sorted[1].appearance.race).toBe("Human")
    })
  })

  describe("sort by gender", () => {
    it("should sort by gender ascending", () => {
      const sorted = sortHeroes(mockHeroes, "gender", "asc")
      expect(sorted[0].appearance.gender).toBe("Female")
      expect(sorted[1].appearance.gender).toBe("Male")
    })
  })

  describe("sort by height", () => {
    it("should sort by height ascending", () => {
      const sorted = sortHeroes(mockHeroes, "height", "asc")
      expect(sorted[0].name).toBe("Alice")
      expect(sorted[1].name).toBe("Charlie")
    })
  })

  describe("sort by weight", () => {
    it("should sort by weight ascending", () => {
      const sorted = sortHeroes(mockHeroes, "weight", "asc")
      expect(sorted[0].name).toBe("Alice")
      expect(sorted[1].name).toBe("Charlie")
    })
  })

  describe("sort by alignment", () => {
    it("should sort by alignment ascending", () => {
      const heroes = [
        { name: "Bad", biography: { alignment: "bad" } },
        { name: "Good", biography: { alignment: "good" } },
        { name: "Neutral", biography: { alignment: "-" } },
      ]
      const sorted = sortHeroes(heroes, "alignment", "asc")
      expect(sorted[0].name).toBe("Neutral")
    })
  })

  it("should not mutate original array", () => {
    const original = [...mockHeroes]
    sortHeroes(mockHeroes, "name", "asc")
    expect(mockHeroes).toEqual(original)
  })

  it("should handle empty array", () => {
    const sorted = sortHeroes([], "name", "asc")
    expect(sorted).toEqual([])
  })

  it("should handle null values in sort column", () => {
    const heroes = [{ name: "Bob" }, { name: "Alice" }, { name: null }]
    const sorted = sortHeroes(heroes, "name", "asc")
    expect(sorted.length).toBe(3)
  })
})

describe("utils.js - extractNumber", () => {
  it("should return number as-is", () => {
    expect(extractNumber(42)).toBe(42)
    expect(extractNumber(0)).toBe(0)
  })

  it("should return null for null input", () => {
    expect(extractNumber(null)).toBeNull()
  })

  it("should return null for undefined input", () => {
    expect(extractNumber(undefined)).toBeNull()
  })

  it("should return null for empty string", () => {
    expect(extractNumber("")).toBeNull()
  })

  it("should return null for 'unknown' string", () => {
    expect(extractNumber("unknown")).toBeNull()
  })

  it("should extract number from string with units", () => {
    expect(extractNumber("180 cm")).toBe(180)
    expect(extractNumber("80 kg")).toBe(80)
    expect(extractNumber("5 ft")).toBe(5)
  })

  it("should extract first number from string", () => {
    expect(extractNumber("100 lb")).toBe(100)
    expect(extractNumber("200cm")).toBe(200)
  })

  it("should return NaN as null", () => {
    expect(extractNumber("abc")).toBeNull()
  })
})
