# Calculadora Química - Chemistry Calculator Application

## Overview

Calculadora Química is a comprehensive web application designed for chemistry calculations, providing specialized calculators for various analytical chemistry computations. The application features six core calculators: Peso Miliequivalente (milliequivalent weight), Normalidad (normality), Miligramos (milligrams calculation), Porcentaje (percentage analysis), Potencial Eléctrico (electrical potential using Nernst equation), and Peso Molecular (molecular weight). Built as a modern single-page application, it serves chemistry students and professionals who need quick access to reliable calculation tools for volumetric analysis, electrochemistry, and molecular composition analysis.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application follows a modern React-based architecture using TypeScript for type safety. The frontend is built with Vite as the build tool and bundler, providing fast development and optimized production builds. The component structure follows a modular approach with a clear separation between UI components, calculator logic, and data management.

The UI architecture leverages shadcn/ui components built on top of Radix UI primitives, providing a consistent and accessible design system. The styling is handled through Tailwind CSS with custom CSS variables for theming, allowing for easy customization and dark mode support. The application uses Wouter for client-side routing, which is lightweight and suitable for single-page applications.

State management is handled through React Query (TanStack Query) for server state and React's built-in useState for local component state. Form handling utilizes React Hook Form with Zod validation schemas for type-safe form validation. The calculator components are self-contained and manage their own state, making them easily testable and reusable.

### Backend Architecture
The backend follows a Node.js/Express architecture with TypeScript support. The server is structured with a clear separation of concerns using a route registration system and middleware pattern. The application uses a modular storage interface that allows for easy switching between different storage implementations.

Currently, the storage layer implements an in-memory storage system for user data, but is designed with an interface that can be extended to support database backends. The server includes comprehensive logging middleware that tracks API requests and responses for debugging and monitoring purposes.

The server architecture includes error handling middleware and is configured to serve the frontend static files in production while supporting Vite's development server in development mode.

### Data Storage Solutions
The application currently uses an in-memory storage system implemented through a TypeScript interface pattern. This design allows for easy migration to persistent storage solutions like PostgreSQL when needed. The storage interface defines CRUD operations for user management and can be extended to support additional data types.

Database schema is defined using Drizzle ORM with PostgreSQL dialect configuration, indicating preparation for database integration. The schema includes user authentication tables with UUID primary keys and unique constraints.

### Authentication and Authorization
The application includes a foundational authentication system with user schema definitions supporting username/password authentication. The schema uses Drizzle-Zod for runtime validation of user input data. Session management is configured to support PostgreSQL-based session storage through connect-pg-simple.

### External Service Integrations
The application integrates with Neon Database for PostgreSQL hosting, as evidenced by the @neondatabase/serverless dependency. This provides a scalable, serverless database solution for production deployments.

The frontend includes Replit-specific integrations for development and deployment, including runtime error overlays and cartographer plugins for enhanced development experience within the Replit environment.

Chemical data is embedded within the application rather than fetched from external APIs, ensuring fast calculation performance and offline capability. The periodic table data and electrochemical compound data are stored as TypeScript objects with proper type definitions.

## External Dependencies

### Database and ORM
- **Drizzle ORM**: Type-safe database ORM with PostgreSQL dialect support
- **Drizzle Kit**: Database migration and schema management tool
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### Frontend Framework and Build Tools
- **React**: Component-based UI framework with TypeScript support
- **Vite**: Fast build tool and development server with HMR support
- **TypeScript**: Static type checking and enhanced developer experience
- **Wouter**: Lightweight client-side routing library

### UI Components and Styling
- **Radix UI**: Comprehensive collection of accessible UI primitives
- **shadcn/ui**: Pre-built component library based on Radix UI
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Lucide React**: Icon library providing consistent iconography
- **class-variance-authority**: Type-safe variant API for component styling

### Form Handling and Validation
- **React Hook Form**: Performant form library with minimal re-renders
- **@hookform/resolvers**: Validation resolvers for React Hook Form
- **Zod**: TypeScript-first schema validation library
- **drizzle-zod**: Integration between Drizzle ORM and Zod validation

### State Management and Data Fetching
- **TanStack React Query**: Powerful data synchronization for React applications
- **React Query**: Server state management and caching solution

### Development and Build Tools
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing tool with Autoprefixer support
- **tsx**: TypeScript execution environment for development
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **@replit/vite-plugin-cartographer**: Enhanced development experience for Replit

### Utility Libraries
- **clsx**: Utility for conditionally constructing className strings
- **tailwind-merge**: Utility for merging Tailwind CSS classes
- **date-fns**: Modern JavaScript date utility library
- **nanoid**: URL-safe unique string ID generator

### UI Enhancement Libraries
- **embla-carousel-react**: Carousel component for image/content slideshows
- **cmdk**: Command menu component for enhanced user interaction
- **vaul**: Drawer component library for mobile-friendly interfaces