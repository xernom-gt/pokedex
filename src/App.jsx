import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import PokemonCard from './components/PokemonCard';
import PokemonDetail from './components/PokemonDetail';

function App() {
  const [dataPokemon, setDataPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [offset, setOffset] = useState(0);
  
  const [kataKunci, setKataKunci] = useState('');
  const [pokemonTerpilih, setPokemonTerpilih] = useState(null);

  const fetchPokemon = async () => {
    setIsLoading(true);
    setIsError(false);
    
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      
      let detailPokemons = [];
      for (let i = 0; i < data.results.length; i++) {
        const item = data.results[i];
        const resDetail = await fetch(item.url);
        const detailData = await resDetail.json();
        detailPokemons.push(detailData);
      }
      
      setDataPokemon((prev) => [...prev, ...detailPokemons]);
      
      setOffset((prevOffset) => prevOffset + 20);
    } catch (error) {
      console.log(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (dataPokemon.length === 0) {
      fetchPokemon();
    }
  }, []);

  const handleSearch = (e) => {
    setKataKunci(e.target.value.toLowerCase());
  };

  const handleCardClick = (pokemon) => {
    setPokemonTerpilih(pokemon);
  };

  const handleKembali = () => {
    setPokemonTerpilih(null);
  };

  const filteredPokemon = dataPokemon.filter((poke) => 
    poke.name.toLowerCase().includes(kataKunci)
  );

  return (
    <div className="app-container">
      <Navbar />
      
      <main className="main-content">
        {pokemonTerpilih ? (
          <PokemonDetail 
            pokemon={pokemonTerpilih} 
            onBack={handleKembali} 
          />
        ) : (
          <>
            <SearchBar value={kataKunci} onChange={handleSearch} />
            
            {isError && (
              <p className="error-msg">Aduh, gagal ambil data. Coba refresh deh.</p>
            )}

            <div className="pokemon-grid">
              {filteredPokemon.map((poke) => (
                <PokemonCard 
                  key={poke.id} 
                  pokemon={poke} 
                  onClick={() => handleCardClick(poke)} 
                />
              ))}
            </div>

            {isLoading && <p className="loading-text">Memuat...</p>}

            {!isLoading && !kataKunci && !isError && (
              <div className="load-more-container">
                <button 
                  className="load-more-btn" 
                  onClick={fetchPokemon}
                >
                  Tampilkan lebih banyak
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
