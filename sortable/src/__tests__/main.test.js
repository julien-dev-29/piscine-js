import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { search } from "../filter.js"
import { debounce, getPaginationRange } from "../utils.js"
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
