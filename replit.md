# StudyPal - AI Flashcards & Quiz Tool

## Overview

StudyPal is a React-based educational application that transforms study notes into interactive flashcards and quiz games using AI. The application features a modern, responsive design with light/dark theme support and is built using a full-stack TypeScript architecture with Express.js backend and React frontend.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom StudyPal color scheme
- **State Management**: React Query (TanStack Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Theme System**: Custom theme provider with light/dark mode support

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: Express sessions with PostgreSQL store (connect-pg-simple)
- **API Pattern**: RESTful API with /api prefix

### Storage Solutions
- **Primary Database**: PostgreSQL via Neon Database
- **ORM**: Drizzle ORM with TypeScript-first approach
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Development Storage**: In-memory storage fallback for development

## Key Components

### Core Features
1. **Flashcard System**: Interactive flip cards with front/back content
2. **Quiz Engine**: Multiple-choice questions with scoring
3. **AI Integration**: Transform notes into flashcards and quizzes (placeholder for AI service)
4. **Leaderboard**: User scoring and ranking system
5. **Theme System**: Light/dark mode toggle

### UI Components
- **Comprehensive Component Library**: Full set of Shadcn/ui components
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Accessibility**: ARIA-compliant components with keyboard navigation
- **Custom Styling**: StudyPal-specific color palette and branding

### Database Schema
- **Users Table**: Basic user management with username/password
- **Extensible Design**: Schema designed for future expansion with flashcard sets, quiz results, etc.

## Data Flow

1. **User Input**: Notes entered through textarea interface
2. **AI Processing**: Notes transformed into structured flashcards/quizzes (mock implementation)
3. **State Management**: React Query manages server state and caching
4. **Storage**: User data and progress stored in PostgreSQL
5. **Rendering**: Components render interactive study materials

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **drizzle-orm**: Database ORM and query builder
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight routing
- **@radix-ui/***: Accessible component primitives

### UI Dependencies
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library
- **embla-carousel-react**: Carousel functionality

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **@replit/vite-plugin-runtime-error-modal**: Development error handling

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite compiles React app to `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Database Migration**: Drizzle Kit handles schema migrations

### Environment Configuration
- **Development**: `npm run dev` - runs with hot reload
- **Production**: `npm run build && npm start`
- **Database**: Requires `DATABASE_URL` environment variable

### Platform Considerations
- **Replit Integration**: Configured for Replit deployment
- **PostgreSQL**: Requires provisioned database instance
- **Session Storage**: Uses PostgreSQL for session persistence

## Changelog

```
Changelog:
- July 07, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```