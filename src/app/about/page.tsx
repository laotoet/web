import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            About This Project
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-600 mb-8 text-center">
              This project demonstrates a complete conversion from Vue.js to React + Next.js,
              preserving all functionality while implementing modern React patterns.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Original Stack</h2>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">📦</span>
                    Vue.js 3.5.17 (Composition API)
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">🔄</span>
                    Vue Router 4.5.1
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">⚡</span>
                    Vite 7.0.0
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">🎨</span>
                    Tailwind CSS 4.1.11
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">🌐</span>
                    Axios 1.10.0
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">New Stack</h2>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">⚛️</span>
                    React 18 (Hooks & Functional Components)
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">🔷</span>
                    Next.js 15 (App Router)
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">📘</span>
                    TypeScript (Type Safety)
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">🎨</span>
                    Tailwind CSS (Preserved)
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">🌐</span>
                    Axios (Preserved)
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features Converted</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                    <span className="text-2xl mr-2">🎮</span>
                    2048 Game
                  </h3>
                  <p className="text-gray-600">
                    Complete game logic with animations, keyboard controls, and win/lose conditions.
                    Converted from Vue reactive system to React state management.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                    <span className="text-2xl mr-2">🔧</span>
                    API Fetcher
                  </h3>
                  <p className="text-gray-600">
                    FBAIO API interaction tool with request configuration, response handling,
                    and error management. Migrated from Vue composables to React hooks.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                    <span className="text-2xl mr-2">📊</span>
                    Result Renderer
                  </h3>
                  <p className="text-gray-600">
                    Dynamic data visualization with table, card, and JSON views.
                    Enhanced with TypeScript interfaces and React component patterns.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                    <span className="text-2xl mr-2">🧭</span>
                    Navigation
                  </h3>
                  <p className="text-gray-600">
                    Responsive navigation with dropdown menus and mobile support.
                    Converted from Vue Router to Next.js App Router with Link components.
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Conversion Highlights</h2>
              <div className="bg-blue-50 rounded-lg p-6">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">✓</span>
                    <span><strong>100% Feature Parity:</strong> All original functionality preserved without loss</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">✓</span>
                    <span><strong>Type Safety:</strong> Added comprehensive TypeScript interfaces and types</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">✓</span>
                    <span><strong>Modern Patterns:</strong> Implemented React hooks, functional components, and best practices</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">✓</span>
                    <span><strong>Performance:</strong> Leveraged Next.js optimizations for better loading and SEO</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">✓</span>
                    <span><strong>Styling Preserved:</strong> Maintained all UI/UX elements and animations</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Explore the Features</h2>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/game"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                >
                  Play 2048 Game
                </Link>
                <Link
                  href="/fbaio"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                >
                  Try API Fetcher
                </Link>
                <Link
                  href="/test"
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium"
                >
                  View Data Renderer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
