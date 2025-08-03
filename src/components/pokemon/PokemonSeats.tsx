import { useEffect, useState } from "react";

export const PokemonSeats = ({
  stats,
}: {
  stats: { base_stat: number; stat: { name: string } }[];
}) => {
  const [animatedStats, setAnimatedStats] = useState<number[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedStats(stats.map((s) => Math.min(100, s.base_stat)));
    }, 100);
    return () => clearTimeout(timeout);
  }, [stats]);

  return (
    <div className="space-y-3 mb-6">
      {stats.map((s, i) => {
        const label = s.stat.name
          .replace("special-attack", "Sp. Attack")
          .replace("special-defense", "Sp. Defense");
        const width = animatedStats[i] ?? 0;

        return (
          <div key={s.stat.name}>
            <div className="flex justify-between text-sm font-medium">
              <span>{label}</span>
              <span>{s.base_stat}</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
              <div
                className="h-2 bg-black rounded transition-all duration-700 ease-out"
                style={{ width: `${width}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
