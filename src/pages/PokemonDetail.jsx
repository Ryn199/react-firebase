import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonDetail } from "../redux/Reducer";

export default function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Ambil data dari Redux store
  const pokemon = useSelector((state) => state.pokemon.pokemonDetail);
  const loading = useSelector((state) => state.pokemon.isDetailLoading);
  const error = useSelector((state) => state.pokemon.detailError);
  

  useEffect(() => {
    dispatch(fetchPokemonDetail(id));
  }, [id, dispatch]);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }
  if (error) {
    return (
      <div className="text-red-500 text-center text-xl">
        Error: {error.message}
      </div>
    );
  }

  if (!pokemon) {
    return <div className="text-center text-xl">Pokémon not found</div>;
  }

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="card bg-base-200 shadow-xl w-full max-w-lg p-6">
        <div className="stats shadow mb-6">
          {pokemon.stats.map((stat) => (
            <div key={stat.stat.name} className="stat place-items-center">
              <div className="stat-title">{stat.stat.name.toUpperCase()}</div>
              <div className="stat-value">{stat.base_stat}</div>
              <div className="stat-desc">Base Stat</div>
            </div>
          ))}
        </div>

        <figure>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-32 h-32 mx-auto my-4"
          />
        </figure>

        <div className="card-body text-left">
          <div className="card-body text-center"> 
            <h2 className="text-3xl text-bold">
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </h2>
          </div>
          <p className="text-gray-600 mt-2">ID: {pokemon.id}</p>
          <p className="text-gray-600">Height: {pokemon.height / 10} M</p>
          <p className="text-gray-600">Weight: {pokemon.weight / 10} Kg</p>
          <p className="text-gray-600 mb-4">
            Base Experience: {pokemon.base_experience}
          </p>

          <h3 className="text-xl font-semibold mt-4 mb-2">Type</h3>
          <ul className="list-disc list-inside">
            {pokemon.types.map((type) => (
              <li key={type.type.name}>
                {type.type.name.charAt(0).toUpperCase() +
                  type.type.name.slice(1)}
              </li>
            ))}
          </ul>
          <h3 className="text-xl font-semibold mt-4 mb-2">Abilities</h3>
          <ul className="list-disc list-inside">
            {pokemon.abilities.map((ability) => (
              <li key={ability.ability.name}>
                {ability.ability.name.charAt(0).toUpperCase() +
                  ability.ability.name.slice(1)}
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold mt-4 mb-2">Moves</h3>
          <ul className="list-disc list-inside overflow-y-auto max-h-32">
            {pokemon.moves.slice(0, 5).map((move) => (
              <li key={move.move.name}>
                {move.move.name.charAt(0).toUpperCase() +
                  move.move.name.slice(1)}
              </li>
            ))}
          </ul>

          <div className="flex justify-center mt-6">
            <button
              onClick={() => navigate("/pokemon")}
              className="btn btn-secondary"
            >
              Back to Pokemon List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
