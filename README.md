# Vue to React + Next.js Conversion

This project demonstrates a complete conversion from a Vue.js application to React + Next.js, preserving all functionality while implementing modern React patterns and TypeScript.

## 🎯 Project Overview

A comprehensive React + Next.js application converted from Vue.js featuring:
- 🎮 **2048 Game** - Interactive puzzle game with animations
- 🔧 **API Fetcher** - FBAIO API testing tool
- 📊 **Result Renderer** - Dynamic data visualization
- 🧭 **Responsive Navigation** - Multi-level dropdown menus
- 🔐 **Authentication System** - Demo login functionality

## 🚀 Tech Stack

### Current Stack (React + Next.js)
- **React 18** - Modern hooks and functional components
- **Next.js 15** - App Router for file-based routing
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests

### Original Stack (Vue.js)
- Vue.js 3.5.17 (Composition API)
- Vue Router 4.5.1
- Vite 7.0.0
- Tailwind CSS 4.1.11
- Axios 1.10.0

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── fbaio/             # API Fetcher page
│   ├── game/              # 2048 Game page
│   ├── info/              # Technical info page
│   ├── login/             # Login page
│   ├── test/              # Result Renderer demo
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable React components
│   ├── Game2048/          # 2048 game component
│   ├── ApiFetcher.tsx     # API testing tool
│   ├── Navigation.tsx     # Navigation component
│   └── ResultRenderer.tsx # Data visualization component
└── types/                 # TypeScript type definitions
    └── index.ts           # Shared types and interfaces
```

## 🎮 Features

### 2048 Game
- Complete game logic with win/lose conditions
- Smooth tile animations and transitions
- Keyboard controls (arrow keys)
- Score tracking and game state management
- Responsive design for mobile and desktop

### API Fetcher
- Support for multiple HTTP methods (GET, POST, PUT, DELETE)
- Custom endpoint configuration
- Request header and body editing
- Response formatting and error handling
- Pre-configured FBAIO API endpoints

### Result Renderer
- Multiple view modes: Table, Cards, JSON
- Real-time search and filtering
- Type detection with visual indicators
- Nested object flattening
- Responsive grid layouts

### Navigation
- Multi-level dropdown menus
- Mobile-responsive hamburger menu
- Active state management
- Smooth transitions and animations

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vue-to-react-nextjs
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix linting issues
```

## 🔄 Conversion Highlights

### ✅ What Was Preserved
- **100% Feature Parity** - All original functionality maintained
- **UI/UX Design** - Identical styling and layout
- **Animations** - All game animations and transitions
- **Responsive Design** - Mobile-first approach maintained
- **API Integration** - Existing Axios configurations

### ⚡ What Was Enhanced
- **Type Safety** - Comprehensive TypeScript implementation
- **Performance** - Next.js optimizations and React best practices
- **SEO** - Server-side rendering capabilities
- **Developer Experience** - Better debugging and tooling
- **Code Organization** - Modular component architecture

### 🔧 Migration Patterns

#### Vue to React Component Conversion
```javascript
// Vue (Composition API)
<script setup>
const count = ref(0)
const increment = () => count.value++
</script>

// React (Hooks)
const [count, setCount] = useState(0)
const increment = () => setCount(prev => prev + 1)
```

#### Routing Migration
```javascript
// Vue Router
import { createRouter, createWebHistory } from 'vue-router'

// Next.js App Router
// File-based routing: app/page.tsx, app/about/page.tsx
```

#### State Management
```javascript
// Vue (reactive)
const gameState = reactive({
  board: [],
  score: 0
})

// React (useState)
const [gameState, setGameState] = useState({
  board: [],
  score: 0
})
```

## 🎨 Styling

The project maintains the original Tailwind CSS styling with:
- Responsive design patterns
- Custom animations for the 2048 game
- Consistent color scheme and typography
- Mobile-first approach

## 🔍 Testing the Application

### Demo Credentials
For the login page, use:
- **Username:** `admin`
- **Password:** `password`

### API Testing
The API Fetcher includes pre-configured endpoints for FBAIO services. You can also test with custom endpoints.

## 🚀 Deployment

The project is ready for deployment on platforms like:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Any Node.js hosting service

```bash
npm run build
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Original Vue.js project for providing the foundation
- React and Next.js teams for excellent documentation
- Tailwind CSS for the utility-first approach
- Community for best practices and patterns

---

**Built with ❤️ using React, Next.js, TypeScript, and Tailwind CSS**
