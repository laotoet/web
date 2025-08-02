'use client';

import { useState } from 'react';
import axios from 'axios';
import { ApiResponse } from '@/types';

interface ApiEndpoint {
  id: string;
  name: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  description?: string;
}

const ApiFetcher: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('');
  const [customUrl, setCustomUrl] = useState<string>('');
  const [method, setMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE'>('GET');
  const [requestBody, setRequestBody] = useState<string>('');
  const [headers, setHeaders] = useState<string>('{"Content-Type": "application/json"}');
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const endpoints: ApiEndpoint[] = [
    {
      id: 'user-info',
      name: 'User Information',
      url: 'https://api.fbaio.com/user/info',
      method: 'GET',
      description: 'Get current user information'
    },
    {
      id: 'user-stats',
      name: 'User Statistics',
      url: 'https://api.fbaio.com/user/stats',
      method: 'GET',
      description: 'Get user statistics and analytics'
    },
    {
      id: 'data-export',
      name: 'Data Export',
      url: 'https://api.fbaio.com/data/export',
      method: 'POST',
      description: 'Export user data'
    },
    {
      id: 'custom',
      name: 'Custom Endpoint',
      url: '',
      method: 'GET',
      description: 'Enter a custom API endpoint'
    }
  ];

  const handleEndpointChange = (endpointId: string) => {
    setSelectedEndpoint(endpointId);
    const endpoint = endpoints.find(ep => ep.id === endpointId);
    if (endpoint && endpointId !== 'custom') {
      setCustomUrl(endpoint.url);
      setMethod(endpoint.method);
    } else {
      setCustomUrl('');
    }
    setResponse(null);
  };

  const makeRequest = async () => {
    if (!customUrl.trim()) {
      setResponse({
        success: false,
        error: 'Please provide a valid URL',
        statusCode: 400
      });
      return;
    }

    setLoading(true);
    setResponse(null);

    try {
      let parsedHeaders = {};
      try {
        parsedHeaders = JSON.parse(headers);
      } catch {
        parsedHeaders = { 'Content-Type': 'application/json' };
      }

      let requestData = undefined;
      if (method !== 'GET' && requestBody.trim()) {
        try {
          requestData = JSON.parse(requestBody);
        } catch {
          requestData = requestBody;
        }
      }

      const axiosConfig = {
        method: method.toLowerCase(),
        url: customUrl,
        headers: parsedHeaders,
        ...(requestData && { data: requestData }),
        timeout: 10000
      };

      const result = await axios(axiosConfig);

      setResponse({
        success: true,
        data: result.data,
        statusCode: result.status
      });
    } catch (error: unknown) {
      let errorMessage = 'An unexpected error occurred';
      let statusCode = 0;

      if (error && typeof error === 'object' && 'response' in error) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const axiosError = error as any;
        if (axiosError.response) {
          errorMessage = axiosError.response.data?.message || axiosError.response.statusText || 'Server Error';
          statusCode = axiosError.response.status;
        } else if (axiosError.request) {
          errorMessage = 'Network error - please check your connection';
        } else {
          errorMessage = axiosError.message || errorMessage;
        }
      }

      setResponse({
        success: false,
        error: errorMessage,
        statusCode
      });
    } finally {
      setLoading(false);
    }
  };

  const clearResponse = () => {
    setResponse(null);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatJson = (obj: any): string => {
    try {
      return JSON.stringify(obj, null, 2);
    } catch {
      return String(obj);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">FBAIO API Fetcher</h1>
        <p className="text-gray-600">Test and interact with FBAIO API endpoints</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Request Configuration */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Endpoint
            </label>
            <select
              value={selectedEndpoint}
              onChange={(e) => handleEndpointChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Choose an endpoint...</option>
              {endpoints.map((endpoint) => (
                <option key={endpoint.id} value={endpoint.id}>
                  {endpoint.name}
                </option>
              ))}
            </select>
            {selectedEndpoint && endpoints.find(ep => ep.id === selectedEndpoint)?.description && (
              <p className="text-sm text-gray-500 mt-1">
                {endpoints.find(ep => ep.id === selectedEndpoint)?.description}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL
            </label>
            <input
              type="text"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              placeholder="https://api.example.com/endpoint"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Method
            </label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as 'GET' | 'POST' | 'PUT' | 'DELETE')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Headers (JSON)
            </label>
            <textarea
              value={headers}
              onChange={(e) => setHeaders(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              placeholder='{"Content-Type": "application/json"}'
            />
          </div>

          {method !== 'GET' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Request Body (JSON)
              </label>
              <textarea
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                placeholder='{"key": "value"}'
              />
            </div>
          )}

          <div className="flex space-x-4">
            <button
              onClick={makeRequest}
              disabled={loading || !customUrl.trim()}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? 'Sending...' : 'Send Request'}
            </button>
            {response && (
              <button
                onClick={clearResponse}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Response Display */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Response</h2>
          {loading ? (
            <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-2 text-gray-600">Loading...</span>
            </div>
          ) : response ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 rounded text-sm font-medium ${
                  response.success
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {response.success ? 'Success' : 'Error'}
                </span>
                {response.statusCode && (
                  <span className="text-sm text-gray-600">
                    Status: {response.statusCode}
                  </span>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
                  {response.success
                    ? formatJson(response.data)
                    : response.error
                  }
                </pre>
              </div>
            </div>
          ) : (
            <div className="p-8 bg-gray-50 rounded-lg text-center text-gray-500">
              No response yet. Configure your request and click &quot;Send Request&quot;.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiFetcher;
