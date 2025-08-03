import { lazy, useState } from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';
const PaginationView = lazy(() => import('./PaginationView').then(module => ({ default: module.PaginationView })) );
const LoadMoreView = lazy(() => import('./LoadMoreView').then(module => ({ default: module.LoadMoreView })) );

const Browser = () => {
  const [mode, setMode] = useState<'pagination' | 'loadmore'>('pagination');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-1">⚡ Pokédex</h1>
        <p className="text-gray-600">Discover and explore Pokémon with page controls</p>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => setMode('pagination')}
            className={`px-4 py-2 rounded font-medium border ${
              mode === 'pagination'
                ? 'bg-yellow-400 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Page Controls
          </button>

          <button
            onClick={() => setMode('loadmore')}
            className={`px-4 py-2 rounded font-medium border ${
              mode === 'loadmore'
                ? 'bg-yellow-400 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Infinite Scroll
          </button>
        </div>
      </div>

      <ErrorBoundary>
          {mode === 'pagination' ? <PaginationView /> : <LoadMoreView />}
      </ErrorBoundary>
    </div>
  );
};

export default Browser;
