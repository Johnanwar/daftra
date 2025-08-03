// ✅ Converted PaginationView and LoadMoreView to use TanStack Query v5

import { useState } from "react";
import { usePokemonPage } from "../api/pokemon";
import PokemonCard from "../components/PokemonCard";

export const PaginationView = () => {
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 20;

  const { data, isLoading, error } = usePokemonPage(page, ITEMS_PER_PAGE);

  const getIdFromUrl = (url: string) => {
    const match = url.match(/\/pokemon\/(\d+)\//);
    return match ? match[1] : "";
  };

  const totalPages = data ? Math.ceil(data.count / ITEMS_PER_PAGE) : 0;

  return (
    <div>
      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-6 mb-6">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
            <div key={i} className="p-4 border rounded shadow-sm">
              <div className="w-20 h-20 mx-auto mb-2 skeleton" />
              <div className="h-4 w-3/4 mx-auto skeleton" />
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-6 mb-6">
        {data?.results.map((pokemon) => {
          const id = getIdFromUrl(pokemon.url);
          return (
            <PokemonCard
              key={pokemon.name}
              name={pokemon.name}
              imageUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            />
          );
        })}
      </div>

      <div className="flex flex-wrap justify-center items-center gap-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-40 bg-white hover:bg-gray-100"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .slice(Math.max(0, page - 3), page + 2)
          .map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3 py-1 rounded border ${
                p === page
                  ? "bg-blue-600 text-white font-bold"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {p}
            </button>
          ))}

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-40 bg-white hover:bg-gray-100"
        >
          Next
        </button>
      </div>

      <p className="mt-4 text-center text-gray-500 text-sm">
        Page {page} of {totalPages}
      </p>
    </div>
  );
};

