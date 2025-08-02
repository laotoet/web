'use client';

import { useState, useCallback, useMemo } from 'react';
import axios, { AxiosError } from 'axios';
import { FBAIOApiDefinition, FBAIOApiParams } from '@/config/fbaio-apis';

export interface FBAIOResponse {
  success: boolean;
  data?: unknown;
  error?: string;
  statusCode?: number;
  result?: unknown[];
}

export interface FBAIOHookState {
  loading: boolean;
  error: string | null;
  result: unknown | null;
  parsedResult: unknown | null;
  fbFeedArray: unknown[];
}

export interface FBAIORequestConfig {
  api: FBAIOApiDefinition;
  clientId: string;
  params: FBAIOApiParams;
}

interface FeedItem {
  uid?: string;
  id?: string;
  [key: string]: unknown;
}

interface ApiResponseData {
  result?: unknown[];
  data?: unknown[];
  [key: string]: unknown;
}

interface ErrorResponseData {
  message?: string;
  [key: string]: unknown;
}

export function useFBAIO() {
  const [state, setState] = useState<FBAIOHookState>({
    loading: false,
    error: null,
    result: null,
    parsedResult: null,
    fbFeedArray: [],
  });

  // Utility function to deduplicate arrays by a specific key
  const deduplicateArray = useCallback((arr: unknown[], key = 'uid') => {
    if (!Array.isArray(arr)) return [];
    
    const seen = new Set();
    return arr.filter((item: unknown) => {
      const feedItem = item as FeedItem;
      if (feedItem && feedItem[key] !== undefined && !seen.has(feedItem[key])) {
        seen.add(feedItem[key]);
        return true;
      }
      return false;
    });
  }, []);

  // Parse and extract feed data from API response
  const extractFeedData = useCallback((data: unknown): unknown[] => {
    if (!data) return [];
    
    // Handle direct array response
    if (Array.isArray(data)) {
      return deduplicateArray(data);
    }
    
    // Handle object with result property
    if (typeof data === 'object' && data !== null) {
      const objData = data as ApiResponseData;
      if (Array.isArray(objData.result)) {
        return deduplicateArray(objData.result);
      }
      if (Array.isArray(objData.data)) {
        return deduplicateArray(objData.data);
      }
    }
    
    return [];
  }, [deduplicateArray]);

  // Parse response data
  const parseResult = useCallback((result: unknown) => {
    try {
      if (typeof result === 'string') {
        return JSON.parse(result);
      }
      return result;
    } catch {
      return null;
    }
  }, []);

  // Main API call function
  const fetchApi = useCallback(async (config: FBAIORequestConfig): Promise<FBAIOResponse> => {
    setState(prev => ({
      ...prev,
      loading: true,
      error: null,
      result: null,
      parsedResult: null,
      fbFeedArray: [],
    }));

    try {
      // Deep copy the API configuration
      const apiCopy = JSON.parse(JSON.stringify(config.api));
      
      // Set client ID and parameters
      if (apiCopy.body) {
        apiCopy.body.id = config.clientId;
        if (apiCopy.body.apiparams) {
          Object.assign(apiCopy.body.apiparams, config.params);
        }
      }

      const response = await axios({
        method: apiCopy.method,
        url: apiCopy.url,
        headers: {
          'Content-Type': 'application/json',
        },
        data: apiCopy.body,
        timeout: 30000, // 30 second timeout
      });

      const resultData = response.data;
      const parsed = parseResult(resultData);
      const feedArray = extractFeedData(parsed);

      setState(prev => ({
        ...prev,
        loading: false,
        result: resultData,
        parsedResult: parsed,
        fbFeedArray: feedArray,
      }));

      return {
        success: true,
        data: resultData,
        statusCode: response.status,
        result: feedArray,
      };

    } catch (error) {
      let errorMessage = 'An unexpected error occurred';
      let statusCode = 0;

      if (error && typeof error === 'object') {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          const responseData = axiosError.response.data as ErrorResponseData;
          errorMessage = responseData?.message || 
                        axiosError.response.statusText || 
                        'Server Error';
          statusCode = axiosError.response.status;
        } else if (axiosError.request) {
          errorMessage = 'Network error - please check your connection';
        } else {
          errorMessage = axiosError.message || errorMessage;
        }
      }

      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));

      return {
        success: false,
        error: errorMessage,
        statusCode,
      };
    }
  }, [parseResult, extractFeedData]);

  // Clear results
  const clearResults = useCallback(() => {
    setState({
      loading: false,
      error: null,
      result: null,
      parsedResult: null,
      fbFeedArray: [],
    });
  }, []);

  // Memoized return value
  const hookReturn = useMemo(() => ({
    ...state,
    fetchApi,
    clearResults,
  }), [state, fetchApi, clearResults]);

  return hookReturn;
}

export default useFBAIO;