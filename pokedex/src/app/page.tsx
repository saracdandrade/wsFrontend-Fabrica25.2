'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface SimplifiedPokemon {
  name: string;
  id: string;
  image: string;
  apiName: string;
}

interface PokemonFromAPI {
  name: string;
  url: string;
}

interface FavoritePokemon {
  id: string;
  name: string;
  image: string;
}

export default function HomePage() {
   const [pokemons, setPokemons] = useState<SimplifiedPokemon[]>([]);
   const [search, setSearch] = useState('');
   const [filtered, setFiltered] = useState<SimplifiedPokemon[]>([]);
   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
   const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites: FavoritePokemon[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites.map(fav => fav.id));
  }, []);

  useEffect(() => {
    async function fetchPokemons() {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
      const data = await res.json();

      const results = data.results.map((pokemon: PokemonFromAPI) => {
        const urlParts = pokemon.url.split('/');
        const id = urlParts[urlParts.length - 2];
        const id3 = id.padStart(3, '0');

        return {
          name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
          id: `#${id3}`,
          image: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id3}.png`,
          apiName: pokemon.name,
        };
      });

      setPokemons(results);
      setFiltered(results);
    }

    fetchPokemons();
  }, []);

  useEffect(() => {
    const results = pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(results);
  }, [search, pokemons]);

  function toggleView() {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
    
  }

  const toggleFavorite = (pokemon: SimplifiedPokemon) => {
    const currentFavorites: FavoritePokemon[] = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isFavorite = currentFavorites.some((fav) => fav.id === pokemon.id);

    let updatedFavorites: FavoritePokemon[];
    if (isFavorite) {
      updatedFavorites = currentFavorites.filter((fav) => fav.id !== pokemon.id);
      alert(`${pokemon.name} foi removido dos favoritos!`);
    } else {
      const newFavorite = {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.image,
      };
      updatedFavorites = [...currentFavorites, newFavorite];
      alert(`${pokemon.name} foi adicionado aos favoritos!`);
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites.map(fav => fav.id));
  };

  return (

    <div className="container mx-auto p-2 sm:p-4 md:px-6 lg:px-8">
      <div className="w-full" style={{height: '16px'}}></div>
     
      <div className="flex flex-col sm:flex-row justify-center items-center mb-4 sm:mb-6 gap-4">
     
        <input
           type="text"
           value={search}
           onChange={(e) => setSearch(e.target.value)}
           placeholder="Buscar Pokémon"
           className="px-6 py-2 border border-gray-300 rounded-md w-full sm:w-64 focus:outline-none focus:ring focus:border-blue-500"
        />
          
          <button
             onClick={toggleView}
             className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 w-full sm:w-auto"
          >
             {viewMode === 'grid' ? 'Mudar para Lista' : 'Mudar para Grade'}
          </button>
          </div>
       
      <div className={
          (viewMode === 'grid'
            ? 'grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8'
            : 'flex flex-col gap-4') + ' mt-12 sm:mt-16' }
           >
        
        {filtered.map((pokemon) => {
          const isFavorite = favorites.includes(pokemon.id);
          return (
          <div key={pokemon.apiName} className={
            viewMode === 'grid'
              ? 'bg-gray-100 p-2 sm:p-4 rounded-lg shadow-md text-center group relative transition-all duration-200 hover:scale-105 hover:shadow-xl'
              : 'bg-gray-100 p-2 sm:p-4 rounded-lg shadow-md flex items-center gap-4 group relative transition-all duration-200 hover:scale-105 hover:shadow-xl'
          }>
           
            <Link href={`/details/${pokemon.apiName}`} className="cursor-pointer">
              <Image
                src={pokemon.image}
                alt={`Imagem do Pokémon ${pokemon.name}`}
                width={200}
                height={200}
                className={`mx-auto group-hover:scale-110 transition-transform duration-200 ${
                  viewMode === 'grid' ? 'h-20 w-20 sm:h-24 sm:w-24' : 'h-16 w-16'
                }`}
              />
              <div className={viewMode === 'list' ? 'text-left' : ''}>
                <h2 className="text-lg sm:text-xl font-semibold mt-2">{pokemon.name}</h2>
                <p className="text-sm text-gray-500">{pokemon.id}</p>
              </div>
            </Link>

            {/* extra details */}
           
            <Link href={`/details/${pokemon.apiName}`} className="absolute inset-0 z-10">
              <div className="w-full h-full bg-white bg-opacity-90 rounded-lg shadow-lg flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-4">
                <h3 className="text-lg font-bold mb-2">Detalhes do Pokémon</h3>
                <p>Nome: {pokemon.name}</p>
                <p>ID: {pokemon.id}</p>
                <Image src={pokemon.image} alt={pokemon.name} width={80} height={80} />
                <p className="mt-2 text-base font-bold text-gray-700">Clique para ver mais</p>
              </div>
            </Link>

            <button
             
              className="absolute top-2 right-2 z-20"
              aria-label={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              onClick={() => toggleFavorite(pokemon)}
            >
              <svg width="40" height="40" viewBox="0 0 24 24"
                stroke="red"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="hover:fill-red-500 transition-colors duration-200"
                fill={isFavorite ? 'red' : 'none'}>
                <path d="M20.8 5.6c-1.5-1.7-4.1-1.7-5.6 0l-1.2 1.3-1.2-1.3c-1.5-1.7-4.1-1.7-5.6 0-1.6 1.7-1.6 4.5 0 6.2l1.2 1.3 5.6 5.8 5.6-5.8 1.2-1.3c1.6-1.7 1.6-4.5 0-6.2z"/>
              </svg>
            </button>
          </div>
          );
        })}
      </div>
    </div>
    
  );
}