import React from 'react';
import './PokemonCard.css';

function PokemonCard({ pokemon, onClick }) {
  const imagePokemon = pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default;

  return (
    <div className="pokemon-card" onClick={onClick}>
      <div className="pokemon-image-container">
        <img src={imagePokemon} alt={pokemon.name} className="pokemon-image" />
      </div>
      <div className="pokemon-info">
        <h3 className="pokemon-name" style={{ textTransform: 'capitalize' }}>
          {pokemon.name}
        </h3>
        <div className="pokemon-types">
          {pokemon.types.map((typeObj, index) => (
            <span 
              key={index} 
              className={`type-badge type-${typeObj.type.name}`}
            >
              {typeObj.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
