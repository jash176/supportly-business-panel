# Architecture Documentation

## 1. Overview

This application is a chat dashboard with a client-server architecture. It's a full-stack JavaScript/TypeScript application built with React on the frontend and Express.js on the backend. The application follows a modern web application architecture with a RESTful API backend and a single-page application (SPA) frontend.

The system appears to be a customer chat management dashboard named "ChatDash" that allows users to manage communications with customers, track visitors, manage contacts, and configure various settings.

## 2. System Architecture

### 2.1 High-Level Architecture

The application follows a three-tier architecture:

1. **Frontend/Client Layer**: React-based SPA using modern React patterns
2. **Backend/Server Layer**: Express.js REST API 
3. **Data Layer**: PostgreSQL database with Drizzle ORM

### 2.2 Frontend Architecture

The frontend is a React application built with:
- TypeScript for type safety
- Tailwind CSS for styling
- Radix UI primitives with Shadcn UI components
- React Query for data fetching and state management
- Wouter for client-side routing

The frontend follows a component-based architecture with a structured page layout. Component organization reflects the domain model of the application (inbox, contacts, visitors, settings).

### 2.3 Backend Architecture

The backend is an Express.js server that:
- Serves the frontend static assets in production
- Provides RESTful API endpoints
- Implements a data storage layer that abstracts database operations

The backend uses a modular architecture with clear separation between routes and storage concerns.

### 2.4 Data Architecture

The data layer uses Drizzle ORM with PostgreSQL:
- Schema defined in shared TypeScript files
- Zod for schema validation and type generation
- Database connections managed by `@neondatabase/serverless` adapter

## 3. Key Components

### 3.1 Frontend Components

#### 3.1.1 Core Structure
- `App.tsx`: Main application component with routing configuration
- `MainLayout`: Wrapper layout that includes common UI elements across pages

#### 3.1.2 Pages
- `Inbox`: Chat interface to interact with customers
- `Contacts`: Contact management and customer information
- `Visitors`: Map view of current site visitors
- `Settings`: Application configuration

#### 3.1.3 UI Components
- Component library based on Radix UI primitives
- Shadcn UI styling conventions
- Custom components for domain-specific functionality

### 3.2 Backend Components

#### 3.2.1 Server
- `server/index.ts`: Express.js server setup, middleware configuration
- `server/routes.ts`: API route definitions and request handling
- `server/vite.ts`: Development server configuration for Vite

#### 3.2.2 Data Access
- `server/storage.ts`: Interface for data storage and retrieval
- Currently using in-memory storage implementation (`MemStorage`)
- Designed to be replaced with a database implementation

#### 3.2.3 Shared Models
- `shared/schema.ts`: Database schema definitions using Drizzle ORM
- Type definitions shared between frontend and backend

## 4. Data Flow

### 4.1 Client-Server Communication

1. Frontend components make API requests using React Query
2. Requests are sent to the Express backend via RESTful endpoints
3. Server processes requests and interacts with the data layer
4. Responses are sent back to the client as JSON
5. React Query manages caching and state updates

### 4.2 Data Persistence

1. Express routes call methods on the storage interface
2. Storage implementation (currently in-memory, can be replaced with database)
3. Drizzle ORM handles database operations with PostgreSQL

### 4.3 Authentication Flow

Authentication is planned but not fully implemented. The current infrastructure supports:
- User storage and retrieval
- Password storage (though not with hashing in the current implementation)

## 5. External Dependencies

### 5.1 Frontend Dependencies

- **React**: UI library
- **TanStack Query**: Data fetching and state management
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible UI primitives
- **Wouter**: Lightweight routing library
- **Shadcn UI**: Component styling system

### 5.2 Backend Dependencies

- **Express**: Web server framework
- **Drizzle ORM**: Database ORM
- **Zod**: Schema validation
- **Neon Database**: PostgreSQL serverless driver

### 5.3 Development Dependencies

- **Vite**: Frontend build tool and development server
- **TypeScript**: Static typing
- **ESBuild**: JavaScript bundler for production builds

## 6. Deployment Strategy

The application is configured for deployment on Replit, as indicated by the `.replit` configuration file:

### 6.1 Development Environment

- Vite dev server for frontend hot module replacement
- Express server for API endpoints
- Both run concurrently during development

### 6.2 Production Build

1. Frontend assets are built with Vite (`vite build`)
2. Backend is bundled with ESBuild
3. Static assets are served by Express in production

### 6.3 Database Strategy

- Using Drizzle ORM for database management
- Schema migrations handled by Drizzle Kit
- Support for PostgreSQL via Neon Database serverless driver
- Environment variables used for database configuration

### 6.4 Cloud Deployment

- Configured for Cloud Run deployment
- External port 80 mapped to internal port 5000
- Includes workflow configuration for CI/CD

## 7. Future Considerations

### 7.1 Data Persistence

The current implementation uses in-memory storage but is designed to be replaced with a PostgreSQL database:
- Database schema is defined
- Drizzle ORM is configured
- Storage interface abstracts implementation details

### 7.2 Authentication and Authorization

The system has a foundation for user management but needs:
- Proper password hashing
- Session management
- Role-based access control

### 7.3 Real-time Capabilities

For chat functionality, real-time capabilities may be needed:
- WebSockets or Server-Sent Events could be integrated
- Current architecture allows for these additions without major restructuring