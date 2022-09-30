import React, {useEffect, useState} from 'react'
import './App.css'
import Hotbar from './components/Hotbar/Hotbar'
import Screen from './components/Screen/Screen'
import { PlayerContext } from './components/Contexts/PlayerContext'
import { SeedContext } from './components/Contexts/SeedContext'
import { priceList, priceListSetter } from './components/Hotbar/Market/SeedPrice'

const App = () => {
  const [player, setPlayer] = useState({
    essence: 0,
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

  const [seedPriceList, setSeedPriceList] = useState(priceList)
  const [inventory, setInventory] = useState(player.inventory)
  const [inventoryLevel, setInventoryLevel] = useState(player.inventoryLevel)
  const [log, setLog] = useState(player.log)
  let updatedPlayer = {...player}
  let updatedLog = [...log]

  // Starting new day
  useEffect(() => {
    updatedLog = []
    updatedLog.push(`Started a new day! It is now Day ${player.day}.`)
    // Set prices of seeds (after day 1)
    if (player.day !== 1) {
      priceListSetter(seedPriceList)
    }

    // Check if garden has any fully grown plants
    for (let i=0; i < player.garden.length; i++) {

      // Run check through garden array for fully grown plants
      if (player.garden[i].matureDay === player.day) {
        updatedLog.push(`${player.garden[i].name} is fully grown!`)
      }

      updatedPlayer.log = updatedLog
      setPlayer(updatedPlayer)
    }
  },[player.day])

  // Refresh
  useEffect(() => {
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
      <SeedContext.Provider value={{seedPriceList, setSeedPriceList}}>
          <Screen />
          <Hotbar />
      </SeedContext.Provider>
    </PlayerContext.Provider>
    </>
  )
}

export default App;
