# Console Retro Game — Pokémon-Style Turn-Based Battle

A retro console-style Pokémon battle game in the browser: pick a Pokémon,
read its details, and fight a turn-based battle against a random CPU
opponent.

## What it does

- Fetches the first 102 Pokémon from the
  [PokéAPI](https://pokeapi.co/api/v2/pokemon?limit=102&offset=0) — an
  internet connection is required.
- Selection screen: a 3-column grid navigated with on-screen D-pad style
  controls (left / right panels) or by clicking, plus a details panel for
  the selected Pokémon.
- Battle screen: start a battle with your selected Pokémon against a random
  CPU Pokémon; battles play out turn by turn.

## Stack

- React 19 + Vite
- Tailwind CSS 4
- Data from PokéAPI (no backend, no local game data)

## Run locally

```bash
npm install
npm run dev
```

The Vite dev server runs on `http://localhost:5173` by default.

Other scripts:

```bash
npm run build    # production build
npm run preview  # preview the production build
npm run lint     # ESLint
```

## Project structure

```text
src/
├── App.jsx                  # game state: select screen vs. battle screen
├── hooks/useFetch.jsx       # data fetching from PokéAPI
└── components/
    ├── Screen.jsx           # Pokémon selection grid
    ├── PokemonDetails.jsx   # details panel for the selected Pokémon
    ├── BattleScreen.jsx     # turn-based battle view
    ├── LeftControl.jsx      # D-pad style navigation (up / down / left / right)
    └── RightControl.jsx
```

## Current state and limitations

- No screenshot exists yet.
- No tests or CI, and no live demo URL.
- Battle opponents and the Pokémon list come from the live PokéAPI, so the
  game needs internet access to load.
