const getData = async (limit = 10, offset = 0) => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Pokemons:', error);
      return "Error fetching data";
    }
}

export const getPokemons = async (limit = 10, offset = 0) => {
    
    const data = await getData(limit, offset);
    return data.results;
  };

export const getTotalPokemons = async () => {
    const data = await getData();
    return data.count;
  };


export const getPokemonDetails = async (pokemonName) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Pokemons details:', error);
    }
  };
