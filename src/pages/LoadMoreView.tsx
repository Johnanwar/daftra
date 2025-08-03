
import { useEffect, useState } from "react";
import { usePokemonPage } from "../api/pokemon";
import PokemonCard from "../components/PokemonCard";

export const LoadMoreView = () => {
  const [page, setPage] = useState(1);
  const [allData, setAllData] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const ITEMS_PER_PAGE = 20;

  const { data, isLoading, error, refetch } = usePokemonPage(page, ITEMS_PER_PAGE);

  const getIdFromUrl = (url: string) => {
    const match = url.match(/\/pokemon\/(\d+)\//);
    return match ? match[1] : "";
  };

  useEffect(() => {
    if (data?.results.length) {
      setAllData((prev) => [...prev, ...data.results]);
      setHasMore(!!data.next);
    }
  }, [data]);

  return (
    <div>
      {error && (
        <div className="text-center text-red-500 mb-4">
          {error.message} <button onClick={() => refetch()} className="underline text-blue-600">Retry</button>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-6 mb-6">
        {allData.map((pokemon) => {
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

      {isLoading && (
        <div className="text-center text-gray-500 mb-4">Loading...</div>
      )}

      {hasMore && !isLoading && (
        <div className="flex justify-center">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="px-6 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
          >
            Load More
          </button>
        </div>
      )}

      {!hasMore && (
        <p className="text-center text-sm text-gray-400 mt-4">
          You've reached the end!
        </p>
      )}
    </div>
  );
};
