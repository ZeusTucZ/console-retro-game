
import { useState } from 'react'
import './App.css'
import BattleScreen from './components/BattleScreen'
import PokemonDetails from './components/PokemonDetails'
import Screen from './components/Screen'
import useFetch from './hooks/useFetch'
import LeftControl from './components/LeftControl'
import RightControl from './components/RightControl'

function App() {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=102&offset=0"
  const  {data} = useFetch(url)

  const [selectedIndex, setSelectedIndex] = useState(0)
  const pokemones = data?.results ?? []
  const selectedPokemonForDetails = pokemones[selectedIndex] ?? null
  const columns = 3

  const [gameScreen, setGameScreen] = useState('select')
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [enemyPokemon, setEnemyPokemon] = useState(null)

  const handleStartBattle = () => {
    if (!pokemones.length) return

    const playerPokemon = pokemones[selectedIndex]
    const randomIndex = Math.floor(Math.random() * pokemones.length)
    const cpuPokemon = pokemones[randomIndex]

    setSelectedPokemon(playerPokemon)
    setEnemyPokemon(cpuPokemon)
    setGameScreen('battle')
  }

  const handleExitBattle = () => {
    if (gameScreen !== 'battle') return

    setGameScreen('select')
  }


  const handleMoveSelection = (direction) => {
    if (!pokemones.length) return

    setSelectedIndex((currentIndex) => {
      switch (direction) {
        case 'up':
          return Math.max(currentIndex - columns, 0)
        case 'down':
          return Math.min(currentIndex + columns, pokemones.length - 1)
        case 'left':
          return Math.max(currentIndex - 1, 0)
        case 'right':
          return Math.min(currentIndex + 1, pokemones.length - 1)
        default:
          return currentIndex
      }
    })
  }

  console.log(data)

  return (
    <div className ="mt-24 flex flex-col items-center gap-6">
      <div className="flex justify-center">
        <LeftControl onMoveSelection={handleMoveSelection} />
        {gameScreen === 'select' ? (
          <Screen
            pokemones={pokemones}
            selectedIndex={selectedIndex}
            onSelectPokemon={setSelectedIndex}
          />
        ) : (
          <BattleScreen
            key={`${selectedPokemon?.name}-${enemyPokemon?.name}`}
            playerPokemon={selectedPokemon}
            enemyPokemon={enemyPokemon}
          />
        )}
        <RightControl onPressA={handleStartBattle} onPressB={handleExitBattle} />
      </div>

      {gameScreen === 'select' && (
        <PokemonDetails pokemon={selectedPokemonForDetails} />
      )}
    </div>
  )
}

export default App
