# AGENTS.md - Tron Game Codebase

## Project Overview

This is a vanilla JavaScript Tron game that runs directly in the browser using ES modules. It supports both WebGL and Canvas 2D rendering backends.

## Running the Project

Since this is vanilla JavaScript with no build system, you need to serve the files with a local HTTP server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

Then open http://localhost:8000 in your browser.

## Testing

**No test framework is currently set up.** This is a vanilla JS project with no automated tests.

## Code Style Guidelines

### General Principles

- Write minimal, performant code - avoid unnecessary abstractions
- Prefer simple solutions over complex ones
- Keep functions small and focused

### Formatting

- Use **2 spaces** for indentation
- Use **semicolons** at the end of statements
- Use **double quotes** for HTML attributes, single quotes for JS strings (be consistent within files)
- Use **template literals** for string interpolation
- Keep lines reasonably short (under 100 characters when practical)

### Naming Conventions

- Use **snake_case** for variables: `const maxTurn = 100`
- Use **camelCase** for functions: `function movePlayer(x, y)`
- Use **UPPER_SNAKE_CASE** for constants: `const MAX_SIZE = 100`
- Prefix boolean variables with `is`, `has`, `can`, or `should`: `const isDead = true`

### JavaScript Patterns

- Use `const` by default; only use `let` when reassignment is necessary
- Use **arrow functions** for callbacks and short functions
- Use **template literals** instead of string concatenation
- Use **strict equality** (`===` and `!==`) exclusively
- Use **destructuring** when appropriate: `const { x, y } = position`
- Use **async/await** over raw promises when async code is needed
- Use **for-of** loops over for-in when iterating over values

### Imports and Exports

- Use ES module syntax: `import { fn } from './module.js'`
- Use named exports: `export const myFn = () => {}`
- Order imports at the top of files
- Group related constants and functions

### Error Handling

- Throw errors with descriptive messages: `throw Error('Descriptive message')`
- Use try/catch for async operations and external code
- Use try/catch in worker initialization to catch runtime errors
- Log errors with context: `console.error('Context', err)`

### Performance Considerations

- Use `Float32Array` for numerical data (as seen in display.js)
- Use memoization for expensive computations
- Minimize DOM access; cache element references
- Use Web Workers for heavy computation (as done with AI players)

### Canvas/WebGL

- Initialize canvas context once and reuse
- Use `requestAnimationFrame` for game loops
- Batch state updates before rendering

### Code to Avoid

- **Avoid** `var` - use `const`/`let` only
- **Avoid** `new Function()` - use `eval()` sparingly if at all
- **Avoid** changing `Function.prototype`
- **Avoid** global variables except when necessary
- **Avoid** unnecessary comments - let code be self-documenting
- **Avoid** over-abstraction; keep it simple

## File Structure

```
tron/
  index.html         # Main game entry, UI, game loop
  state.js           # Game state, AI initialization, worker code injection
  display.js         # WebGL rendering implementation
  display-canvas.js  # Canvas 2D fallback rendering
```

## Making Changes

1. Test in browser after changes (no automated tests)
2. Ensure game still runs: two AI players can play against each other
3. Check for console errors
4. Verify both WebGL and Canvas rendering work (if changing display code)

## External Dependencies

None - this is a pure vanilla JavaScript project with no npm packages.
