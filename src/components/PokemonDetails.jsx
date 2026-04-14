import useFetch from '../hooks/useFetch'

function PokemonDetails({ pokemon }) {
  const { data } = useFetch(pokemon?.url)

  const frontSprite = data?.sprites?.front_default
  const backSprite = data?.sprites?.back_default
  const types = data?.types ?? []
  const moves = data?.moves?.slice(0, 8) ?? []

  return (
    <section className="w-[610px] rounded-xl border-4 border-zinc-950 bg-zinc-100 px-5 py-4 shadow-[0_10px_20px_rgba(0,0,0,0.15)]">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-600">
            Selected Pokemon
          </p>
          <h2 className="text-2xl font-black capitalize text-zinc-950">
            {pokemon?.name ?? 'No pokemon'}
          </h2>

          <div className="mt-4 flex gap-3">
            <div className="flex h-24 w-24 items-center justify-center rounded-lg border-2 border-zinc-950 bg-white">
              {frontSprite ? (
                <img src={frontSprite} alt={`${pokemon?.name} front`} className="h-20 w-20" />
              ) : (
                <span className="text-xs font-bold text-zinc-500">Front</span>
              )}
            </div>

            <div className="flex h-24 w-24 items-center justify-center rounded-lg border-2 border-zinc-950 bg-white">
              {backSprite ? (
                <img src={backSprite} alt={`${pokemon?.name} back`} className="h-20 w-20" />
              ) : (
                <span className="text-xs font-bold text-zinc-500">Back</span>
              )}
            </div>
          </div>
        </div>

        <div className="min-w-[180px]">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-600">
            Categories
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {types.map(({ type }) => (
              <span
                key={type.name}
                className="rounded-full border-2 border-zinc-950 bg-yellow-200 px-3 py-1 text-xs font-bold uppercase"
              >
                {type.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-600">
          Moves
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {moves.map(({ move }) => (
            <div
              key={move.name}
              className="rounded-lg border-2 border-zinc-950 bg-white px-3 py-2 text-sm font-bold capitalize text-zinc-900"
            >
              {move.name.replace(/-/g, ' ')}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PokemonDetails
