
export default function PokemonPage({ params } : { params: { pokemonId: string } }) {
    // Object destructuring
    const { pokemonId } = params;
    
    console.log(pokemonId)
    // const pokemonObject = await getPokemon(name);
    // console.log(pokemonObject.items)
    return (
        <>
            <h1>hello{pokemonId}</h1>
        </>
    )
}