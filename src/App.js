import React, {useEffect, useState} from 'react'
import './App.css'
import Hotbar from './components/Hotbar/Hotbar'
import Screen from './components/Screen/Screen'
import { PlayerContext } from './components/Contexts/PlayerContext'

const App = () => {
  const [player, setPlayer] = useState({
    inventory: [],
    inventoryLevel: 1,
    inventoryFull: false,
    startingEnergy: 5,
    currentEnergy: 5,
    day: 1,
    log: [],
    garden: [],
    gardenLevel: 1
  })
  const [inventory, setInventory] = useState(player.inventory)
  const [inventoryLevel, setInventoryLevel] = useState(player.inventoryLevel)
  const [log, setLog] = useState(player.log)
  let updatedPlayer = {...player}
  let updatedLog = [...log]

  // Starting new day
  useEffect(() => {
    updatedPlayer.log = [`Started a new day! It is now Day ${player.day}.`]
    setPlayer(updatedPlayer)
  },[player.day])

  // Refresh
  useEffect(() => {
    console.log(player)
    setInventory(player.inventory)
    setLog(player.log)
  }, [player])


  // Check if inventory is full
  useEffect(() => {
    if (inventory.length === inventoryLevel * 5) {
      updatedPlayer.inventoryFull = true
      updatedLog.push('Your inventory is full!')
      updatedPlayer.log = updatedLog
      setPlayer(updatedPlayer)
    } else {
      updatedPlayer.inventoryFull = false
      setPlayer(updatedPlayer)
    }
  }, [inventory])

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
