'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface FavoritePokemon {
  id: string;
  name: string;
  image: string;
}

export default function PageFavorites() {
  const [favorites, setFavorites] = useState<FavoritePokemon[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const removeFavorite = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    const updatedFavorites = favorites.filter((pokemon) => pokemon.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    alert('Pokémon removido dos favoritos!');
  };

  return (
    <div className="container mx-auto p-2 sm:p-4">
      <h1 className="text-3xl sm:text-5xl font-bold mb-16 sm:mb-20 text-center">Favoritos</h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">Você não adicionou nenhum Pokémon aos favoritos ainda.</p>
      ) : (
       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 sm:gap-24">
          {favorites.map((pokemon) => (
            <div key={pokemon.id} className="bg-yellow-100 p-2 sm:p-4 rounded-lg shadow-md text-center group relative transition-all duration-200 hover:shadow-xl hover:scale-105">
              <Link href={`/details/${pokemon.name.toLowerCase()}`} className="cursor-pointer">
                <Image
                  src={pokemon.image}
                  alt={`Imagem do Pokémon ${pokemon.name}`}
                  width={96}
                  height={96}
                  className="mx-auto h-20 w-20 sm:h-24 sm:w-24 transition-transform duration-300 group-hover:scale-110"
                />
                <h2 className="text-lg sm:text-xl font-semibold mt-2">{pokemon.name}</h2>
                <p className="text-sm text-gray-500">ID: {pokemon.id}</p>
              </Link>

              <Link href={`/details/${pokemon.name.toLowerCase()}`} className="absolute inset-0 z-10">
                <div className="w-full h-full bg-white bg-opacity-90 rounded-lg shadow-lg flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-4">
                  <h3 className="text-lg font-bold mb-2">Detalhes do Pokémon</h3>
                  <p>Nome: {pokemon.name}</p>
                  <p>ID: {pokemon.id}</p>
                  <Image src={pokemon.image} alt={pokemon.name} width={80} height={80} />
                  <p className="mt-2 text-base font-bold text-gray-700">Clique para ver mais</p>
                  <button onClick={(e) => removeFavorite(e, pokemon.id)} className="mt-2 relative z-20 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm">
                    Remover
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}