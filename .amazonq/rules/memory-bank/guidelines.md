# Development Guidelines

## Code Quality Standards

### File Structure and Organization
- **One component per file**: Each component resides in its own file with the same name
- **Index files for pages**: Page directories contain an `index.jsx` as the main entry point
- **Component co-location**: Page-specific components are organized in a `components/` subdirectory within the page folder
- **Utility separation**: Helper functions are isolated in the `utils/` directory

### Naming Conventions
- **PascalCase for components**: All React components use PascalCase (e.g., `LeadershipDashboard`, `WelcomeHeader`)
- **camelCase for functions**: Utility functions and variables use camelCase (e.g., `cn`, `handleGoHome`)
- **Descriptive names**: Component and function names clearly describe their purpose
- **File extensions**: Use `.jsx` for React components, `.js` for utilities

### Import Organization
- **React first**: React imports always appear first
- **Third-party libraries**: External dependencies follow React imports
- **Internal components**: Local component imports come after third-party libraries
- **Utilities last**: Utility imports appear at the end
- **Relative paths**: Use relative imports for local files (e.g., `'../../utils/cn'`)

Example from codebase:
```javascript
import React from 'react';
import { motion } from 'framer-motion';
import NavigationBar from '../../components/ui/NavigationBar';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import LoadingShimmer from '../../components/ui/LoadingShimmer';
```

## Component Patterns

### Functional Components with Hooks
- **Always use functional components**: Class components only for ErrorBoundary
- **React.forwardRef for reusable UI**: Use forwardRef for components that need ref forwarding
- **Hooks for state and effects**: useState, useEffect, useLocation, useNavigate

Example:
```javascript
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};
```

### Component Composition
- **Props destructuring**: Destructure props in function parameters with defaults
- **Spread remaining props**: Use `...props` to pass through additional props
- **Default values**: Provide sensible defaults for optional props

Example from Button component:
```javascript
const Button = React.forwardRef(({
    className,
    variant,
    size,
    asChild = false,
    children,
    loading = false,
    iconName = null,
    iconPosition = 'left',
    iconSize = null,
    fullWidth = false,
    disabled = false,
    ...props
}, ref) => {
    // Component logic
});
```

### Error Handling
- **Graceful fallbacks**: Components handle errors without crashing
- **Optional chaining**: Use `?.` for safe property access
- **Try-catch blocks**: Wrap potentially failing operations
- **Fallback UI**: Provide alternative rendering when errors occur

Example from AppIcon:
```javascript
const IconComponent = LucideIcons?.[name];

if (!IconComponent) {
    return <HelpCircle size={size} color="gray" strokeWidth={strokeWidth} className={className} {...props} />;
}
```

## Styling Practices

### Tailwind CSS Utility Classes
- **Utility-first approach**: Use Tailwind classes directly in JSX
- **Responsive design**: Apply responsive prefixes (sm:, md:, lg:, xl:)
- **Semantic color tokens**: Use theme colors (primary, secondary, background, foreground)
- **Spacing consistency**: Use Tailwind spacing scale (px-4, py-2, gap-6, mb-8)

### Class Name Composition
- **cn utility function**: Always use `cn()` for combining classes
- **Conditional classes**: Use cn() for dynamic class application
- **Class merging**: cn() handles Tailwind class conflicts automatically

Example from Input component:
```javascript
import { cn } from "../../utils/cn";

className={cn(
    baseInputClasses,
    error && "border-destructive focus-visible:ring-destructive",
    className
)}
```

### Component Variants with CVA
- **class-variance-authority**: Use cva() for component variant systems
- **Variant definitions**: Define variants and sizes in configuration objects
- **Default variants**: Always specify defaultVariants

Example from Button:
```javascript
import { cva } from "class-variance-authority";

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90",
                destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline: "border border-input hover:bg-accent hover:text-accent-foreground",
                // ... more variants
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                // ... more sizes
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);
```

## Animation and Motion

### Framer Motion Integration
- **motion components**: Wrap elements with motion.div for animations
- **Initial and animate states**: Define entry animations with initial and animate props
- **Staggered animations**: Use delay for sequential element animations
- **Transition configuration**: Specify duration and easing for smooth animations

Example from LeadershipDashboard:
```javascript
<motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1 }}>
    <DailyReflectionCard reflectionData={reflectionData} />
</motion.div>
```

## State Management

### Local State with useState
- **Component-level state**: Use useState for component-specific data
- **Descriptive state names**: Name state variables clearly (isLoading, userData, feedbackData)
- **Initial values**: Provide appropriate initial state values

### Side Effects with useEffect
- **Dependency arrays**: Always specify dependencies correctly
- **Cleanup functions**: Return cleanup functions when needed
- **Simulated loading**: Use setTimeout for loading states in development

Example:
```javascript
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
    const timer = setTimeout(() => {
        setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
}, []);
```

## Routing Patterns

### React Router v6
- **BrowserRouter wrapper**: Wrap entire app in BrowserRouter
- **Routes and Route**: Use Routes component with nested Route elements
- **useNavigate hook**: Use for programmatic navigation
- **useLocation hook**: Access current location for scroll restoration

Example from Routes.jsx:
```javascript
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";

<BrowserRouter>
    <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
            <Route path="/" element={<LeadershipDashboard />} />
            <Route path="/team-feedback-dashboard" element={<TeamFeedbackDashboard />} />
            <Route path="*" element={<NotFound />} />
        </RouterRoutes>
    </ErrorBoundary>
</BrowserRouter>
```

## Data Handling

### Mock Data Structure
- **Descriptive variable names**: Use clear names like userData, reflectionData, insightsData
- **Structured objects**: Organize data in logical object structures
- **Array of objects**: Use arrays for lists with consistent object shapes
- **Realistic data**: Include realistic mock data for development

### Props Passing
- **Destructured props**: Pass data as named props to child components
- **Single data objects**: Group related data into single prop objects
- **Prop drilling awareness**: Keep component hierarchy shallow when possible

## UI Component Library Patterns

### Radix UI Integration
- **Slot component**: Use @radix-ui/react-slot for polymorphic components
- **asChild pattern**: Support asChild prop for component composition
- **Accessible primitives**: Leverage Radix UI for accessibility

### Icon System
- **Lucide React**: Use Lucide icons throughout the application
- **Icon wrapper component**: Use AppIcon component for consistent icon rendering
- **Dynamic icon loading**: Load icons by name string
- **Fallback icons**: Provide HelpCircle as fallback for missing icons

Example:
```javascript
import * as LucideIcons from 'lucide-react';

const IconComponent = LucideIcons?.[name];
if (!IconComponent) {
    return <HelpCircle size={size} color="gray" />;
}
```

### Image Handling
- **Error handling**: Provide fallback images with onError handler
- **Alt text**: Always include descriptive alt attributes
- **Lazy loading**: Consider lazy loading for performance

Example from AppImage:
```javascript
<img
    src={src}
    alt={alt}
    className={className}
    onError={(e) => {
        e.target.src = "/assets/images/no_image.png"
    }}
    {...props}
/>
```

## Loading States

### Loading Shimmer Pattern
- **Consistent loading UI**: Use LoadingShimmer component for skeleton screens
- **Variant support**: Use appropriate variants (card, chart, etc.)
- **Grid matching**: Match loading skeleton to actual content layout
- **Timed transitions**: Use setTimeout to simulate data loading

Example:
```javascript
if (isLoading) {
    return (
        <div className="min-h-screen bg-background">
            <NavigationBar />
            <div className="pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <LoadingShimmer variant="card" className="mb-8" lines={2} />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        <LoadingShimmer variant="card" lines={4} />
                    </div>
                </div>
            </div>
        </div>
    );
}
```

## Accessibility Standards

### Semantic HTML
- **Proper element usage**: Use semantic HTML elements (button, input, label)
- **Form associations**: Link labels to inputs with htmlFor and id
- **ARIA attributes**: Include ARIA attributes when needed

### Keyboard Navigation
- **Focus management**: Ensure all interactive elements are keyboard accessible
- **Focus indicators**: Use focus-visible classes for keyboard focus styles
- **Tab order**: Maintain logical tab order

### Screen Reader Support
- **Alt text**: Provide descriptive alt text for images
- **Labels**: Include labels for all form inputs
- **Error messages**: Associate error messages with form fields

## Performance Optimization

### Component Rendering
- **React.forwardRef**: Use for ref forwarding without extra wrappers
- **Conditional rendering**: Use early returns for loading and error states
- **Memoization awareness**: Consider useMemo and useCallback for expensive operations

### Code Splitting
- **Page-level splitting**: Each page is a separate module
- **Dynamic imports**: Consider lazy loading for large components
- **Route-based splitting**: Leverage React Router for automatic code splitting

## Testing Considerations

### Component Structure for Testing
- **displayName**: Set displayName for forwardRef components
- **Unique IDs**: Generate unique IDs for form elements
- **Data attributes**: Consider adding data-testid attributes for testing

Example:
```javascript
Button.displayName = "Button";
Input.displayName = "Input";
```

## Documentation Standards

### Code Comments
- **Minimal comments**: Write self-documenting code
- **Complex logic**: Comment only complex or non-obvious logic
- **JSDoc for utilities**: Consider JSDoc comments for utility functions

### Component Documentation
- **Prop descriptions**: Document component props through TypeScript or PropTypes (when added)
- **Usage examples**: Provide examples in component files or Storybook
- **README updates**: Keep README.md current with project changes
