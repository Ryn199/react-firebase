// Pokemon.jsx
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPokemonList } from "../redux/Reducer";

export default function Pokemon() {
  const dispatch = useDispatch();

  // Mengakses state dari Redux store
  const pokemonList = useSelector((state) => state.pokemon.pokemonList);
  const loading = useSelector((state) => state.pokemon.isLoading);
  const error = useSelector((state) => state.pokemon.fetchError);

  useEffect(() => {
    // Memanggil thunk fetchPokemonList jika pokemonList kosong
    if (pokemonList.length === 0) {
      dispatch(fetchPokemonList());
    }
  }, [dispatch, pokemonList.length]);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }
  
  if (error) {
    return (
      <div className="text-red-500 text-center text-xl">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Pokémon List</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemonList.map((poke) => (
          <div key={poke.name} className="card bg-base-200 shadow-xl">
            <figure>
              <img
                src={poke.sprites.front_default}
                alt={poke.name}
                className="w-32 h-32 mx-auto my-2"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {poke.name.charAt(0).toUpperCase() + poke.name.slice(1)} 
              </h2>
              <a
                href={`/pokemon/${poke.id}`}
                className="btn btn-primary"
              >
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
