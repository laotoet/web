export default function InfoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            Technical Information
          </h1>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Project Architecture</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-600 mb-4">
                  This application demonstrates a complete migration from Vue.js ecosystem to React + Next.js,
                  showcasing modern web development practices and maintaining all original functionality.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Frontend Architecture</h3>
                    <ul className="space-y-1 text-gray-600 text-sm">
                      <li>• React 18 with Functional Components</li>
                      <li>• Next.js 15 App Router for routing</li>
                      <li>• TypeScript for type safety</li>
                      <li>• Tailwind CSS for styling</li>
                      <li>• Custom hooks for state management</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Key Features</h3>
                    <ul className="space-y-1 text-gray-600 text-sm">
                      <li>• Server-side rendering (SSR)</li>
                      <li>• Responsive design patterns</li>
                      <li>• Component-based architecture</li>
                      <li>• Error boundary implementation</li>
                      <li>• Performance optimizations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Component Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">Navigation Component</h3>
                  <p className="text-blue-700 text-sm mb-3">
                    Responsive navigation with dropdown support and mobile-first design.
                  </p>
                  <ul className="text-blue-600 text-xs space-y-1">
                    <li>• Multi-level dropdown menus</li>
                    <li>• Mobile hamburger menu</li>
                    <li>• Active state management</li>
                    <li>• Next.js Link integration</li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">Game2048 Component</h3>
                  <p className="text-green-700 text-sm mb-3">
                    Complete 2048 game implementation with animations and game logic.
                  </p>
                  <ul className="text-green-600 text-xs space-y-1">
                    <li>• Keyboard event handling</li>
                    <li>• Smooth tile animations</li>
                    <li>• Win/lose condition detection</li>
                    <li>• Score tracking system</li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">ApiFetcher Component</h3>
                  <p className="text-purple-700 text-sm mb-3">
                    Advanced API testing tool with request configuration and response handling.
                  </p>
                  <ul className="text-purple-600 text-xs space-y-1">
                    <li>• Multiple HTTP methods support</li>
                    <li>• Request header configuration</li>
                    <li>• JSON request body editing</li>
                    <li>• Response formatting and display</li>
                  </ul>
                </div>

                <div className="bg-orange-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-orange-800 mb-3">ResultRenderer Component</h3>
                  <p className="text-orange-700 text-sm mb-3">
                    Dynamic data visualization with multiple view modes and search functionality.
                  </p>
                  <ul className="text-orange-600 text-xs space-y-1">
                    <li>• Table, card, and JSON views</li>
                    <li>• Real-time search filtering</li>
                    <li>• Type detection and icons</li>
                    <li>• Nested object flattening</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Performance Features</h2>
              <div className="bg-yellow-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-800 mb-2">Loading Optimization</h3>
                    <ul className="text-yellow-700 text-sm space-y-1">
                      <li>• Code splitting</li>
                      <li>• Lazy loading</li>
                      <li>• Image optimization</li>
                      <li>• Bundle size optimization</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-yellow-800 mb-2">Runtime Performance</h3>
                    <ul className="text-yellow-700 text-sm space-y-1">
                      <li>• React.memo optimization</li>
                      <li>• useCallback hooks</li>
                      <li>• Efficient re-renders</li>
                      <li>• State management</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-yellow-800 mb-2">SEO & Accessibility</h3>
                    <ul className="text-yellow-700 text-sm space-y-1">
                      <li>• Server-side rendering</li>
                      <li>• Meta tag optimization</li>
                      <li>• Semantic HTML</li>
                      <li>• ARIA attributes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Development Tools</h2>
              <div className="bg-gray-100 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Code Quality</h3>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• ESLint configuration</li>
                      <li>• TypeScript strict mode</li>
                      <li>• Prettier code formatting</li>
                      <li>• Git hooks integration</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Build System</h3>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• Next.js build optimization</li>
                      <li>• PostCSS processing</li>
                      <li>• Environment configuration</li>
                      <li>• Production deployment</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ready to Explore?</h2>
              <p className="text-gray-600 mb-6">
                Dive into the converted application and experience the seamless migration from Vue.js to React + Next.js.
              </p>
              <div className="text-sm text-gray-500">
                <p>Built with ❤️ using modern web technologies</p>
                <p className="mt-1">React • Next.js • TypeScript • Tailwind CSS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
