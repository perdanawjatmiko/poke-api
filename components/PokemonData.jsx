'use client'

import {useState, useEffect} from 'react'
import { useSearchParams } from 'next/navigation'
import { getPokemons, getTotalPokemons } from '@/api/Pokemons'
import PokemonCard from './PokemonCard'
import Pagination from './Pagination'

const PokemonData = () => {
    const [pokemons, setPokemons] = useState([])
    const [total, setTotal] = useState(0)
    const [limit, setLimit] = useState(16)
    const searchParams = useSearchParams()
    const currentPage = searchParams.get('page') || 1

    useEffect(() => {
      const offset = (currentPage - 1) * limit
      const fetchPokemons = async () => {
        try {
          const data = await getPokemons(limit, offset)
          const total = await getTotalPokemons()
          setPokemons(data)
          setTotal(total)
          console.log('current page:', currentPage)
          console.log('current offsetr:', offset)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
      fetchPokemons()
    }, [])

  return (
    <div className='flex flex-col justify-center items-center px-4 sm:px-8'>
    <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center items-center'>
        {pokemons.map((pokemon, i) => {
            return (
                <PokemonCard
                    key={i}
                    name={pokemon.name}
                />
            )
        })}
    </div>
    <div className='flex justify-center text-xs mt-8'>
        {/* Render pagination */}
        <Pagination page={currentPage} total={total} limit={limit}/>
    </div>
    </div>
  )
}

export default PokemonData