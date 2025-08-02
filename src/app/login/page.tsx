'use client';

import { useState } from 'react';
import { LoginForm } from '@/types';

export default function LoginPage() {
  const [form, setForm] = useState<LoginForm>({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const validateForm = (): boolean => {
    if (!form.username.trim()) {
      setError('Username is required');
      return false;
    }
    if (!form.password.trim()) {
      setError('Password is required');
      return false;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simple demo authentication (in real app, this would be an API call)
      if (form.username === 'admin' && form.password === 'password') {
        setIsLoggedIn(true);
      } else {
        setError('Invalid username or password. Try admin/password');
      }
    } catch {
      setError('An error occurred during login. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setForm({ username: '', password: '' });
    setError('');
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome Back!
            </h2>
            <p className="text-gray-600 mb-6">
              You have successfully logged in as <strong>{form.username}</strong>
            </p>

            <div className="bg-green-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center mb-2">
                <span className="text-green-500 text-2xl mr-2">✓</span>
                <span className="text-green-800 font-medium">Login Successful</span>
              </div>
              <p className="text-green-700 text-sm">
                This is a demo login system. In a real application, you would be redirected
                to a protected dashboard or user area.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
              >
                Logout
              </button>

              <div className="text-sm text-gray-500">
                <p>Demo credentials:</p>
                <p>Username: <code className="bg-gray-100 px-1 rounded">admin</code></p>
                <p>Password: <code className="bg-gray-100 px-1 rounded">password</code></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-4xl font-bold text-gray-800 mb-2">
            Sign In
          </h1>
          <p className="text-center text-gray-600">
            Access your account to continue
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={form.username}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your username"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleInputChange}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter your password"
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <span className="text-red-500 text-lg mr-2">⚠️</span>
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Demo Credentials</h3>
              <div className="text-sm text-blue-700 space-y-1">
                <p>Username: <code className="bg-blue-100 px-1 rounded">admin</code></p>
                <p>Password: <code className="bg-blue-100 px-1 rounded">password</code></p>
              </div>
              <p className="text-xs text-blue-600 mt-2">
                This is a demonstration login system. Use the credentials above to test the functionality.
              </p>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              Don&apos;t have an account?{' '}
              <button className="text-blue-500 hover:text-blue-600 font-medium">
                Sign up here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
