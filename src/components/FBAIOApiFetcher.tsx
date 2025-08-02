'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { fbaioApis, FBAIOApiDefinition, FBAIOApiParams } from '@/config/fbaio-apis';
import { useFBAIO } from '@/hooks/useFBAIO';
import NewResultRenderer from './NewResultRenderer';
import { PaginationState } from '@/types';
import { demoUserData, demoPostData, demoAlbumData, demoApiResponse } from '@/data/demoData';

const FBAIOApiFetcher: React.FC = () => {
  const [selectedApiIndex, setSelectedApiIndex] = useState<number>(0);
  const [clientId, setClientId] = useState<string>('');
  const [paramInputs, setParamInputs] = useState<FBAIOApiParams>({});
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0,
  });
  const [showDemo, setShowDemo] = useState<boolean>(false);
  const [demoType, setDemoType] = useState<'users' | 'posts' | 'albums' | 'response'>('users');

  const { loading, error, result, parsedResult, fbFeedArray, fetchApi, clearResults } = useFBAIO();

  const currentApi = useMemo(() => fbaioApis[selectedApiIndex], [selectedApiIndex]);

  // Demo data mapping
  const demoData = useMemo(() => {
    switch (demoType) {
      case 'users': return demoUserData;
      case 'posts': return demoPostData;
      case 'albums': return demoAlbumData;
      case 'response': return demoApiResponse;
      default: return demoUserData;
    }
  }, [demoType]);

  // Update parameter inputs when API changes
  const updateParamInputs = useCallback((api: FBAIOApiDefinition) => {
    const newParams: FBAIOApiParams = {};
    if (api.body?.apiparams) {
      for (const key in api.body.apiparams) {
        newParams[key] = '';
      }
    }
    setParamInputs(newParams);
  }, []);

  // Handle API selection change
  const handleApiChange = useCallback((index: number) => {
    setSelectedApiIndex(index);
    updateParamInputs(fbaioApis[index]);
    clearResults();
    setShowDemo(false);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  }, [updateParamInputs, clearResults]);

  // Handle parameter input change
  const handleParamChange = useCallback((key: string, value: string | boolean) => {
    setParamInputs(prev => ({ ...prev, [key]: value }));
  }, []);

  // Handle API call
  const handleFetchApi = useCallback(async () => {
    if (!clientId.trim()) {
      alert('Please provide a valid Client ID');
      return;
    }

    setShowDemo(false);
    const response = await fetchApi({
      api: currentApi,
      clientId,
      params: paramInputs,
    });

    if (response.success && response.result) {
      const totalItems = Array.isArray(response.result) ? response.result.length : 0;
      setPagination(prev => ({
        ...prev,
        totalItems,
        totalPages: Math.ceil(totalItems / prev.pageSize),
        currentPage: 1,
      }));
    }
  }, [currentApi, clientId, paramInputs, fetchApi]);

  // Handle demo display
  const handleShowDemo = useCallback((type: 'users' | 'posts' | 'albums' | 'response') => {
    setDemoType(type);
    setShowDemo(true);
    clearResults();
  }, [clearResults]);

  // Handle pagination
  const handlePageChange = useCallback((page: number) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  }, []);

  const handlePageSizeChange = useCallback((pageSize: number) => {
    setPagination(prev => ({
      ...prev,
      pageSize,
      totalPages: Math.ceil(prev.totalItems / pageSize),
      currentPage: 1,
    }));
  }, []);

  // Get paginated results
  const paginatedResults = useMemo(() => {
    if (!Array.isArray(fbFeedArray) || fbFeedArray.length === 0) {
      return null;
    }

    const start = (pagination.currentPage - 1) * pagination.pageSize;
    const end = start + pagination.pageSize;
    return fbFeedArray.slice(start, end);
  }, [fbFeedArray, pagination.currentPage, pagination.pageSize]);

  // Get displayed result (paginated if array, otherwise full result)
  const displayedResult = useMemo(() => {
    if (showDemo) return demoData;
    if (paginatedResults) return paginatedResults;
    return parsedResult;
  }, [showDemo, demoData, paginatedResults, parsedResult]);

  // Generate pagination buttons
  const paginationButtons = useMemo(() => {
    const { currentPage, totalPages } = pagination;
    const buttons: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i);
      }
    } else {
      if (currentPage <= 4) {
        buttons.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        buttons.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        buttons.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return buttons;
  }, [pagination]);

  return (
    <div className="max-w-6xl mx-auto p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">FBAIO API Tool</h1>
        <p className="text-gray-600 text-lg">Enhanced Facebook API interaction with advanced data visualization</p>
      </div>

      {/* Demo Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg p-6 mb-8 text-white">
        <h2 className="text-2xl font-bold mb-4">🚀 Demo Mode</h2>
        <p className="mb-4">Experience the enhanced UI with sample data. Click on any demo type below:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => handleShowDemo('users')}
            className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 hover:bg-opacity-30 transition-all"
          >
            <div className="text-lg font-semibold">👥 Users</div>
            <div className="text-sm opacity-90">User tile layout</div>
          </button>
          <button
            onClick={() => handleShowDemo('posts')}
            className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 hover:bg-opacity-30 transition-all"
          >
            <div className="text-lg font-semibold">📝 Posts</div>
            <div className="text-sm opacity-90">Post data table</div>
          </button>
          <button
            onClick={() => handleShowDemo('albums')}
            className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 hover:bg-opacity-30 transition-all"
          >
            <div className="text-lg font-semibold">📸 Albums</div>
            <div className="text-sm opacity-90">Album metadata</div>
          </button>
          <button
            onClick={() => handleShowDemo('response')}
            className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3 hover:bg-opacity-30 transition-all"
          >
            <div className="text-lg font-semibold">📋 API Response</div>
            <div className="text-sm opacity-90">Full response object</div>
          </button>
        </div>
      </div>

      {/* Input Card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div className="space-y-6">
          {/* API Selection */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">Select API</label>
              <select
                value={selectedApiIndex}
                onChange={(e) => handleApiChange(Number(e.target.value))}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-lg"
              >
                {fbaioApis.map((api, idx) => (
                  <option key={idx} value={idx}>
                    {api.name}
                  </option>
                ))}
              </select>
              {currentApi.description && (
                <p className="text-sm text-gray-500 mt-2">{currentApi.description}</p>
              )}
            </div>

            {/* Client ID */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">Client ID</label>
              <input
                type="text"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                placeholder="Enter your client ID..."
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-lg"
              />
            </div>
          </div>

          {/* API Parameters */}
          {currentApi.body?.apiparams && Object.keys(currentApi.body.apiparams).length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4">API Parameters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(currentApi.body.apiparams).map(([key, defaultValue]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{key}</label>
                    {typeof defaultValue === 'boolean' ? (
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={Boolean(paramInputs[key])}
                          onChange={(e) => handleParamChange(key, e.target.checked)}
                          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-600">
                          {paramInputs[key] ? 'Yes' : 'No'}
                        </span>
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={String(paramInputs[key] || '')}
                        onChange={(e) => handleParamChange(key, e.target.value)}
                        placeholder={`Enter ${key}...`}
                        className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleFetchApi}
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-lg min-w-[120px]"
            >
              {loading ? 'Loading...' : 'Fetch Data'}
            </button>
            {((result !== null && result !== undefined) || showDemo) && (
              <button
                onClick={() => {
                  clearResults();
                  setShowDemo(false);
                }}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700 font-medium">Error: {error}</p>
            </div>
          )}
        </div>
      </div>

      {/* Results Card */}
      {((result !== null && result !== undefined) || showDemo) && (
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">📋</span>
            <h2 className="text-2xl font-bold text-gray-800">
              {showDemo ? `Demo Results - ${demoType.charAt(0).toUpperCase() + demoType.slice(1)}` : 'Results'}
            </h2>
            {showDemo && (
              <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                Demo Mode
              </span>
            )}
          </div>

          {/* Pagination Header */}
          {Array.isArray(fbFeedArray) && fbFeedArray.length > 0 && !showDemo && (
            <div className="flex items-center justify-between mb-6 bg-gray-50 p-4 rounded-lg">
              <div className="text-lg text-gray-600">
                Total {fbFeedArray.length} items
              </div>
              <div className="flex items-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  &lt;
                </button>

                {/* Page Numbers */}
                {paginationButtons.map((page, idx) => (
                  <button
                    key={idx}
                    onClick={() => typeof page === 'number' ? handlePageChange(page) : undefined}
                    disabled={page === '...'}
                    className={`px-3 py-1 rounded font-medium ${
                      page === pagination.currentPage
                        ? 'bg-blue-600 text-white'
                        : page === '...'
                        ? 'bg-transparent text-gray-500 cursor-default'
                        : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className="px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  &gt;
                </button>

                {/* Page Size Selector */}
                <select
                  value={pagination.pageSize}
                  onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                  className="ml-4 p-2 border border-gray-300 rounded"
                >
                  <option value={10}>10 / page</option>
                  <option value={25}>25 / page</option>
                  <option value={50}>50 / page</option>
                  <option value={100}>100 / page</option>
                </select>
              </div>
            </div>
          )}

          {/* Result Display */}
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            {displayedResult ? (
              <NewResultRenderer data={displayedResult} />
            ) : (result !== null && result !== undefined) ? (
              <pre className="text-sm bg-gray-800 text-green-400 p-4 rounded-lg overflow-auto max-h-96 font-mono">
                {typeof result === 'string' ? result : JSON.stringify(result, null, 2)}
              </pre>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default FBAIOApiFetcher;