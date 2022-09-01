import React, {useEffect, useState} from 'react'
import './App.css'
import Hotbar from './components/Hotbar/Hotbar'
import Screen from './components/Screen/Screen'
import { PlayerContext } from './components/Contexts/PlayerContext'

const App = () => {
  const [player, setPlayer] = useState({
    inventory: [],
    startingEnergy: 5,
    currentEnergy: 5,
    day: 1,
    log: []
  })

  // Starting new day
  useEffect(() => {
    let updatedPlayer = {...player}
    updatedPlayer.log = [`Started new day! It is now Day ${player.day}.`]
    setPlayer(updatedPlayer)
  },[player.day])

  useEffect(() => {
    console.log(player)
  }, [player])

  return (
    <>
    <PlayerContext.Provider value={{player, setPlayer}}>
      <Screen />
      <Hotbar />
    </PlayerContext.Provider>
    </>
  )
}

export default App;
