import {  lazy, useState } from "react";
import { ErrorBoundary } from "../components/ErrorBoundary";

const PaginationView = lazy(() => import('../components/PokemonPaginationView'));
const LoadMoreView = lazy(() => import('../components/PokemonLoadMoreView'));
 
    

const Browser = () => {
  const [mode, setMode] = useState<"pagination" | "loadmore">("pagination");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-1">⚡ Pokédex</h1>
          <p className="text-gray-600">
            Discover and explore Pokémon with page controls
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={() => setMode("pagination")}
              className={`px-6 py-3 rounded-lg  font-medium shadow-md ${
                mode === "pagination"
                  ? "bg-yellow-400 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 cursor-pointer"
              }`}
            >
              Page Controls
            </button>

            <button
              onClick={() => setMode("loadmore")}
              className={`px-6 py-3 rounded-lg  font-medium shadow-md ${
                mode === "loadmore"
                  ? "bg-yellow-400 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 cursor-pointer"
              }`}
            >
              Infinite Scroll
            </button>
          </div>
        </div>

        <ErrorBoundary>
          {mode === "pagination" ? <PaginationView /> : <LoadMoreView />}
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Browser;
