
import './App.css'
import Screen from './components/Screen';
import useFetch from './hooks/useFetch';
import LeftControl from './components/LeftControl'; 
import RightControl from './components/RightControl';


function App() {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0"
  const  {data, loading, error } = useFetch(url)
  
  
  console.log(data)
  
  return (
    <div className ="flex">
      <h1 className = 'text-3xl font-bold underline'>Hello World </h1>
      <LeftControl />
      <Screen pokemones={data?.results} />
      <RightControl />
    </div>
  );
}

export default App
