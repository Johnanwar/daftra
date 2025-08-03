
import { useQuery } from '@tanstack/react-query';

const API_BASE = import.meta.env.VITE_POKEMON_API;

export type PokemonListItem = {
  name: string;
  url: string;
};

export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
};

export type PokemonDetails = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string }; is_hidden: boolean }[];
  base_experience: number;
  stats: { base_stat: number; stat: { name: string } }[];
};

async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}


export function usePokemonPage(page: number, limit = 10) {
  const offset = (page - 1) * limit;
  const url = `${API_BASE}/pokemon?limit=${limit}&offset=${offset}`;
  return useQuery({
    queryKey: ['pokemonList', page, limit],
    queryFn: () => fetcher<PokemonListResponse>(url),
    staleTime: 60 * 1000, 
  });
}

export function usePokemonDetails(name: string) {
  return useQuery({
    queryKey: ['pokemonDetails', name],
    queryFn: () => fetcher<PokemonDetails>(`${API_BASE}/pokemon/${name}`),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
