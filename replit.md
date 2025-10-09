# Ramanujan College Website

## Overview

This is a modern, responsive website for Ramanujan College, University of Delhi - a NAAC A++ graded educational institution. The application serves as the college's digital presence, providing information about academics, admissions, news, events, and student life. Built with React and TypeScript on the frontend, Express.js on the backend, and PostgreSQL for data persistence, the site follows modern web development practices with a focus on performance, accessibility, and user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development patterns
- **Routing**: Wouter for lightweight client-side routing without the overhead of React Router
- **UI Components**: shadcn/ui component library built on Radix UI primitives for accessibility and customization
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for consistent theming
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework for RESTful API endpoints
- **Language**: TypeScript for end-to-end type safety
- **API Design**: RESTful architecture with dedicated routes for notices, events, news, departments, courses, faculty, and facilities
- **Validation**: Zod schemas shared between frontend and backend for consistent data validation
- **Storage Interface**: Abstract storage interface (IStorage) with in-memory implementation, designed for easy database integration

### Data Layer
- **ORM**: Drizzle ORM configured for PostgreSQL with type-safe database operations
- **Database**: PostgreSQL (via Neon serverless) for production-ready data persistence
- **Schema**: Comprehensive schema covering users, notices, events, news, departments, courses, faculty, and facilities
- **Migrations**: Drizzle Kit for database schema management and migrations

### UI/UX Design System
- **Component Library**: shadcn/ui providing consistent, accessible components
- **Design Tokens**: CSS custom properties for colors, spacing, typography, and shadows
- **Typography**: Inter for sans-serif, Playfair Display for serif headings
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts
- **Dark Mode**: Built-in support through CSS variables and class-based theme switching

### Content Management
- **Notices**: Categorized announcements with priority levels and publication dates
- **Events**: Time-based events with location and category information
- **News**: Featured articles with author attribution and image support
- **Academic Data**: Departments, courses, and faculty information with relationships

### Development Environment
- **Hot Reload**: Vite development server with HMR for rapid development
- **Code Quality**: TypeScript strict mode with comprehensive type checking
- **Path Aliases**: Configured for clean imports (@/ for client, @shared for common code)
- **Error Handling**: Runtime error overlay for development debugging
- **Replit Configuration**: Configured with workflow on port 5000, allowedHosts enabled for proxy compatibility

### Replit Environment Setup
- **Workflow**: "Start application" runs `npm run dev` on port 5000 (webview)
- **Dev Server**: Vite configured with `allowedHosts: true` for Replit proxy compatibility
- **Host Configuration**: Server binds to 0.0.0.0:5000 to accept Replit proxy connections
- **Database**: PostgreSQL database provisioned and schema synced using `npm run db:push`
- **Storage**: Currently using in-memory storage (MemStorage) - PostgreSQL database available for persistent storage
- **Deployment**: Configured for autoscale deployment with build and start scripts

### Recent Changes (October 9, 2025)
- **College Management System**: Comprehensive multi-role system implemented
- **Database Schema**: Extended with users, faculty ratings, rating links, student dues, and payments tables
- **Authentication System**: Role-based authentication (Student, Teacher, Management, Admin, Principal) with bcrypt password hashing
- **Teacher Rating System**: Link-based rating system where Management generates shareable links, students submit ratings, rankings visible to all, actual ratings only to Principal
- **Payment Management**: UPI/QR payment system with screenshot verification and dues tracking
- **New Pages**: Login, Signup, Dashboard (role-based), Rate Teacher, Payments, Students (with filters)
- **Backend API**: Complete RESTful API with role-based middleware and Zod validation
- **Student Data**: 80 dummy students populated (50 current, 30 passed out) with rank, stream, section, and year
- **Faculty Data**: Real faculty information imported from CSV (65+ teachers from various departments)
- **Students Page Design**: Exact match to design mockup with green filter buttons, search, rank display, 4-column grid
- **Storage**: In-memory storage (MemStorage) with comprehensive CRUD operations
- **Deployment**: Production deployment configured for autoscale with build and start scripts

## External Dependencies

### UI and Styling
- **shadcn/ui**: Pre-built accessible components based on Radix UI
- **Radix UI**: Unstyled, accessible UI primitives for complex components
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **Lucide React**: Icon library providing consistent iconography
- **class-variance-authority**: Type-safe CSS class generation for component variants

### Data and State Management
- **TanStack Query**: Server state management with caching, background updates, and optimistic updates
- **React Hook Form**: Performant form library with minimal re-renders
- **Zod**: TypeScript-first schema validation for forms and API data
- **date-fns**: Modern date utility library for formatting and manipulation

### Backend Infrastructure
- **Drizzle ORM**: Lightweight TypeScript ORM with excellent PostgreSQL support
- **Neon Database**: Serverless PostgreSQL with connection pooling and scaling
- **Express.js**: Minimal web framework for API routes and middleware
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### Development Tools
- **Vite**: Fast build tool with plugins for React and development features
- **TypeScript**: Static type checking across the entire application
- **ESBuild**: Fast JavaScript bundler used by Vite for production builds
- **Replit Integration**: Development environment optimizations for Replit hosting

### Authentication & Security
- **Session Management**: Express sessions with PostgreSQL storage
- **CORS**: Configured for secure cross-origin requests
- **Input Validation**: Zod schemas prevent malformed data from reaching the database

The architecture emphasizes developer experience, type safety, and maintainability while providing a solid foundation for a content-rich educational website. The modular design allows for easy feature additions and modifications as the college's needs evolve.