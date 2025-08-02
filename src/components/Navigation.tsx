'use client';

import { useState } from 'react';
import Link from 'next/link';
import { NavItem } from '@/types';

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navItems: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Info', href: '/info' },
    {
      label: 'Services',
      children: [
        { label: 'API Fetcher', href: '/fbaio' },
        { label: 'Test Page', href: '/test' },
      ]
    },
    { label: 'Game', href: '/game' },
    { label: 'Login', href: '/login' },
  ];

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const closeDropdowns = () => {
    setActiveDropdown(null);
    setIsOpen(false);
  };

  return (
    <nav className={`bg-white shadow-lg ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
              Vue to React
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.children ? (
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                    >
                      {item.label}
                      <svg
                        className={`ml-1 h-4 w-4 transform transition-transform ${
                          activeDropdown === item.label ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {activeDropdown === item.label && (
                      <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href!}
                            onClick={closeDropdowns}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href!}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.label)}
                        className="w-full flex justify-between items-center text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium transition-colors"
                      >
                        {item.label}
                        <svg
                          className={`h-4 w-4 transform transition-transform ${
                            activeDropdown === item.label ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {activeDropdown === item.label && (
                        <div className="pl-4">
                          {item.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href!}
                              onClick={closeDropdowns}
                              className="block text-gray-600 hover:text-blue-600 px-3 py-2 text-sm transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href!}
                      onClick={closeDropdowns}
                      className="block text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
