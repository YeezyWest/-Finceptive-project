# Finceptive Project

A React application with a Sign In page and a Post Metrics dashboard featuring full CRUD operations.

## Features

- **Authentication**
  - User sign-in with form validation
  - Protected routes
  - Authentication state persistence
  - user can use random email & password to login on to the dashboard page

- **Dashboard**
  - Post metrics overview with statistics
  - Interactive sidebar navigation
  - Responsive design for all device sizes

- **Post Management**
  - Create new posts
  - View posts with search and filtering
  - Edit existing posts
  - Delete posts with confirmation
  - Pagination

- **UI/UX**
  - Toast notifications for user feedback
  - Modal dialogs for forms and confirmations
  - Loading states and error handling
  - Mobile-first responsive design

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Routing**: React Router v7
- **Styling**: TailwindCSS for utility-first styling
- **State Management**: React Query for server state
- **HTTP Client**: Axios for API requests
- **Form Validation**: Zod for schema validation
- **Icons**: Lucide React for consistent iconography

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies

\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Create a `.env` file based on `.env.example`

\`\`\`bash
cp .env.example .env
\`\`\`

4. Start the development server

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

\`\`\`
src/
├── api/            # API clients and services
├── components/     # Reusable components
│   ├── ui/         # UI components (buttons, inputs, etc.)
├── config/         # Configuration files and constants
├── hooks/          # Custom React hooks
├── pages/          # Page components
├── types/          # TypeScript type definitions
├── App.tsx         # Main App component with routing
├── main.tsx        # Entry point
\`\`\`

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| VITE_API_BASE_URL | API base URL | https://jsonplaceholder.typicode.com |

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## API Integration

The application integrates with JSONPlaceholder API for demonstration purposes. In a production environment, you would replace this with your actual API endpoints.

## Component Architecture

The application follows a component-based architecture with:

- **Layout Components**: Handle the overall structure (DashboardLayout)
- **Page Components**: Represent full pages (SignIn, Dashboard)
- **Feature Components**: Implement specific features (PostsTable, MetricCard)
- **UI Components**: Reusable UI elements (Button, Input, Modal)

## License

MIT
