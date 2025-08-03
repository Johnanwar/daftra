import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  name: string;
  imageUrl: string;
};

const PokemonCard: React.FC<Props> = ({ name, imageUrl }) => {
  return (
    <Link
      to={`/pokemon/${name}`}
      state={{ name, imageUrl }}
      className="block border rounded-lg shadow-sm p-4 text-center hover:shadow-md transition"
    >
      <img src={imageUrl} alt={name} className="w-20 h-20 mx-auto mb-2" />
      <h2 className="capitalize font-semibold">{name}</h2>
    </Link>
  );
};

export default PokemonCard;
