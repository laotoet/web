import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Welcome to Vue-to-React
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A comprehensive React + Next.js application converted from Vue.js, featuring
            interactive games, API tools, and modern web development practices.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/game"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-lg"
            >
              Play 2048 Game
            </Link>
            <Link
              href="/fbaio"
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium shadow-lg"
            >
              Try API Fetcher
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🎮</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">2048 Game</h3>
            <p className="text-gray-600 mb-4">
              Play the classic 2048 puzzle game with smooth animations and responsive controls.
            </p>
            <Link
              href="/game"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Play Now →
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🔧</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">API Fetcher</h3>
            <p className="text-gray-600 mb-4">
              Test and interact with FBAIO API endpoints with a user-friendly interface.
            </p>
            <Link
              href="/fbaio"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Try It →
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Data Visualization</h3>
            <p className="text-gray-600 mb-4">
              Dynamic result rendering with multiple view modes and search functionality.
            </p>
            <Link
              href="/test"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Explore →
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Modern Stack</h3>
            <p className="text-gray-600 mb-4">
              Built with React, Next.js, TypeScript, and Tailwind CSS for optimal performance.
            </p>
            <Link
              href="/about"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Learn More →
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🔐</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Authentication</h3>
            <p className="text-gray-600 mb-4">
              Secure login system with modern authentication patterns and validation.
            </p>
            <Link
              href="/login"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Sign In →
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Responsive Design</h3>
            <p className="text-gray-600 mb-4">
              Fully responsive interface that works seamlessly across all device sizes.
            </p>
            <Link
              href="/info"
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Details →
            </Link>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Built With Modern Technology</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-2">⚛️</div>
              <span className="text-gray-600 font-medium">React 18</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-2">🔷</div>
              <span className="text-gray-600 font-medium">Next.js 15</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-2">📘</div>
              <span className="text-gray-600 font-medium">TypeScript</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl mb-2">🎨</div>
              <span className="text-gray-600 font-medium">Tailwind CSS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
