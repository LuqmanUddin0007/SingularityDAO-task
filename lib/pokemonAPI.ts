
const POKEMON_API = "https://pokeapi.co/api/v2/item-category";

// getPokemonList -> Get the first 151 pokemon 
export async function getPokemonList() {
    const response = await fetch(POKEMON_API + "?limit=55&offset=0");
    const data = await response.json();
    return data.results;
}

// getPokemon -> given a string "pikachu", get the information of pikachu
export async function getPokemon(name: string) {
    // pokemon/ditto


    const response = await fetch(POKEMON_API + "/" + name);
    const data = await response.json();
   
    return data;
}
