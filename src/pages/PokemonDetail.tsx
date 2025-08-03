import { Link, useParams } from "react-router-dom";
import { usePokemonDetails } from "../api/pokemon";

 


const PokemonDetail = () => {
  const { name } = useParams();
  const { data, isLoading, error } = usePokemonDetails(name || "");


  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center p-6">
        <div className="w-full max-w-3xl animate-pulse space-y-4">
          <div className="bg-gradient-to-r from-pink-300 to-purple-300 h-24 rounded-lg" />
          <div className="bg-white p-6 rounded-xl shadow space-y-4">
            <div className="h-40 w-40 bg-gray-200 mx-auto rounded-full" />
            <div className="flex justify-center gap-4">
              <div className="h-6 w-20 bg-gray-200 rounded" />
              <div className="h-6 w-20 bg-gray-200 rounded" />
            </div>
            <div className="h-4 w-1/2 bg-gray-200 mx-auto rounded" />
            <div className="space-y-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-3 bg-gray-200 rounded w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-xl mx-auto p-4 text-center">
        <p className="text-red-500">Failed to load Pokémon data.</p>
        <Link to="/" className="text-blue-600 underline mt-2 inline-block">
          ← Back to List
        </Link>
      </div>
    );
  }


  const formattedHeight = `${data?.height / 10} m`;
  const formattedWeight = `${data?.weight / 10} kg`;
  const formattedId = `#${String(data?.id).padStart(3, "0")}`;

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white rounded-xl overflow-hidden shadow-md">
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-center py-6 px-4">
          <h1 className="text-3xl font-bold">⚡ {data?.name}</h1>
          <p className="text-sm mt-1">{formattedId}</p>
        </div>

        <div className="p-6 flex flex-col items-center gap-6">
          <img src={data?.sprites?.front_default} alt={data?.name} className="w-40 h-40" />

          {/* Type */}
          <div className="flex gap-2">
            {data?.types?.map((t) => (
              <span
                key={t.type.name}
                className="bg-red-500 text-white px-3 py-1 rounded-full text-sm capitalize"
              >
                {t.type.name}
              </span>
            ))}
          </div>

          {/* Height & Weight */}
          <div className="flex justify-center gap-10 w-full text-center text-sm text-gray-700">
            <div>
              <p className="text-gray-500">Height</p>
              <p className="font-semibold">{formattedHeight}</p>
            </div>
            <div>
              <p className="text-gray-500">Weight</p>
              <p className="font-semibold">{formattedWeight}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="w-full mt-6">
            <h2 className="font-semibold mb-2">Base Stats</h2>
            <div className="space-y-2">
              {data?.stats?.map((s) => (
                <div key={s.stat.name}>
                  <div className="flex justify-between text-sm font-medium">
                    <span>
                      {s.stat.name
                        .replace("special-attack", "Sp. Attack")
                        .replace("special-defense", "Sp. Defense")}
                    </span>
                    <span>{s.base_stat}</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded">
                    <div
                      className="bg-blue-500 h-2 rounded"
                      style={{ width: `${Math.min(100, s.base_stat)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Abilities */}
          <div className="w-full mt-6">
            <h2 className="font-semibold mb-2">Abilities</h2>
            <div className="flex flex-wrap gap-2 text-sm">
              {data?.abilities?.map((a) => (
                <span
                  key={a.ability.name}
                  className="bg-gray-100 px-3 py-1 rounded text-gray-700"
                >
                  {a.ability.name}{" "}
                  {a.is_hidden && (
                    <span className="text-gray-400">(Hidden)</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Base XP */}
          <div className="w-full mt-6 text-center">
            <p className="font-semibold text-purple-600">
              Base Experience:{" "}
              <span className="font-bold">{data?.base_experience} XP</span>
            </p>
          </div>
        </div>
      </div>

      <Link
        to="/"
        className="mt-6 inline-block text-sm px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-100"
      >
        ← Back to List
      </Link>
    </div>
  );
};

export default PokemonDetail;
