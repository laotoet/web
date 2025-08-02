'use client';

import { useState } from 'react';
import ResultRenderer from '@/components/ResultRenderer';

export default function TestPage() {
  const [sampleData, setSampleData] = useState<unknown>({
    user: {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      age: 30,
      isActive: true,
      lastLogin: '2024-07-26T10:30:00Z',
      preferences: {
        theme: 'dark',
        notifications: true,
        language: 'en'
      }
    },
    statistics: {
      totalPosts: 45,
      totalLikes: 892,
      totalComments: 156,
      joinDate: '2022-01-15T00:00:00Z'
    },
    recentActivity: [
      { action: 'post_created', timestamp: '2024-07-26T09:15:00Z' },
      { action: 'comment_added', timestamp: '2024-07-26T08:30:00Z' },
      { action: 'like_given', timestamp: '2024-07-26T07:45:00Z' }
    ]
  });

  const alternativeData = {
    products: [
      { id: 1, name: 'Widget A', price: 29.99, inStock: true },
      { id: 2, name: 'Widget B', price: 49.99, inStock: false },
      { id: 3, name: 'Widget C', price: 19.99, inStock: true }
    ],
    orderTotal: 99.97,
    currency: 'USD',
    shippingInfo: {
      method: 'standard',
      cost: 5.99,
      estimatedDays: 5
    }
  };

  const loadAlternativeData = () => {
    setSampleData(alternativeData);
  };

  const loadUserData = () => {
    setSampleData({
      user: {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        age: 30,
        isActive: true,
        lastLogin: '2024-07-26T10:30:00Z',
        preferences: {
          theme: 'dark',
          notifications: true,
          language: 'en'
        }
      },
      statistics: {
        totalPosts: 45,
        totalLikes: 892,
        totalComments: 156,
        joinDate: '2022-01-15T00:00:00Z'
      },
      recentActivity: [
        { action: 'post_created', timestamp: '2024-07-26T09:15:00Z' },
        { action: 'comment_added', timestamp: '2024-07-26T08:30:00Z' },
        { action: 'like_given', timestamp: '2024-07-26T07:45:00Z' }
      ]
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Result Renderer Test Page</h1>
          <p className="text-gray-600 mb-6">
            This page demonstrates the ResultRenderer component with different data structures.
            You can view the data in table, card, or JSON format.
          </p>

          <div className="flex space-x-4 mb-6">
            <button
              onClick={loadUserData}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Load User Data
            </button>
            <button
              onClick={loadAlternativeData}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              Load Product Data
            </button>
          </div>
        </div>

        <ResultRenderer
          data={sampleData}
          title="Dynamic Data Visualization"
          className="mb-8"
        />

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Features</h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Multiple view modes: Table, Cards, and Raw JSON
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Real-time search and filtering
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Type detection with visual indicators
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Nested object flattening for easy viewing
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Responsive design for all screen sizes
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
