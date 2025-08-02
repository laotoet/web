'use client';

import React, { useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { FBAIOUser, MediaModalState } from '@/types';

interface NewResultRendererProps {
  data: unknown;
  level?: number;
}

interface ColumnWidth {
  [key: string]: number;
}

const NewResultRenderer: React.FC<NewResultRendererProps> = ({ data, level = 0 }) => {
  const [modalState, setModalState] = useState<MediaModalState>({
    isOpen: false,
    url: '',
    type: 'image',
    zoom: 1,
    rotation: 0,
  });
  const [columnWidths, setColumnWidths] = useState<ColumnWidth>({});

  // Utility functions
  const isObject = useCallback((val: unknown): val is Record<string, unknown> => {
    return val !== null && typeof val === 'object' && !Array.isArray(val);
  }, []);

  const isArrayOfObjects = useCallback((arr: unknown): arr is Record<string, unknown>[] => {
    return Array.isArray(arr) && 
           arr.length > 0 && 
           arr.every(item => isObject(item) && Object.keys(item).length > 0);
  }, [isObject]);

  const isUrl = useCallback((str: unknown): str is string => {
    return typeof str === 'string' && /^https?:\/\//.test(str);
  }, []);

  const isImageUrl = useCallback((str: unknown): str is string => {
    return isUrl(str) && /\.(jpg|jpeg|png|gif|bmp|svg|webp)(\?.*)?$/i.test(str);
  }, [isUrl]);

  const isVideoUrl = useCallback((str: unknown): str is string => {
    return isUrl(str) && /\.(mp4|webm|ogg|mov|avi|mkv)(\?.*)?$/i.test(str);
  }, [isUrl]);

  // Check if array represents user tiles
  const isUserTileList = useCallback((arr: unknown): arr is FBAIOUser[] => {
    return Array.isArray(arr) && 
           arr.length > 0 && 
           arr.every((item: unknown) => {
             const user = item as FBAIOUser;
             return user &&
             ((user.avatar && 
               (typeof user.avatar === 'string' ||
                (typeof user.avatar === 'object' && (user.avatar.uri || user.avatar.url)))) ||
              user.avatar_url ||
              user.profile_pic) &&
             (user.name || user.full_name) &&
             (user.uid || user.id);
           });
  }, []);

  // Flatten object for table display
  const flattenObject = useCallback((obj: Record<string, unknown>, prefix = ''): Record<string, unknown> => {
    const result: Record<string, unknown> = {};
    for (const key in obj) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        Object.assign(result, flattenObject(value as Record<string, unknown>, newKey));
      } else {
        result[newKey] = value;
      }
    }
    return result;
  }, []);

  // Get non-empty columns for table display
  const getNonEmptyColumns = useCallback((data: unknown): string[] => {
    if (Array.isArray(data)) {
      if (!data.length) return [];
      const allKeys = Object.keys(flattenObject(data[0] as Record<string, unknown>));
      return allKeys.filter(key =>
        data.some(item => {
          const flat = flattenObject(item as Record<string, unknown>);
          return flat[key] !== undefined && flat[key] !== null && flat[key] !== '';
        })
      );
    } else if (isObject(data)) {
      const flat = flattenObject(data);
      return Object.keys(flat).filter(
        key => flat[key] !== undefined && flat[key] !== null && flat[key] !== ''
      );
    }
    return [];
  }, [flattenObject, isObject]);

  // Media modal functions
  const openMediaModal = useCallback((url: string, type: 'image' | 'video' = 'image') => {
    setModalState({
      isOpen: true,
      url,
      type,
      zoom: 1,
      rotation: 0,
    });
  }, []);

  const closeMediaModal = useCallback(() => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  }, []);

  const zoomIn = useCallback(() => {
    setModalState(prev => ({ ...prev, zoom: prev.zoom + 0.2 }));
  }, []);

  const zoomOut = useCallback(() => {
    setModalState(prev => ({ ...prev, zoom: Math.max(0.2, prev.zoom - 0.2) }));
  }, []);

  const rotate = useCallback(() => {
    setModalState(prev => ({ ...prev, rotation: (prev.rotation + 90) % 360 }));
  }, []);

  // Column resize handler
  const handleColumnResize = useCallback((e: React.MouseEvent, columnKey: string) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = columnWidths[columnKey] || 150;

    const handleMouseMove = (ev: MouseEvent) => {
      const newWidth = Math.max(40, startWidth + (ev.clientX - startX));
      setColumnWidths(prev => ({ ...prev, [columnKey]: newWidth }));
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [columnWidths]);

  const getColumnWidth = useCallback((key: string) => {
    return columnWidths[key] ? `${columnWidths[key]}px` : 'auto';
  }, [columnWidths]);

  // Media transform style
  const mediaTransformStyle = useMemo(() => ({
    transform: `scale(${modalState.zoom}) rotate(${modalState.rotation}deg)`,
  }), [modalState.zoom, modalState.rotation]);

  // Render functions
  const renderValue = useCallback((value: unknown): React.ReactNode => {
    if (value === null) {
      return <span className="text-gray-500 italic">null</span>;
    }
    if (value === undefined) {
      return <span className="text-gray-500 italic">undefined</span>;
    }
    if (typeof value === 'boolean') {
      return (
        <span className="text-blue-600 font-semibold">
          {value ? '✔️ true' : '❌ false'}
        </span>
      );
    }
    if (typeof value === 'number') {
      return <span className="text-green-600">{value}</span>;
    }
    if (typeof value === 'string') {
      if (isImageUrl(value)) {
        return (
          <Image
            src={value}
            alt="Media"
            width={120}
            height={120}
            className="max-w-[120px] max-h-[120px] rounded-md cursor-pointer border-2 border-blue-200 hover:border-blue-400 transition-colors object-cover"
            onClick={() => openMediaModal(value, 'image')}
          />
        );
      }
      if (isVideoUrl(value)) {
        return (
          <video
            src={value}
            className="max-w-[120px] max-h-[120px] rounded-md cursor-pointer border-2 border-blue-200 hover:border-blue-400 transition-colors"
            onClick={() => openMediaModal(value, 'video')}
            muted
          />
        );
      }
      if (isUrl(value)) {
        return (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline break-all hover:text-blue-800"
          >
            {value}
          </a>
        );
      }
      return <span className="text-gray-800">{value}</span>;
    }
    return <NewResultRenderer data={value} level={level + 1} />;
  }, [level, isImageUrl, isVideoUrl, isUrl, openMediaModal]);

  // Main render logic
  if (isUserTileList(data)) {
    return (
      <>
        <div className="flex flex-col gap-3 my-4">
          {data.map((item, idx) => (
            <div key={item.uid || item.id || idx} className="flex items-center bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-gray-100 mr-4">
                <Image
                  src={
                    (typeof item.avatar === 'string' ? item.avatar : item.avatar?.uri || item.avatar?.url) ||
                    item.avatar_url ||
                    item.profile_pic ||
                    ''
                  }
                  alt="Avatar"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <div className="text-lg font-semibold text-blue-600">
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {item.name || item.full_name}
                    </a>
                  ) : (
                    <span>{item.name || item.full_name}</span>
                  )}
                </div>
                <div className="text-sm text-gray-600">{item.uid || item.id}</div>
              </div>
            </div>
          ))}
        </div>
        {renderMediaModal()}
      </>
    );
  }

  if (isArrayOfObjects(data)) {
    const columns = getNonEmptyColumns(data);
    return (
      <>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-50">
                {columns.map(key => (
                  <th
                    key={key}
                    className="px-3 py-2 text-left border-b border-gray-200 relative"
                    style={{ width: getColumnWidth(key) }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700">{key}</span>
                      <span
                        className="w-2 h-full cursor-col-resize absolute right-0 top-0 hover:bg-gray-300"
                        onMouseDown={(e) => handleColumnResize(e, key)}
                      />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => {
                const flatItem = flattenObject(item);
                return (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {columns.map(key => (
                      <td
                        key={key}
                        className="px-3 py-2 border-b border-gray-100 break-words"
                        style={{ width: getColumnWidth(key) }}
                      >
                        {renderValue(flatItem[key])}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {renderMediaModal()}
      </>
    );
  }

  if (Array.isArray(data)) {
    return (
      <>
        <ul className="list-disc pl-5 space-y-1">
          {data.map((item, idx) => (
            <li key={idx}>
              <NewResultRenderer data={item} level={level + 1} />
            </li>
          ))}
        </ul>
        {renderMediaModal()}
      </>
    );
  }

  if (isObject(data) && Object.keys(data).length === 1 && 'result' in data) {
    return <NewResultRenderer data={data.result} level={level} />;
  }

  if (isObject(data)) {
    if (level === 0) {
      const columns = getNonEmptyColumns(data);
      const flatData = flattenObject(data);
      return (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-50">
                  {columns.map(key => (
                    <th
                      key={key}
                      className="px-3 py-2 text-left border-b border-gray-200 relative"
                      style={{ width: getColumnWidth(key) }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-700">{key}</span>
                        <span
                          className="w-2 h-full cursor-col-resize absolute right-0 top-0 hover:bg-gray-300"
                          onMouseDown={(e) => handleColumnResize(e, key)}
                        />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {columns.map(key => (
                    <td
                      key={key}
                      className="px-3 py-2 border-b border-gray-100 break-words"
                      style={{ width: getColumnWidth(key) }}
                    >
                      {renderValue(flatData[key])}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          {renderMediaModal()}
        </>
      );
    }

    return (
      <>
        <table className={`w-full ${level > 0 ? 'ml-6 bg-gray-50 border border-gray-200 rounded' : ''}`}>
          <tbody>
            {Object.entries(data).map(([key, value]) => (
              <tr key={key}>
                <td className="font-semibold text-gray-700 pr-2 py-1 align-top">{key}</td>
                <td className="py-1">{renderValue(value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {renderMediaModal()}
      </>
    );
  }

  return (
    <>
      {renderValue(data)}
      {renderMediaModal()}
    </>
  );

  function renderMediaModal() {
    if (!modalState.isOpen) return null;

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center"
        onClick={closeMediaModal}
      >
        <div className="bg-white rounded-2xl p-5 shadow-2xl flex flex-col items-center max-w-[90vw] max-h-[90vh]">
          {modalState.type === 'image' ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={modalState.url}
              alt="Media"
              className="max-w-[90vw] max-h-[80vh] object-contain"
              style={mediaTransformStyle}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <video
              src={modalState.url}
              controls
              className="max-w-[90vw] max-h-[80vh] object-contain"
              style={mediaTransformStyle}
              onClick={(e) => e.stopPropagation()}
            />
          )}
          <div className="flex gap-4 mt-4">
            <button
              onClick={zoomIn}
              className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            >
              🔍+
            </button>
            <button
              onClick={zoomOut}
              className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            >
              🔍-
            </button>
            <button
              onClick={rotate}
              className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            >
              ⟳
            </button>
            <a
              href={modalState.url}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
            >
              ⬇️
            </a>
            <button
              onClick={closeMediaModal}
              className="px-3 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
            >
              ✖️
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default NewResultRenderer;
