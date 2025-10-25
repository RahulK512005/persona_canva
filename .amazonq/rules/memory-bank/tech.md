# Technology Stack

## Programming Languages
- **JavaScript (ES6+)**: Primary language using modern ECMAScript features
- **JSX**: React's JavaScript XML syntax for component templates
- **CSS**: Styling with Tailwind utility classes

## Core Framework
- **React 18.2.0**: Latest React version with concurrent features and automatic batching
- **React DOM 18.2.0**: React renderer for web applications

## Build System
- **Vite 5.0.8**: Next-generation frontend build tool
  - Lightning-fast HMR (Hot Module Replacement)
  - Optimized production builds with Rollup
  - Native ES modules in development
- **@vitejs/plugin-react 4.2.1**: Official Vite plugin for React Fast Refresh
- **vite-tsconfig-paths 4.2.2**: Enables path aliases from jsconfig.json

## Routing
- **React Router DOM 6.20.0**: Declarative routing for React
  - BrowserRouter for HTML5 history API
  - Routes and Route components for route definition
  - Nested routing support

## State Management
- **Redux Toolkit 2.0.1**: Official Redux toolset with simplified API
- **React Redux 9.0.4**: Official React bindings for Redux

## Styling
- **Tailwind CSS 3.4.0**: Utility-first CSS framework
- **PostCSS 8.4.32**: CSS transformation tool
- **Autoprefixer 10.4.16**: Automatic vendor prefix addition
- **tailwind-merge 2.1.0**: Merge Tailwind classes without conflicts
- **clsx 2.0.0**: Conditional class name utility
- **class-variance-authority 0.7.0**: Type-safe component variants

### Tailwind Plugins
- **@tailwindcss/forms 0.5.7**: Form element styling
- **@tailwindcss/typography 0.5.10**: Beautiful typographic defaults
- **@tailwindcss/aspect-ratio 0.4.2**: Aspect ratio utilities
- **@tailwindcss/container-queries 0.1.1**: Container query support
- **tailwindcss-animate 1.0.7**: Animation utilities

## UI Components
- **Radix UI (@radix-ui/react-slot 1.0.2)**: Unstyled, accessible component primitives
- **Lucide React 0.294.0**: Beautiful and consistent icon library

## Data Visualization
- **D3.js 7.8.5**: Powerful data visualization library
- **Recharts 2.10.3**: Composable charting library built on React and D3

## Form Management
- **React Hook Form 7.49.2**: Performant form validation with minimal re-renders

## Animation
- **Framer Motion 10.16.16**: Production-ready motion library for React

## Development Tools
- **@dhiwise/component-tagger 1.0.0**: Component tagging for development

## Configuration Files
- **package.json**: Dependencies, scripts, and project metadata
- **vite.config.mjs**: Vite configuration (ES module format)
- **tailwind.config.js**: Tailwind CSS customization
- **postcss.config.cjs**: PostCSS plugins configuration (CommonJS format)
- **jsconfig.json**: JavaScript project configuration and path aliases
- **.env**: Environment variables

## Development Commands

### Start Development Server
```bash
npm run dev
# or
npm start
```
Starts Vite dev server with hot module replacement

### Build for Production
```bash
npm run build
```
Creates optimized production build in `dist/` directory

### Preview Production Build
```bash
npm run preview
```
Locally preview the production build

## Module System
- **Type: "module"** in package.json enables ES modules
- Uses import/export syntax throughout
- .mjs extension for explicit ES modules
- .cjs extension for explicit CommonJS modules

## Browser Support
Modern browsers with ES6+ support required for optimal performance
