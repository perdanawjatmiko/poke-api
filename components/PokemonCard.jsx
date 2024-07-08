import React, { useState, useEffect } from 'react';
import { getPokemonDetails } from '@/api/Pokemons';
import Link from 'next/link';

const PokemonCard = ({ name }) => {
    const [detail, setDetail] = useState(null); // Mengubah initial state menjadi null karena detail adalah objek tunggal, bukan array

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const data = await getPokemonDetails(name);
                setDetail(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDetails();
    }, [name]); // Memberikan name sebagai dependency agar efek useEffect dipanggil ulang ketika name berubah

    return (
        <>
            {detail && ( // Memeriksa apakah detail sudah diambil sebelum menampilkan komponen di bawah
                <Link href={`/pokedex/${detail.name}`}>
                    <div className="w-full p-4 sm:p-8 bg-white border border-gray-200 rounded-lg shadow hover:scale-105 duration-150 dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex flex-col items-center px-2 py-4">
                            <img className="sm:w-44 mb-3 bg-gray-100 " src={detail.sprites.other['official-artwork'].front_default} alt="poke pics" />
                            <h5 className="mb-3 capitalize text-lg font-medium text-gray-900 dark:text-white">{detail.name}</h5>
                            <div className="flex">
                                {detail.types.map((type, index) => {
                                    const typeColors = {
                                        poison: 'bg-purple-200 text-purple-800',
                                        grass: 'bg-green-200 text-green-800',
                                        fire: 'bg-red-200 text-red-800',
                                        water: 'bg-blue-200 text-blue-800',
                                        electric: 'bg-yellow-200 text-yellow-800',
                                        normal: 'bg-neutral-200 text-neutral-800',
                                        bug: 'bg-green-600 text-white',
                                        fighting: 'bg-red-800 text-white',
                                        psychic: 'bg-fuchsia-200 text-fuchsia-800',
                                        flying: 'bg-gradient-to-b from-slate-300 to-blue-200 text-slate-800',
                                        ground: 'bg-gradient-to-b from-yellow-300 to-stone-400 text-black',
                                        rock: 'bg-yellow-200 text-yellow-800',
                                        ghost: 'bg-purple-200 text-purple-800',
                                        ice: 'bg-cyan-200 text-cyan-800',
                                        // Tambahkan jenis Pokemon lain di sini sesuai kebutuhan
                                    };
                                    let colorClass = 'bg-gray-200 text-gray-800';
                                    if (type.type.name in typeColors) {
                                        colorClass = typeColors[type.type.name];
                                    }
                                    return (
                                        <span key={index} className={`${colorClass} text-xs font-medium me-2 px-2.5 py-0.5 rounded capitalize`}>{type.type.name}</span>
                                    )
                                })}
                            </div>
                            {/* <div className="flex mt-4 md:mt-6">
                            <a href="#" className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Detail
                            </a>
                        </div> */}

                        </div>
                    </div>
                </Link>
            )}
        </>
    );
};

export default PokemonCard;