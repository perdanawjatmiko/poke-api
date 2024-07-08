"use client"
import React, { useState, useEffect } from 'react';
import { getPokemonDetails } from '@/api/Pokemons';
import Link from 'next/link';

const PokemonDetailById = ({params}) => {
  const [detail, setDetail] = useState(null); // Mengubah initial state menjadi null karena detail adalah objek tunggal, bukan array

  useEffect(() => {
      const fetchDetails = async () => {
          try {
              const data = await getPokemonDetails(params.name);
              setDetail(data);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };

      fetchDetails();
    }, [params.name]); 
    console.log('Detail:' + detail)
  return (
    <div className='flex flex-col justify-start items-center gap-8 w-full'>
      <h1 className='text-4xl font-semibold capitalize mt-4 mb-8'>
        {detail.name}
      </h1>
      <div className='grid grid-cols-2 gap-4'>
        <div className='flex flex-col justify-center items-center'>
          <img className='w-full' src={detail.sprites.other['official-artwork'].front_default} alt="poke pics" />
        </div>
        <div className='flex flex-col justify-center items-center'>
          
        </div>
      </div>
    </div>
  )
}

export default PokemonDetailById