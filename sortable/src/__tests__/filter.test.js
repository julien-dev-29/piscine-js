import { describe, it, expect } from "vitest"
import { search } from "../filter.js"

describe("filter.js - search with operators", () => {
  const mockHeroes = [
    {
      name: "Batman",
      biography: { fullName: "Bruce Wayne", placeOfBirth: "Gotham", alignment: "good" },
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
    },
    {
      name: "Superman",
      biography: { fullName: "Clark Kent", placeOfBirth: "Krypton", alignment: "good" },
      appearance: {
        race: "Kryptonian",
        gender: "Male",
        height: ["6 ft", "191 cm"],
        weight: ["220 lb", "100 kg"],
      },
      powerstats: {
        intelligence: 100,
        strength: 100,
        speed: 100,
        durability: 100,
        power: 100,
        combat: 85,
      },
    },
    {
      name: "Joker",
      biography: { fullName: "Unknown", placeOfBirth: "Gotham", alignment: "bad" },
      appearance: {
        race: "Human",
        gender: "Male",
        height: ["5 ft", "152 cm"],
        weight: ["140 lb", "63 kg"],
      },
      powerstats: {
        intelligence: 80,
        strength: 30,
        speed: 20,
        durability: 40,
        power: 30,
        combat: 60,
      },
    },
    {
      name: "Wonder Woman",
      biography: { fullName: "Diana Prince", placeOfBirth: "Themyscira", alignment: "good" },
      appearance: {
        race: "Amazon",
        gender: "Female",
        height: ["6 ft", "183 cm"],
        weight: ["165 lb", "74 kg"],
      },
      powerstats: {
        intelligence: 90,
        strength: 100,
        speed: 80,
        durability: 100,
        power: 100,
        combat: 100,
      },
    },
    {
      name: "Harley Quinn",
      biography: { fullName: "Harleen Quinzel", placeOfBirth: "New York", alignment: "bad" },
      appearance: {
        race: "Human",
        gender: "Female",
        height: ["5 ft", "170 cm"],
        weight: ["130 lb", "58 kg"],
      },
      powerstats: {
        intelligence: 80,
        strength: 40,
        speed: 30,
        durability: 50,
        power: 40,
        combat: 70,
      },
    },
  ]

  describe("operator: include (default)", () => {
    it("should include heroes whose field contains query", () => {
      const result = search(mockHeroes, { query: "man", field: "name", operator: "include" })
      expect(result).toHaveLength(3)
      expect(result.map((h) => h.name)).toContain("Batman")
      expect(result.map((h) => h.name)).toContain("Superman")
      expect(result.map((h) => h.name)).toContain("Wonder Woman")
    })

    it("should be case insensitive", () => {
      const result = search(mockHeroes, { query: "BATMAN", field: "name", operator: "include" })
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe("Batman")
    })
  })

  describe("operator: exclude", () => {
    it("should exclude heroes whose field contains query", () => {
      const result = search(mockHeroes, { query: "man", field: "name", operator: "exclude" })
      expect(result).toHaveLength(2)
      expect(result.map((h) => h.name)).toContain("Joker")
      expect(result.map((h) => h.name)).toContain("Harley Quinn")
    })

    it("should exclude heroes by alignment", () => {
      const result = search(mockHeroes, { query: "bad", field: "alignment", operator: "exclude" })
      expect(result).toHaveLength(3)
      result.forEach((h) => {
        expect(h.biography.alignment).not.toBe("bad")
      })
    })
  })

  describe("operator: equal", () => {
    it("should return heroes with exact match", () => {
      const result = search(mockHeroes, { query: "Batman", field: "name", operator: "equal" })
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe("Batman")
    })

    it("should be case insensitive", () => {
      const result = search(mockHeroes, { query: "batman", field: "name", operator: "equal" })
      expect(result).toHaveLength(1)
    })

    it("should return empty when no exact match", () => {
      const result = search(mockHeroes, { query: "man", field: "name", operator: "equal" })
      expect(result).toHaveLength(0)
    })
  })

  describe("operator: notEqual", () => {
    it("should return heroes that do not match exactly", () => {
      const result = search(mockHeroes, { query: "Batman", field: "name", operator: "notEqual" })
      expect(result).toHaveLength(4)
      expect(result.map((h) => h.name)).not.toContain("Batman")
    })

    it("should be case insensitive", () => {
      const result = search(mockHeroes, { query: "batman", field: "name", operator: "notEqual" })
      expect(result).toHaveLength(4)
    })
  })

  describe("operator: fuzzy", () => {
    it("should return heroes within Levenshtein distance <= 3", () => {
      const result = search(mockHeroes, { query: "Batsman", field: "name", operator: "fuzzy" })
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe("Batman")
    })

    it("should not return exact match (distance 0)", () => {
      const result = search(mockHeroes, { query: "Batman", field: "name", operator: "fuzzy" })
      expect(result).toHaveLength(0)
    })

    it("should not return heroes with distance > 3", () => {
      const result = search(mockHeroes, { query: "Superman123", field: "name", operator: "fuzzy" })
      expect(result).toHaveLength(1)
    })

    it("should not work on numeric fields", () => {
      const heroes = [{ name: "Hero", powerstats: { intelligence: 100 } }]
      const result = search(heroes, { query: "100", field: "powerstats", operator: "fuzzy" })
      expect(result).toHaveLength(0)
    })
  })

  describe("operator: gt (greater than)", () => {
    it("should return heroes with numeric field greater than query", () => {
      const result = search(mockHeroes, { query: "350", field: "powerstats", operator: "gt" })
      expect(result).toHaveLength(3)
      expect(result.map((h) => h.name)).toContain("Superman")
      expect(result.map((h) => h.name)).toContain("Wonder Woman")
    })

    it("should return empty when query is not numeric", () => {
      const result = search(mockHeroes, { query: "abc", field: "powerstats", operator: "gt" })
      expect(result).toHaveLength(0)
    })

    it("should return empty when field is not numeric", () => {
      const result = search(mockHeroes, { query: "100", field: "name", operator: "gt" })
      expect(result).toHaveLength(0)
    })
  })

  describe("operator: lt (less than)", () => {
    it("should return heroes with numeric field less than query", () => {
      const result = search(mockHeroes, { query: "300", field: "powerstats", operator: "lt" })
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe("Joker")
    })

    it("should return empty when query is not numeric", () => {
      const result = search(mockHeroes, { query: "abc", field: "powerstats", operator: "lt" })
      expect(result).toHaveLength(0)
    })

    it("should return empty when field is not numeric", () => {
      const result = search(mockHeroes, { query: "100", field: "name", operator: "lt" })
      expect(result).toHaveLength(0)
    })
  })

  describe("search with different fields", () => {
    it("should search by fullName", () => {
      const result = search(mockHeroes, { query: "Bruce", field: "fullName", operator: "include" })
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe("Batman")
    })

    it("should search by race", () => {
      const result = search(mockHeroes, { query: "Human", field: "race", operator: "include" })
      expect(result).toHaveLength(3)
    })

    it("should search by gender", () => {
      const result = search(mockHeroes, { query: "Female", field: "gender", operator: "equal" })
      expect(result).toHaveLength(2)
    })

    it("should search by height", () => {
      const result = search(mockHeroes, { query: "183", field: "height", operator: "equal" })
      expect(result).toHaveLength(2)
    })

    it("should search by weight", () => {
      const result = search(mockHeroes, { query: "80", field: "weight", operator: "gt" })
      expect(result).toHaveLength(2)
    })

    it("should search by placeOfBirth", () => {
      const result = search(mockHeroes, {
        query: "Gotham",
        field: "placeOfBirth",
        operator: "include",
      })
      expect(result).toHaveLength(2)
    })

    it("should search by alignment", () => {
      const result = search(mockHeroes, { query: "good", field: "alignment", operator: "equal" })
      expect(result).toHaveLength(3)
    })
  })

  describe("edge cases", () => {
    it("should handle empty heroes array", () => {
      const result = search([], { query: "batman", field: "name", operator: "include" })
      expect(result).toEqual([])
    })

    it("should handle empty query string", () => {
      const result = search(mockHeroes, { query: "", field: "name", operator: "include" })
      expect(result).toEqual(mockHeroes)
    })

    it("should handle null query", () => {
      const result = search(mockHeroes, { query: null, field: "name", operator: "include" })
      expect(result).toEqual(mockHeroes)
    })

    it("should handle undefined query", () => {
      const result = search(mockHeroes, { query: undefined, field: "name", operator: "include" })
      expect(result).toEqual(mockHeroes)
    })

    it("should handle string query (legacy support)", () => {
      const result = search(mockHeroes, "Batman")
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe("Batman")
    })

    it("should handle missing hero properties", () => {
      const heroes = [
        { name: "Hero1" },
        { name: "Hero2", biography: null },
        { name: "Hero3", appearance: { race: null } },
      ]
      const result = search(heroes, { query: "Hero", field: "name", operator: "include" })
      expect(result).toHaveLength(3)
    })

    it("should handle unknown field values as 'unknown'", () => {
      const heroes = [{ name: "Hero", appearance: { race: "unknown" } }]
      const result = search(heroes, { query: "unknown", field: "race", operator: "equal" })
      expect(result).toHaveLength(1)
    })

    it("should handle heroes with null/undefined field values", () => {
      const heroes = [
        { name: "Hero1", biography: { fullName: null } },
        { name: "Hero2", appearance: { race: undefined } },
      ]
      const result = search(heroes, { query: "test", field: "fullName", operator: "include" })
      expect(result).toHaveLength(0)
    })
  })
})
