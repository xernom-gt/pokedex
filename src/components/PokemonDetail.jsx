import React from 'react';
import './PokemonDetail.css';

function PokemonDetail({ pokemon, onBack }) {
  const imageUrl = pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default;

  return (
    <div className="pokemon-detail-container">
      <button className="back-btn" onClick={onBack}>
        &larr; Kembali
      </button>

      <div className="detail-card">
        <div className="detail-header" style={{ backgroundColor: '#f8f9fa' }}>
          <img src={imageUrl} alt={pokemon.name} className="detail-image" />
        </div>
        
        <div className="detail-body">
          <h2 className="detail-name">{pokemon.name}</h2>
          
          <div className="detail-types">
            {pokemon.types.map((t, idx) => (
              <span key={idx} className={`type-badge type-${t.type.name}`}>
                {t.type.name}
              </span>
            ))}
          </div>

          <div className="detail-stats">
            <h3>Status</h3>
            {pokemon.stats.map((statObj, index) => (
              <div key={index} className="stat-row">
                <span className="stat-name">{statObj.stat.name}</span>
                <span className="stat-value">{statObj.base_stat}</span>
                <div className="stat-bar-container">
                  <div 
                    className="stat-bar" 
                    style={{ 
                      width: `${Math.min(statObj.base_stat, 100)}%`,
                      backgroundColor: statObj.base_stat > 50 ? '#7AC74C' : '#e63946'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="detail-info">
            <div className="info-box">
              <p>Tinggi</p>
              <h4>{pokemon.height / 10} m</h4>
            </div>
            <div className="info-box">
              <p>Berat</p>
              <h4>{pokemon.weight / 10} kg</h4>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;
