
import { useEffect, useRef } from 'react'

const Screen = ({ pokemones, selectedIndex, onSelectPokemon }) => {
  const selectedPokemonRef = useRef(null)

  useEffect(() => {
    selectedPokemonRef.current?.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
    })
  }, [selectedIndex])

  return (
    <div className="w-[450px] h-[200px] border-4 border-solid overflow-y-auto overflow-x-hidden p-2 grid grid-cols-3 gap-3">
      {pokemones?.map((pokemon, index) => {
        const id = pokemon.url.split('/').filter(Boolean).pop()
        const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        const isSelected = index === selectedIndex

        return (
          <button
            key={pokemon.name}
            type="button"
            ref={isSelected ? selectedPokemonRef : null}
            onClick={() => onSelectPokemon(index)}
            className={`flex flex-col items-center rounded-md border-2 p-2 ${
              isSelected ? 'border-emerald-500 bg-emerald-100/40' : 'border-transparent'
            }`}
          >
            <img src={image} alt={pokemon.name} className="w-16 h-16" />
            <p className="text-xs capitalize">{pokemon.name}</p>
          </button>
        )
      })}
    </div>
  )
}

export default Screen
