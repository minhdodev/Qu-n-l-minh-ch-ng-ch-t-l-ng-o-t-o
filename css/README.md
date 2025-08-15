# CSS Structure for Quality Management System

This folder contains all CSS files for the Quality Management System (QMS) web application.

## CSS Organization

The CSS in this project is organized using a hybrid approach:

1. **Global Styles (styles.css)**:
   - Contains common styling elements used across all pages
   - Defines base variables like colors, typography, spacing
   - Handles layout components like header, sidebar, footer
   - Contains shared UI components like buttons, forms, tables, pagination

2. **Page-Specific CSS Files**:
   - Each major feature has its own CSS file for specific components and layouts
   - These files contain only styles relevant to their specific page/feature
   - Examples include:
     - `metrics.css`: Styles for performance metrics page
     - `nonconformance.css`: Styles for nonconformance reports
     - `reports.css`: Styles for reporting features
     - etc.

## Style Guidelines

- Use CSS variables defined in `styles.css` for consistent theming
- Follow BEM (Block Element Modifier) naming convention
- Keep selectors as specific as necessary but no more
- Comment sections of code for readability
- Use responsive design patterns for all components

## Media Queries

Media queries are used for responsive design:

- 1200px: Large desktops
- 992px: Medium desktops and laptops
- 768px: Tablets and small laptops
- 480px: Mobile devices

## CSS Variables

Common variables are defined in the `:root` selector in `styles.css`:

- Color scheme (primary, secondary, backgrounds, text)
- Spacing values
- Typography settings
- Box shadows
- Border radiuses

## How to Add Styles for New Features

1. First, check if your component can use existing styles from `styles.css`
2. If you need page-specific styles, create a new CSS file named after your feature
3. Add the CSS file link to your HTML page after the `styles.css` link
4. Use the CSS variables from `styles.css` for consistent styling
5. Implement responsive design using the established breakpoints

## Maintenance Guidelines

- Keep page-specific CSS files focused only on what's unique to that page
- Move commonly used styles to `styles.css`
- Periodically review and refactor CSS to eliminate duplication
- Maintain consistent naming conventions across files 