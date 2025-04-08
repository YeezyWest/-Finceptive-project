# Finceptive Frontend Developer Project

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/axios-671ddf?style=for-the-badge&logo=axios&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)

A modern React application implementing best practices for the Finceptive frontend developer position.

## Features

- 🚀 React Router v7 implementation
- 📱 Mobile-first responsive design
- 🔄 React Query for server-state management
- 📡 Axios API integration with JSONPlaceholder
- ♻️ Reusable custom components
- ✅ Zod input validation
- 💅 Styled Components CSS-in-JS
- 📊 Dashboard and Post Management interfaces

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/finceptive-frontend-project.git

2. Install dependencies:

bash

npm install
Start development server:

bash

3. npm run dev

Start development server:

bash
Copy
npm run dev
Tech Stack
Framework: React 18

Routing: React Router v7

API Client: Axios

State Management: React Query

Styling: Styled Components

Validation: Zod

Icons: Lucide React

Linting: ESLint + Prettier

Project Structure
Copy
src/
├── components/       # Reusable components
│   ├── Button/
│   ├── Input/
│   └── Table/
├── pages/            # Application views
│   ├── Dashboard/
│   └── Posts/
├── hooks/            # Custom hooks
├── utils/            # Utilities and helpers
├── api/              # API configuration
├── types/            # TypeScript definitions
└── assets/           # Static assets
API Integration
Integrated with JSONPlaceholder APIs:

ts
Copy
// Example API service
export const fetchPosts = async (): Promise<Post[]> => {
  const { data } = await axios.get<Post[]>(
    'https://jsonplaceholder.typicode.com/posts'
  );
  return data;
};
Key Implementation Details
Mobile-First Approach
Responsive grid layouts

Flexible component sizing

Mobile-optimized interactions

React Query Integration
tsx
Copy
const { data, isLoading, error } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
});
Reusable Components
tsx
Copy
<Button
  variant="primary"
  loading={isSubmitting}
  fullWidth
>
  Submit Form
</Button>
Input Validation
ts
Copy
const signInSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Minimum 8 characters required")
});
How to Run
Install dependencies: npm install

Start development server: npm run dev

Build for production: npm run build

Lint code: npm run lint

Screenshots
Dashboard Preview
Posts Management

Contributing
Contributions are welcome! Please follow these steps:

Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

License
Distributed under the MIT License. See LICENSE for more information.

Contact
For any inquiries, please contact:

Project Maintainer: [Your Name]

Email: [your.email@domain.com]

Figma Design: Figma File

Note: This project was created as part of the Finceptive frontend developer assessment. Not all pages from the Figma design have been implemented, but all completed components follow strict quality guidelines and best practices.

```
