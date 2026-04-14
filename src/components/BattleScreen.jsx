import { useEffect, useMemo, useState } from 'react'
import useFetch from '../hooks/useFetch'

const getPokemonId = (pokemon) => pokemon?.url.split('/').filter(Boolean).pop()

const getPokemonImage = (pokemon) => {
  const id = getPokemonId(pokemon)
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}

const formatMoveName = (name) => name.replace(/-/g, ' ')

const getRandomDamage = () => Math.floor(Math.random() * 18) + 8

function HealthBar({ name, align = 'left', value = 100 }) {
  const isRight = align === 'right'

  return (
    <div
      className={`w-[136px] rounded-md border-2 border-zinc-900 px-2 py-1 shadow-[2px_2px_0_rgba(0,0,0,0.25)] ${
        isRight ? 'text-right' : 'text-left'
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] font-bold uppercase tracking-wide">{name}</p>
        <span className="text-[9px] font-bold">{value}/100</span>
      </div>
      <div className="mt-1 h-[6px] rounded-full border border-zinc-900 bg-zinc-700 p-px">
        <div
          className="h-full rounded-full bg-[#58d858]"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

function BattleScreen({ playerPokemon, enemyPokemon }) {
  const { data: playerData } = useFetch(playerPokemon?.url)
  const { data: enemyData } = useFetch(enemyPokemon?.url)
  const [playerHp, setPlayerHp] = useState(100)
  const [enemyHp, setEnemyHp] = useState(100)

  const playerMoves = useMemo(
    () => playerData?.moves?.slice(0, 4).map(({ move }) => move) ?? [],
    [playerData]
  )

  const enemyMoves = useMemo(
    () => enemyData?.moves?.slice(0, 4).map(({ move }) => move) ?? [],
    [enemyData]
  )

  useEffect(() => {
    setPlayerHp(100)
    setEnemyHp(100)
  }, [playerPokemon, enemyPokemon])

  const handleAttack = (move) => {
    if (playerHp <= 0 || enemyHp <= 0) return

    const playerDamage = getRandomDamage()
    const nextEnemyHp = Math.max(enemyHp - playerDamage, 0)

    if (nextEnemyHp === 0) {
      setEnemyHp(0)
      return
    }

    const cpuMove =
      enemyMoves[Math.floor(Math.random() * enemyMoves.length)] ?? { name: 'tackle' }
    const cpuDamage = getRandomDamage()
    const nextPlayerHp = Math.max(playerHp - cpuDamage, 0)

    setEnemyHp(nextEnemyHp)
    setPlayerHp(nextPlayerHp)
  }

  return (
    <section className="grid h-[200px] w-[450px] grid-rows-[1fr_auto] border-4 border-solid px-4 py-3">
      <div className="relative min-h-0 pb-1">
        <div className="absolute right-1 top-0 flex items-start gap-2">
          <HealthBar name={enemyPokemon?.name} value={enemyHp} />
          <img
            src={getPokemonImage(enemyPokemon)}
            alt={enemyPokemon?.name}
            className="mt-1 h-16 w-16"
          />
        </div>

        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-bold">
          VS
        </p>

        <div className="absolute bottom-0 left-1 flex items-end gap-2">
          <img
            src={getPokemonImage(playerPokemon)}
            alt={playerPokemon?.name}
            className="h-18 w-18"
          />
          <HealthBar name={playerPokemon?.name} align="right" value={playerHp} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1 pt-1">
        {playerMoves.map((move) => (
          <button
            key={move.name}
            type="button"
            onClick={() => handleAttack(move)}
            disabled={playerHp <= 0 || enemyHp <= 0}
            className="rounded border border-zinc-900 px-1.5 py-1 text-left text-[9px] font-bold uppercase leading-tight disabled:opacity-50"
          >
            {formatMoveName(move.name)}
          </button>
        ))}
      </div>
    </section>
  )
}

export default BattleScreen
