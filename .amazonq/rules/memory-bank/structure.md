# Project Structure

## Directory Organization

```
Hack_Atria/
├── .amazonq/rules/memory-bank/    # Amazon Q documentation and rules
├── public/                         # Static assets and public files
│   ├── assets/images/             # Image resources
│   ├── favicon.ico                # Site favicon
│   ├── manifest.json              # PWA manifest
│   └── robots.txt                 # Search engine directives
├── src/                           # Source code
│   ├── components/                # Reusable UI components
│   │   ├── ui/                    # UI component library
│   │   ├── AppIcon.jsx            # Icon wrapper component
│   │   ├── AppImage.jsx           # Image wrapper component
│   │   ├── ErrorBoundary.jsx      # Error handling component
│   │   └── ScrollToTop.jsx        # Scroll restoration utility
│   ├── pages/                     # Page-level components
│   │   ├── ai-analysis-results/   # AI insights page
│   │   ├── daily-reflection/      # Daily reflection page
│   │   ├── leadership-dashboard/  # Main dashboard page
│   │   ├── leadership-history/    # Historical tracking page
│   │   ├── learning-resources/    # Learning materials page
│   │   ├── team-feedback-dashboard/ # Team feedback page
│   │   └── NotFound.jsx           # 404 error page
│   ├── styles/                    # Global styles
│   │   ├── index.css              # Main stylesheet
│   │   └── tailwind.css           # Tailwind imports
│   ├── utils/                     # Utility functions
│   │   └── cn.js                  # Class name utility
│   ├── App.jsx                    # Root application component
│   ├── index.jsx                  # Application entry point
│   └── Routes.jsx                 # Route configuration
├── .env                           # Environment variables
├── index.html                     # HTML template
├── jsconfig.json                  # JavaScript configuration
├── package.json                   # Dependencies and scripts
├── postcss.config.cjs             # PostCSS configuration
├── tailwind.config.js             # Tailwind CSS configuration
└── vite.config.mjs                # Vite build configuration
```

## Core Components

### Application Entry
- **index.jsx**: Renders the root App component into the DOM
- **App.jsx**: Wraps the application with providers and global components
- **Routes.jsx**: Defines all application routes using React Router v6

### Page Architecture
Each page follows a modular structure:
- **index.jsx**: Main page component and logic
- **components/**: Page-specific components organized in subdirectories

Pages are organized by feature:
- Leadership Dashboard (home page)
- Team Feedback Dashboard
- AI Analysis Results
- Leadership History
- Learning Resources
- Daily Reflection

### Component Library
- **ui/**: Reusable UI components built with Radix UI primitives
- **AppIcon.jsx**: Standardized icon rendering with Lucide React
- **AppImage.jsx**: Optimized image component with lazy loading
- **ErrorBoundary.jsx**: Catches and handles React errors gracefully
- **ScrollToTop.jsx**: Restores scroll position on route changes

### Utilities
- **cn.js**: Combines Tailwind classes using tailwind-merge and clsx for conditional styling

## Architectural Patterns

### Component-Based Architecture
- Functional components with React Hooks
- Component composition over inheritance
- Separation of concerns between pages and reusable components

### Route-Based Code Splitting
- Each page is a separate module for optimal bundle size
- Lazy loading potential for improved performance

### Feature-Based Organization
- Pages organized by feature domain
- Co-located components within feature directories
- Promotes modularity and maintainability

### Styling Strategy
- Utility-first approach with Tailwind CSS
- Component-level styling with class composition
- Global styles for base configuration

### Error Handling
- ErrorBoundary wraps the entire application
- Graceful degradation for component failures
- NotFound page for invalid routes
