function RightControl({ onPressA, onPressB }) {
  const actionButtons = [
    { label: 'X', className: 'col-start-2 row-start-1' },
    { label: 'Y', className: 'col-start-1 row-start-2' },
    { label: 'A', className: 'col-start-3 row-start-2' },
    { label: 'B', className: 'col-start-2 row-start-3' },
  ]

  return (
    <aside className="relative flex h-[200px] w-[80px] flex-col items-center rounded-r-[26px] border-4 border-zinc-950 bg-[#ff5f57] px-2 py-3 text-zinc-950 shadow-[inset_5px_0_0_rgba(255,255,255,0.18),inset_0_-8px_12px_rgba(0,0,0,0.18)]">
      <div className="mt-2 grid h-16 w-16 grid-cols-3 grid-rows-3 place-items-center">
        {actionButtons.map((button) => (
          <button
            key={button.label}
            type="button"
            onClick={
              button.label === 'A'
                ? onPressA
                : button.label === 'B'
                  ? onPressB
                  : undefined
            }
            className={`${button.className} flex h-5 w-5 items-center justify-center rounded-full border-2 border-zinc-950 bg-zinc-900 text-[10px] font-black text-zinc-50 shadow-[inset_-1px_-2px_4px_rgba(0,0,0,0.38),inset_1px_1px_3px_rgba(255,255,255,0.06)]`}
          >
            {button.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-zinc-950 bg-zinc-800 shadow-[inset_-3px_-4px_6px_rgba(0,0,0,0.38),inset_3px_3px_6px_rgba(255,255,255,0.08)]">
        <div className="h-4 w-4 rounded-full border border-zinc-950 bg-zinc-900" />
      </div>
    </aside>
  )
}

export default RightControl
