import { describe, it, expect } from "vitest"
import { shouldShowPageButton, shouldShowSeparator, getBorderRadius } from "../dom/pagination.js"

describe("pagination.js - shouldShowPageButton", () => {
  describe("first 5 pages", () => {
    it("should show buttons for pages 1-5", () => {
      expect(shouldShowPageButton(1, 20, 1)).toBe(true)
      expect(shouldShowPageButton(2, 20, 1)).toBe(true)
      expect(shouldShowPageButton(3, 20, 1)).toBe(true)
      expect(shouldShowPageButton(4, 20, 1)).toBe(true)
      expect(shouldShowPageButton(5, 20, 1)).toBe(true)
    })
  })

  describe("last 5 pages", () => {
    it("should show buttons for last 5 pages", () => {
      expect(shouldShowPageButton(16, 20, 10)).toBe(true)
      expect(shouldShowPageButton(17, 20, 10)).toBe(true)
      expect(shouldShowPageButton(18, 20, 10)).toBe(true)
      expect(shouldShowPageButton(19, 20, 10)).toBe(true)
      expect(shouldShowPageButton(20, 20, 10)).toBe(true)
    })
  })

  describe("pages near current page", () => {
    it("should show pages within 1 of current page", () => {
      expect(shouldShowPageButton(9, 20, 10)).toBe(true)
      expect(shouldShowPageButton(10, 20, 10)).toBe(true)
      expect(shouldShowPageButton(11, 20, 10)).toBe(true)
    })

    it("should not show pages 2 away from current page", () => {
      expect(shouldShowPageButton(8, 20, 10)).toBe(false)
      expect(shouldShowPageButton(12, 20, 10)).toBe(false)
    })
  })

  describe("middle pages (not near edges or current)", () => {
    it("should not show middle pages", () => {
      expect(shouldShowPageButton(6, 20, 1)).toBe(false)
      expect(shouldShowPageButton(7, 20, 1)).toBe(false)
      expect(shouldShowPageButton(8, 20, 1)).toBe(false)
    })
  })
})

describe("pagination.js - shouldShowSeparator", () => {
  describe("separator after first page group", () => {
    it("should show separator at position 6 when current page > 4", () => {
      expect(shouldShowSeparator(6, 20, 5)).toBe(true)
      expect(shouldShowSeparator(6, 20, 6)).toBe(true)
      expect(shouldShowSeparator(6, 20, 10)).toBe(true)
    })

    it("should not show separator at position 6 when current page <= 4", () => {
      expect(shouldShowSeparator(6, 20, 1)).toBe(false)
      expect(shouldShowSeparator(6, 20, 2)).toBe(false)
      expect(shouldShowSeparator(6, 20, 3)).toBe(false)
      expect(shouldShowSeparator(6, 20, 4)).toBe(false)
    })
  })

  describe("separator before last page group", () => {
    it("should show separator at totalPages - 5 when current page < totalPages - 3", () => {
      expect(shouldShowSeparator(15, 20, 10)).toBe(true)
      expect(shouldShowSeparator(15, 20, 14)).toBe(true)
    })

    it("should handle when current page >= totalPages - 3", () => {
      expect(shouldShowSeparator(15, 20, 15)).toBe(true)
      expect(shouldShowSeparator(15, 20, 16)).toBe(true)
      expect(shouldShowSeparator(15, 20, 20)).toBe(false)
    })
  })

  describe("edge cases", () => {
    it("should not show separator for small page counts", () => {
      expect(shouldShowSeparator(6, 5, 1)).toBe(false)
      expect(shouldShowSeparator(6, 3, 1)).toBe(false)
    })
  })
})

describe("pagination.js - getBorderRadius", () => {
  describe("single page", () => {
    it("should return 5px for single page", () => {
      expect(getBorderRadius(1, 1)).toBe("5px")
    })
  })

  describe("first page", () => {
    it("should return left rounded border for first page", () => {
      expect(getBorderRadius(5, 1)).toBe("5px 0 0 5px")
      expect(getBorderRadius(10, 1)).toBe("5px 0 0 5px")
    })
  })

  describe("last page", () => {
    it("should return right rounded border for last page", () => {
      expect(getBorderRadius(5, 5)).toBe("0 5px 5px 0")
      expect(getBorderRadius(10, 10)).toBe("0 5px 5px 0")
    })
  })

  describe("middle pages", () => {
    it("should return empty string for middle pages", () => {
      expect(getBorderRadius(10, 2)).toBe("")
      expect(getBorderRadius(10, 5)).toBe("")
      expect(getBorderRadius(10, 9)).toBe("")
    })
  })
})
