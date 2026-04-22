import { useMemo, useState } from 'react'
import useFetch from '../hooks/useFetch'

const getPokemonId = (pokemon) => pokemon?.url.split('/').filter(Boolean).pop()

const getPokemonImage = (pokemon) => {
  const id = getPokemonId(pokemon)
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}

const getPokemonBackImage = (pokemon) => {
  const id = getPokemonId(pokemon)
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
}

const formatMoveName = (name) => name.replace(/-/g, ' ')

const getRandomDamage = () => Math.floor(Math.random() * 18) + 8

function HealthBar({ name, value = 100 }) {
  return (
    <div className="w-[148px] rounded-md border-2 border-zinc-900 px-2 py-1 shadow-[2px_2px_0_rgba(0,0,0,0.25)]">
      <div className="grid grid-cols-[1fr_auto] items-center gap-2">
        <p className="min-w-0 truncate text-[10px] font-bold uppercase tracking-wide">
          {name}
        </p>
        <span className="whitespace-nowrap text-[9px] font-bold">{value} HP</span>
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
  const { data: enemyData } = useFetch(playerPokemon?.url)
  const [playerHp, setPlayerHp] = useState(100)
  const [enemyHp, setEnemyHp] = useState(100)
  const battleResult = enemyHp <= 0 ? 'win' : playerHp <= 0 ? 'lost' : null
  const [turn, setTurn] = useState('player');

  const playerMoves = useMemo(
    () => playerData?.moves?.slice(0, 4).map(({ move }) => move) ?? [],
    [playerData]
  )

  const enemyMoves = useMemo(
    () => enemyData?.moves?.slice(0, 4).map(({ move }) => move) ?? [],
    [enemyData]
  )

  const handleAttack = (move) => {
    if (turn != 'player') return;
    if (playerHp <= 0 || enemyHp <= 0) return

    const playerDamage = getRandomDamage()
    const nextEnemyHp = Math.max(enemyHp - playerDamage, 0)

    setEnemyHp(nextEnemyHp);

    if (nextEnemyHp === 0) {
      setTurn('ended')
      return
    }

    setTurn('enemy');

    setTimeout(() => {
      const cpuMove = enemyMoves[Math.floor(Math.random() * enemyMoves.length)] ?? { name: 'tackle' }

      const cpuDamage = getRandomDamage();
      const nextPlayerHp = Math.max(playerHp - cpuDamage, 0);

      setPlayerHp(nextPlayerHp);

      if (nextPlayerHp === 0) {
        setTurn('ended');
        return;
      }

      setTurn('player');
    }, 500)
  }

  return (
    <section className="relative grid h-[200px] w-[450px] grid-rows-[1fr_auto] border-4 border-solid px-4 py-3">
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
            src={getPokemonBackImage(playerPokemon)}
            alt={playerPokemon?.name}
            className="h-18 w-18"
          />
          <HealthBar name={playerPokemon?.name} value={playerHp} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-1 pt-1">
        {playerMoves.map((move) => (
          <button
            key={move.name}
            type="button"
            onClick={() => handleAttack(move)}
            disabled={turn != 'player' || playerHp <= 0 || enemyHp <= 0}
            className="rounded border border-zinc-900 px-1.5 py-1 text-left text-[9px] font-bold uppercase leading-tight disabled:opacity-50"
          >
            {formatMoveName(move.name)}
          </button>
        ))}
      </div>

      {battleResult && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/55">
          <div className="rounded border-4 border-zinc-100 bg-zinc-900 px-8 py-5 text-center text-zinc-100 shadow-[0_0_0_4px_rgba(0,0,0,0.45)]">
            <p className="text-2xl font-black tracking-[0.3em]">GAME OVER</p>
            <p className="mt-2 text-lg font-bold tracking-[0.25em]">
              {battleResult === 'win' ? 'YOU WIN' : 'YOU LOST'}
            </p>
          </div>
        </div>
      )}
    </section>
  )
}

export default BattleScreen
