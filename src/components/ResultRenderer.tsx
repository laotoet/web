'use client';

import { useState } from 'react';

interface DataItem {
  id: string | number;
  label: string;
  value: string | number;
  type?: 'text' | 'number' | 'date' | 'boolean' | 'object';
}

interface ResultRendererProps {
  data?: unknown;
  title?: string;
  className?: string;
}

const ResultRenderer: React.FC<ResultRendererProps> = ({
  data,
  title = 'Result Data',
  className = ''
}) => {
  const [viewMode, setViewMode] = useState<'table' | 'json' | 'cards'>('table');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Convert data to a flat structure for rendering
  const processData = (inputData: unknown): DataItem[] => {
    if (!inputData) return [];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const flattenObject = (obj: any, prefix = ''): DataItem[] => {
      const items: DataItem[] = [];

      if (obj && typeof obj === 'object') {
        if (Array.isArray(obj)) {
          obj.forEach((item, index) => {
            const key = prefix ? `${prefix}[${index}]` : `item_${index}`;
            if (typeof item === 'object') {
              items.push(...flattenObject(item, key));
            } else {
              items.push({
                id: key,
                label: key,
                value: String(item),
                type: typeof item === 'number' ? 'number' : 'text'
              });
            }
          });
        } else {
          Object.entries(obj).forEach(([key, value]) => {
            const fullKey = prefix ? `${prefix}.${key}` : key;
            if (value && typeof value === 'object') {
              items.push(...flattenObject(value, fullKey));
            } else {
              items.push({
                id: fullKey,
                label: key,
                value: value === null ? 'null' : String(value),
                type: getValueType(value)
              });
            }
          });
        }
      } else {
        items.push({
          id: 'root',
          label: 'value',
          value: String(inputData),
          type: getValueType(inputData)
        });
      }

      return items;
    };

    return flattenObject(inputData);
  };

  const getValueType = (value: unknown): 'text' | 'number' | 'date' | 'boolean' | 'object' => {
    if (typeof value === 'number') return 'number';
    if (typeof value === 'boolean') return 'boolean';
    if (value instanceof Date) return 'date';
    if (typeof value === 'object') return 'object';
    return 'text';
  };

  const processedData = processData(data);

  // Filter data based on search term
  const filteredData = processedData.filter(item =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(item.value).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatValue = (value: string | number, type?: string): string => {
    if (type === 'date' && typeof value === 'string') {
      try {
        return new Date(value).toLocaleString();
      } catch {
        return String(value);
      }
    }
    return String(value);
  };

  const getTypeIcon = (type?: string): string => {
    switch (type) {
      case 'number': return '🔢';
      case 'boolean': return '✅';
      case 'date': return '📅';
      case 'object': return '📦';
      default: return '📝';
    }
  };

  const formatJsonData = (inputData: unknown): string => {
    try {
      return JSON.stringify(inputData, null, 2);
    } catch {
      return String(inputData);
    }
  };

  if (!data) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
        <div className="text-center text-gray-500 py-8">
          <div className="text-4xl mb-2">📊</div>
          <p>No data to display</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search data..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />

          {/* View Mode Toggle */}
          <div className="flex rounded-md border border-gray-300 overflow-hidden">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-2 text-sm font-medium ${
                viewMode === 'table'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Table
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-2 text-sm font-medium ${
                viewMode === 'cards'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Cards
            </button>
            <button
              onClick={() => setViewMode('json')}
              className={`px-3 py-2 text-sm font-medium ${
                viewMode === 'json'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              JSON
            </button>
          </div>
        </div>
      </div>

      {/* Data Count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredData.length} of {processedData.length} items
        {searchTerm && (
          <span className="ml-2">
            (filtered by &quot;{searchTerm}&quot;)
          </span>
        )}
      </div>

      {/* Render based on view mode */}
      {viewMode === 'table' && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.label}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 break-all">
                    {formatValue(item.value, item.type)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="inline-flex items-center">
                      <span className="mr-1">{getTypeIcon(item.type)}</span>
                      {item.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredData.map((item) => (
            <div key={item.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {item.label}
                </h3>
                <span className="text-xs text-gray-500">
                  {getTypeIcon(item.type)} {item.type}
                </span>
              </div>
              <p className="text-sm text-gray-700 break-words">
                {formatValue(item.value, item.type)}
              </p>
            </div>
          ))}
        </div>
      )}

      {viewMode === 'json' && (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <pre className="text-sm overflow-x-auto whitespace-pre-wrap text-gray-800 font-mono">
            {formatJsonData(data)}
          </pre>
        </div>
      )}

      {filteredData.length === 0 && searchTerm && (
        <div className="text-center text-gray-500 py-8">
          <div className="text-4xl mb-2">🔍</div>
          <p>No results found for &quot;{searchTerm}&quot;</p>
          <button
            onClick={() => setSearchTerm('')}
            className="mt-2 text-blue-500 hover:text-blue-600 text-sm underline"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultRenderer;
