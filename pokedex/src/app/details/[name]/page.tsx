import Image from 'next/image';

interface PokemonDetails {
  id: number;
  name: string;
  sprites: {
    other: {
      ['official-artwork']: {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
  weight: number;
  base_experience: number;
  height: number;
  abilities: { ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
}

async function getPokemon(name: string): Promise<PokemonDetails> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
  if (!res.ok) throw new Error('Erro ao buscar o Pokémon');
  return res.json();
}

export default async function PageDetails({ params }: { params: { name: string } }) {
  const pokemon = await getPokemon(params.name);

  const types = pokemon.types.map((t) => t.type.name).join(', ');

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start max-w-5xl mx-auto p-2 sm:p-6 gap-2 md:gap-8">

      <div className="w-full md:w-1/2 flex justify-center md:justify-start items-center">
        <Image
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
          width={400}
          height={400}
          className="rounded-xl shadow-2xl border-4 border-gray-200 bg-white h-auto w-full max-w-xs md:max-w-full"
        />
      </div>

      <div className="w-full md:w-1/2 bg-white rounded-xl shadow-lg border border-gray-200 text-left p-2 sm:p-6">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 capitalize text-gray-700 drop-shadow">{pokemon.name}</h1>
          <p className="text-gray-500 mb-4 text-sm">ID: {pokemon.id}</p>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-semibold text-gray-700 mb-2">Tipo(s): <span className="font-normal">{types}</span></p>
              <p className="font-semibold text-gray-700 mb-2">Peso: <span className="font-normal">{pokemon.weight / 10} kg</span></p>
              <p className="font-semibold text-gray-700 mb-2">Altura: <span className="font-normal">{pokemon.height / 10} m</span></p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-semibold text-gray-700 mb-2">Habilidades:</p>
              <ul className="list-disc list-inside text-gray-600">
                {pokemon.abilities.map(a => (
                  <li key={a.ability.name}>{a.ability.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 mt-2">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Estatísticas</h2>
            <ul className="grid grid-cols-2 gap-2">
              {pokemon.stats.map(s => (
                <li key={s.stat.name} className="bg-white rounded p-2 text-sm shadow-sm flex justify-between items-center">
                  <span className="font-semibold text-blue-600">{s.stat.name}</span>
                  <span className="font-bold text-gray-700">{s.base_stat}</span>
                </li>
              ))}
            </ul>
          </div>
      </div>
    </div>
  );
}
