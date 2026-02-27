# AGENTS.md - Developer Guidelines for Sortable Project

## Project Overview

This is a **vanilla JavaScript** project for displaying and filtering superhero data with pagination. It uses **Vite** as the build tool, **Vitest** for testing, **ESLint** for linting, and **Prettier** for formatting.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors automatically |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |

### Running a Single Test

To run a specific test file:
```bash
npm run test -- src/__tests__/filter.test.js
```

To run tests matching a specific pattern:
```bash
npm run test -- --grep "search"
```

To run a single test in watch mode:
```bash
npm run test:watch -- --grep "search"
```

---

## Code Style Guidelines

### Formatting Rules

- **Indentation**: 2 spaces (no tabs)
- **Semicolons**: Never ( ASI style )
- **Quotes**: Double quotes for strings (`"hello"`, not `'hello'`)
- **Line length**: Max 100 characters
- **Trailing commas**: ES5 style (in arrays/objects)

### Naming Conventions

- **Variables/Functions**: camelCase (`const heroName`, `function updateTable()`)
- **Constants**: UPPER_SNAKE_CASE for config values (`API_URL`, `MAX_RESULTS`)
- **DOM Elements**: Prefix with `$` (`const $tbody`, `const $button`)
- **Files**: kebab-case (`fetchHeroes.js`, `hero-details.js`)

### Import Conventions

```javascript
// Relative imports for local modules
import { fetchHeroes } from "./fetchHeroes.js"
import { updateTable } from "./dom/table.js"
import { search } from "../filter.js"

// Absolute imports for node_modules (if added)
import { vi, describe, it } from "vitest"
```

### Type Annotations (JSDoc)

Use JSDoc annotations for type documentation:

```javascript
/**
 * Filters heroes by name query
 * @param {Array<{name: string}>} heroes - Array of hero objects
 * @param {string} query - Search query string
 * @returns {Array} Filtered heroes array
 */
export const search = (heroes, query) => { ... }
```

### DOM Manipulation

- Use `document.querySelector()` for single elements
- Use `document.querySelectorAll()` for multiple elements
- Use `$element.replaceChildren()` to clear content
- Use `$element.appendChild()` instead of `$element.append()` for single nodes
- Use event delegation for repeated elements

```javascript
// Good: Event delegation
$tbody.addEventListener("click", (e) => {
  const row = e.target.closest("tr")
  if (row) { ... }
})

// Bad: Individual listeners (avoid)
filteredHeroes.forEach((hero) => {
  $row.addEventListener("click", () => { ... })
})
```

### Security (XSS Prevention)

- **Never** use `innerHTML` with untrusted data
- Use `textContent` for text values
- Use `createElement()` and `appendChild()` for HTML content

```javascript
// Good: Safe DOM manipulation
const $cell = document.createElement("td")
$cell.textContent = hero.name

// Bad: XSS vulnerability
$cell.innerHTML = `<td>${hero.name}</td>`
```

### Error Handling

- Always wrap async operations in try/catch
- Show user-friendly error messages in UI
- Log errors to console for debugging

```javascript
try {
  showLoading()
  allHeroes = await fetchHeroes()
  hideLoading()
  updateTable(allHeroes, 20, 1)
} catch (error) {
  hideLoading()
  showError("Failed to load heroes. Please refresh the page.")
}
```

### Performance Best Practices

1. **Debounce input handlers**:
   ```javascript
   import { debounce } from "./utils.js"
   const debouncedSearch = debounce((query) => { ... }, 300)
   ```

2. **Cache DOM references** (query once, use many):
   ```javascript
   const $tbody = document.querySelector("tbody") // Query once
   // Use $tbody multiple times...
   ```

3. **Move DOM queries outside loops**:
   ```javascript
   const dialog = document.getElementById("dialog") // Outside loop
   filteredHeroes.forEach((hero) => { ... })
   ```

4. **Use event delegation** instead of attaching listeners to each row

---

## Project Structure

```
sortable/
├── src/
│   ├── __tests__/          # Test files
│   │   └── main.test.js
│   ├── dom/                # DOM manipulation modules
│   │   ├── table.js
│   │   ├── pagination.js
│   │   └── hero-details.js
│   ├── fetchHeroes.js      # API fetching
│   ├── filter.js           # Search/filter logic
│   ├── utils.js            # Utility functions
│   └── script.js           # Main entry point
├── index.html
├── style.css
├── package.json
├── vite.config.js
├── vitest.config.js
├── .eslintrc.json
└── .prettierrc
```

---

## Testing Guidelines

- Place tests in `src/__tests__/` directory
- Name test files with `.test.js` suffix
- Use `describe`, `it`, `expect` from Vitest
- Use `vi` for vitest utilities (vi.fn(), vi.useFakeTimers(), etc.)
- Test one thing per test case

```javascript
import { describe, it, expect } from "vitest"
import { search } from "../src/filter.js"

describe("filter.js", () => {
  describe("search", () => {
    it("should filter heroes by name", () => {
      const heroes = [{ name: "Batman" }, { name: "Superman" }]
      expect(search(heroes, "batman")).toEqual([{ name: "Batman" }])
    })
  })
})
```

---

## Common Patterns

### Creating Table Cells Safely

```javascript
const createCell = (tag, text, attributes = {}) => {
  const $cell = document.createElement(tag)
  $cell.textContent = text
  Object.entries(attributes).forEach(([key, value]) => {
    $cell.setAttribute(key, value)
  })
  return $cell
}
```

### Debounced Search

```javascript
import { debounce } from "./utils.js"

const debouncedSearch = debounce((query) => {
  updateTable(search(heroes, query), perPage, 1)
}, 300)

$searchInput.addEventListener("input", (e) => {
  debouncedSearch(e.target.value)
})
```

### Error Boundaries

```javascript
const showError = (message) => {
  const errorElement = document.createElement("div")
  errorElement.id = "error"
  errorElement.textContent = message
  document.body.insertBefore(errorElement, document.querySelector("table"))
}
```

---

## Pre-Commit Checklist

Before committing:

- [ ] Run `npm run lint:fix` to fix linting issues
- [ ] Run `npm run format` to format code
- [ ] Run `npm run test` to ensure all tests pass
- [ ] Verify `npm run build` succeeds

---

## Adding New Dependencies

```bash
# Production dependency
npm install <package-name>

# Development dependency
npm install -D <package-name>
```

After adding new dependencies, update this file with any new commands or patterns.
