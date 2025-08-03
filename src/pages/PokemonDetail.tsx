import { Link, useParams } from "react-router-dom";
import { usePokemonDetails } from "../api/pokemon";
import { PokemonSeats } from "../components/PokemonSeats";



const PokemonDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = usePokemonDetails(Number(id));

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

  const formattedHeight = `${data.height / 10} m`;
  const formattedWeight = `${data.weight / 10} kg`;
  const formattedId = `#${String(data.id).padStart(3, "0")}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white py-10 px-4 flex flex-col items-center">
      {/* Back button */}
      <div className="w-full max-w-4xl mb-6 px-2">
        <Link
          to="/"
          className="inline-flex items-center text-sm px-6 py-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 shadow-sm"
        >
          ← Back to List
        </Link>
      </div>

      {/* Card */}
      <div className="w-full max-w-4xl bg-white rounded-md shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-center py-4">
          <h1 className="text-3xl font-bold capitalize">⚡ {data.name}</h1>
          <p className="text-sm mt-1">{formattedId}</p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-6 p-8 items-start">
          {/* Left Side */}
          <div className="flex flex-col items-center">
            <div className="bg-gray-100 p-6 rounded-full mb-4">
              <img
                src={data.sprites.front_default}
                alt={data.name}
                className="w-30 h-30"
              />
            </div>

            {/* Type */}
            <div className="flex gap-2 mb-4">
              {data.types.map((t) => (
                <span
                  key={t.type.name}
                  className="bg-red-500 text-white px-3 py-1 rounded-full text-sm capitalize"
                >
                  {t.type.name}
                </span>
              ))}
            </div>

            {/* Height & Weight */}
            <div className="flex gap-6 text-center">
              <div className="bg-gray-50 rounded-md p-2 w-28">
                <p className="text-xs text-gray-500">Height</p>
                <p className="text-base font-semibold">{formattedHeight}</p>
              </div>
              <div className="bg-gray-50 rounded-md p-2 w-28">
                <p className="text-xs text-gray-500">Weight</p>
                <p className="text-base font-semibold">{formattedWeight}</p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Base Stats</h2>
            <PokemonSeats stats={data.stats} />

            <h2 className="text-lg font-semibold mb-2">Abilities</h2>
            <div className="flex flex-wrap gap-2 text-sm mb-6">
              {data.abilities.map((a) => (
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

            <p className="font-semibold text-purple-600 text-base">
              {data.base_experience} XP
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
