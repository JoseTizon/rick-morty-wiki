import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import Character from './components/Character'

function App() {
  
  const [location, setLocation] = useState({})
  const [searchValue, setSearchValue] = useState("")

  useEffect(() => {
    const random = Math.floor(Math.random() * 126) + 1
    axios.get(`https://rickandmortyapi.com/api/location/${random}`)
    .then(res => setLocation(res.data))
  }, [])

  const searchLocation = () => {
    axios.get(`https://rickandmortyapi.com/api/location/${searchValue}`)
    .then(res => setLocation(res.data))
  }

  console.log(location)

  const residentsTotal = () =>{
    if(location.residents?.length === 0){
      return(
        <>
          <h1>Any known resident from this location...</h1>
        </>
      )
    }
  }

  return (
    <div className="App">
      <header>
      <input type="number" placeholder='Type location ID here... (1-126)' className='search-bar' value={searchValue} onChange={e => setSearchValue(e.target.value)} />
      <button onClick={searchLocation} className='search-button'><i className="fa-solid fa-magnifying-glass"></i></button>
      </header>
      <div className='location-info'>
        <h1>{location.name} ({location.id})</h1>
        <p><b>Type | </b>{location.type}</p>
        <p><b>Dimension | </b>{location.dimension}</p>
      </div>
      {residentsTotal()}
      <ul className='container'>
        {location.residents?.map(characterUrl => (
          <Character characterUrl={characterUrl} key={characterUrl}/>
        ))}
      </ul>
    </div>
  )
}

export default App
