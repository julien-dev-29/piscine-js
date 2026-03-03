import { describe, it, expect, beforeEach, vi } from "vitest"
import { getUrlParams, updateUrl, serializeState } from "../utils-url.js"

describe("utils-url.js", () => {
  describe("getUrlParams", () => {
    beforeEach(() => {
      vi.stubGlobal("window", {
        location: {
          search: "",
        },
      })
    })

    it("should return default values when URL has no params", () => {
      window.location.search = ""
      const params = getUrlParams()
      expect(params.q).toBe("")
      expect(params.field).toBe("name")
      expect(params.op).toBe("include")
      expect(params.size).toBe("20")
      expect(params.page).toBe(1)
      expect(params.sort).toBe("id")
      expect(params.dir).toBe("asc")
      expect(params.hero).toBeNull()
    })

    it("should parse search query", () => {
      window.location.search = "?q=batman"
      const params = getUrlParams()
      expect(params.q).toBe("batman")
    })

    it("should parse field parameter", () => {
      window.location.search = "?field=powerstats"
      const params = getUrlParams()
      expect(params.field).toBe("powerstats")
    })

    it("should parse operator parameter", () => {
      window.location.search = "?op=exclude"
      const params = getUrlParams()
      expect(params.op).toBe("exclude")
    })

    it("should parse page size", () => {
      window.location.search = "?size=50"
      const params = getUrlParams()
      expect(params.size).toBe("50")
    })

    it("should parse page number", () => {
      window.location.search = "?page=3"
      const params = getUrlParams()
      expect(params.page).toBe(3)
    })

    it("should parse sort column", () => {
      window.location.search = "?sort=name"
      const params = getUrlParams()
      expect(params.sort).toBe("name")
    })

    it("should parse sort direction", () => {
      window.location.search = "?dir=desc"
      const params = getUrlParams()
      expect(params.dir).toBe("desc")
    })

    it("should parse hero id", () => {
      window.location.search = "?hero=620"
      const params = getUrlParams()
      expect(params.hero).toBe("620")
    })

    it("should parse multiple params", () => {
      window.location.search =
        "?q=spider&field=name&op=include&size=20&page=2&sort=powerstats&dir=desc&hero=620"
      const params = getUrlParams()
      expect(params.q).toBe("spider")
      expect(params.field).toBe("name")
      expect(params.op).toBe("include")
      expect(params.size).toBe("20")
      expect(params.page).toBe(2)
      expect(params.sort).toBe("powerstats")
      expect(params.dir).toBe("desc")
      expect(params.hero).toBe("620")
    })
  })

  describe("updateUrl", () => {
    beforeEach(() => {
      vi.stubGlobal("window", {
        location: {
          pathname: "/index.html",
          search: "",
        },
        history: {
          pushState: vi.fn(),
          replaceState: vi.fn(),
        },
      })
    })

    it("should call pushState with correct URL when state provided", () => {
      const state = {
        q: "batman",
        field: "name",
        op: "include",
        size: "20",
        page: 1,
        sort: "id",
        dir: "asc",
        hero: null,
      }
      updateUrl(state)
      expect(window.history.pushState).toHaveBeenCalledWith(null, "", "?q=batman")
    })

    it("should use replaceState when replace is true", () => {
      const state = {
        q: "batman",
        field: "name",
        op: "include",
        size: "20",
        page: 1,
        sort: "id",
        dir: "asc",
        hero: null,
      }
      updateUrl(state, true)
      expect(window.history.replaceState).toHaveBeenCalledWith(null, "", "?q=batman")
    })

    it("should not include default values in URL", () => {
      const state = {
        q: "",
        field: "name",
        op: "include",
        size: "20",
        page: 1,
        sort: "id",
        dir: "asc",
        hero: null,
      }
      updateUrl(state)
      expect(window.history.pushState).toHaveBeenCalledWith(null, "", "/index.html")
    })

    it("should include hero id when provided", () => {
      const state = {
        q: "",
        field: "name",
        op: "include",
        size: "20",
        page: 1,
        sort: "id",
        dir: "asc",
        hero: 620,
      }
      updateUrl(state)
      expect(window.history.pushState).toHaveBeenCalledWith(null, "", "?hero=620")
    })

    it("should include all non-default params", () => {
      const state = {
        q: "spider",
        field: "powerstats",
        op: "gt",
        size: "50",
        page: 3,
        sort: "name",
        dir: "desc",
        hero: null,
      }
      updateUrl(state)
      expect(window.history.pushState).toHaveBeenCalledWith(
        null,
        "",
        "?q=spider&field=powerstats&op=gt&size=50&page=3&sort=name&dir=desc"
      )
    })
  })

  describe("serializeState", () => {
    it("should serialize state with all parameters", () => {
      const state = serializeState("batman", "name", "include", "20", 1, "id", "asc", null)
      expect(state).toEqual({
        q: "batman",
        field: "name",
        op: "include",
        size: "20",
        page: 1,
        sort: "id",
        dir: "asc",
        hero: null,
      })
    })

    it("should serialize state with hero id", () => {
      const state = serializeState("spider", "powerstats", "gt", "50", 2, "name", "desc", 620)
      expect(state.hero).toBe(620)
    })

    it("should handle empty query", () => {
      const state = serializeState("", "name", "include", "20", 1, "id", "asc", null)
      expect(state.q).toBe("")
    })
  })
})
