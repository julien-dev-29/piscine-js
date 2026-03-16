# Agent Guidelines for ClonerNews Project

## Project Overview
ClonerNews is a Hacker News clone built with vanilla JavaScript. The project fetches and displays news items from the Hacker News API.

## File Structure
```
object/clonernews/
├── api.js          # API functions for fetching data
├── app.js          # Main application entry point
├── Container.js    # Helper function for creating containers
├── index.html      # HTML entry point
├── style.css       # Styling
├── y18.svg         # Logo asset
└── components/     # Reusable UI components
    ├── Divider.js
    ├── H1.js
    ├── Header.js
    ├── ItemAuthor.js
    ├── ItemId.js
    ├── ItemTitle.js
    ├── Link.js
    ├── ListItem.js
    ├── Logo.js
    ├── Main.js
    ├── Navigation.js
    └── TopStory.js
```

## Build/Lint/Test Commands
Since this project doesn't have explicit build tools configured:

### Development
- Open `index.html` in a browser to view the application
- No build step required - vanilla JS runs directly in browser

### Testing
There are no automated tests configured in this project. To test manually:
1. Open `index.html` in a web browser
2. Verify that news items load and display correctly
3. Check console for any errors

### Code Quality
No linting or formatting tools are configured. Follow the code style guidelines below.

## Code Style Guidelines

### JavaScript Conventions
- Use ES6 module syntax (`import`/`export`)
- Prefer `const` for variables that don't reassignment
- Use `let` for variables that need reassignment
- Avoid `var`
- Use arrow functions for concise callbacks
- Use template literals for string interpolation
- End statements with semicolons

### File Organization
- One component per file
- Component files named in PascalCase (e.g., `Header.js`)
- Utility files named in camelCase (e.g., `api.js`)
- Place components in the `components/` directory

### Component Structure
- Export functions that return DOM elements
- Accept props as a single object parameter with destructuring
- Provide default values for props when appropriate
- Create elements using `document.createElement()`
- Set classes using `classList.add()`
- Append children using `append()` or `appendChild()`
- Return the root element at the end of the function

### Example Component Pattern
```javascript
export function ComponentName({ prop1 = "default", prop2 } = {}) {
  const $element = document.createElement("tag");
  $element.classList.add("class-name");
  // Set attributes, content, etc.
  $element.appendChild(childElement);
  return $element;
}
```

### API Functions
- Use `async`/`await` for promise handling
- Handle errors with `.catch()` or try/catch
- Export functions individually for tree-shaking
- Base URL constants should be defined when used multiple times

### DOM Manipulation
- Cache DOM queries when elements are reused
- Use `textContent` for text, `innerHTML` only when necessary (with sanitization)
- Prefer `append()` over `appendChild()` for multiple nodes
- Check for null when querying DOM elements

### Error Handling
- Catch and log API errors appropriately
- Provide fallback UI for failed requests
- Validate props in components when necessary
- Use console.error for development error logging

### Naming Conventions
- Variables and functions: camelCase
- Components and classes: PascalCase
- Constants: UPPER_SNAKE_CASE
- File names: match the export name (PascalCase for components, camelCase for utilities)
- DOM element variables: prefix with `$` (e.g., `$element`)

### CSS Guidelines
- Use semantic class names
- Prefix component-specific classes to avoid collisions
- Use flexbox or grid for layout
- Define colors and spacing as CSS variables when reused
- Mobile-first responsive design

### Import/Export Rules
- Named exports only (no default exports in this codebase)
- Import from relative paths using `./` prefix
- Group imports: external, internal, components
- Align import statements for readability
- Place component imports together

Example:
```javascript
// External imports (none in this project)
// Internal imports
import { getStory } from "../api.js";
// Component imports
import { ItemId } from "./ItemId.js";
import { ItemTitle } from "./ItemTitle.js";
```

### Commenting
- Use JSDoc for complex functions
- Comment why, not what
- Keep comments up-to-date
- Remove commented-out code

### Performance Considerations
- Minimize DOM reflows
- Use document fragments for bulk inserts
- Debounce frequent events (resize, scroll)
- Consider lazy loading for images
- Clean up event listeners when appropriate

## Additional Notes
This project is intentionally simple and educational. The focus is on understanding:
- Fetching data from APIs
- Creating DOM elements programmatically
- Organizing code with ES6 modules
- Building reusable components
- Handling asynchronous operations

When modifying this codebase:
1. Maintain the existing patterns and conventions
2. Keep components focused and reusable
3. Handle edge cases gracefully
4. Ensure the application remains functional
5. Follow the established code style