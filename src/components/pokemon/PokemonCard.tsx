import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  name: string;
  imageUrl: string;
  id: number;
};

const PokemonCard: React.FC<Props> = ({ name, imageUrl, id  }) => {
  return (
    <Link
      to={`/pokemon/${id}`}
      className="block  rounded-lg shadow-sm bg-white p-4 border border-gray-200 text-center hover:shadow-md transition"
    >
      <div className=" bg-gray-100">
        <img src={imageUrl} alt={name} className="w-30 h-30 mx-auto mb-2 rounded-full" />
      </div>
      <h2 className="capitalize font-semibold">{name}</h2>
    </Link>
  );
};

export default PokemonCard;
