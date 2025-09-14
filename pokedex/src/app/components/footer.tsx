import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-16">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-4">
          <p>
            Desenvolvido por <a href="https://github.com/saracdandrade" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-yellow-400 transition-colors">
              [Sara Coutinho de Andrade]
            </a>
          </p>
          <p className="hidden md:block">|</p>
          <p>
            Dados fornecidos pela <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer" className="font-bold hover:text-yellow-400 transition-colors">
              PokéAPI
            </a>
          </p>
        </div>
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Pokedex Project. Todos os direitos reservados.
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Pokémon e os nomes dos personagens Pokémon são marcas registradas da Nintendo.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
