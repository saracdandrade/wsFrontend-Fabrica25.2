import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="w-full h-[200px] md:h-[300px] relative flex items-center justify-center bg-gradient-to-r from-blue-300 to-purple-300 shadow overflow-hidden">
      <div className='flex items-center justify-center'>
        <Image
          src="/img_pokemon2.jpg"
          alt="Logo Header"
          width={1000}
          height={1000}
          className="object-contain"
        />
        <Image
          src="/img_pokemon2.jpg"
          alt="Logo Header"
          width={1000}
          height={1000}
          className="object-contain"
        />
        <Image
          src="/img_pokemon2.jpg"
          alt="Logo Header"
          width={1000}
          height={1000}
          className="object-contain"
        />
        </div>

  <div className="absolute bottom-0 left-0 w-full flex justify-center gap-4 bg-white bg-opacity-70 shadow py-4">
    <Link href="/" className="text-white font-bold px-4 py-2 bg-yellow-600 rounded hover:bg-yellow-700">Página Inicial</Link>
    <Link href="/favorites" className="text-white font-bold px-4 py-2 bg-yellow-600 rounded hover:bg-yellow-700">Favoritos</Link>
  </div>
   
    </header>
  );
}