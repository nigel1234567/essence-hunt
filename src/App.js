import React, {useEffect, useState} from 'react'
import './App.css'
import Hotbar from './components/Hotbar/Hotbar'
import Screen from './components/Screen/Screen'
import { PlayerContext } from './components/Contexts/PlayerContext'
import { SeedContext } from './components/Contexts/SeedContext'
import { priceList } from './components/Hotbar/Market/SeedPrice'

const App = () => {
    const defaultPlayer = {
      essence: 0,
      inventory: [],
      inventoryLevel: 1,
      inventoryFull: false,
      startingEnergy: 5,
      currentEnergy: 5,
      day: 1,
      log: [],
      garden: [],
      gardenLevel: 1,
      equipment: [],
      grid: [],
      scannedGrid: [],
      purchasedEye: false
    }

  const [player, setPlayer] = useState(defaultPlayer)

  const [seedPriceList, setSeedPriceList] = useState(priceList)
  const [inventory, setInventory] = useState(player.inventory)
  const [inventoryLevel, setInventoryLevel] = useState(player.inventoryLevel)
  const [log, setLog] = useState(player.log)
  const [day, setDay] = useState(player.day)
  let updatedPlayer = {...player}
  let updatedLog = [...log]

    // Refresh
    useEffect(() => {
      setInventory(player.inventory)
      setLog(player.log)
      setDay(player.day)
    }, [player])

  // Starting new day
  useEffect(() => {

    // If day 1
    if (day === 1) {
      updatedLog.push(`Started new week! It is Week 1.`)
    }
    updatedLog.push(`Started a new day! It is now Day ${day}.`)
    // Set prices of seeds (after day 1)
    if (day !== 1) {
      // Save player and seedPriceList object
      window.localStorage.setItem('player', JSON.stringify(player))
      window.localStorage.setItem('seedPriceList', JSON.stringify(seedPriceList))
      updatedLog.push(`Your game has been saved.`)
    }

    // Refresh scannedGrid and purchasedEye
    updatedPlayer.scannedGrid = []
    let eyeCheck = false
    for (let i=0; i < updatedPlayer.equipment.length; i++) {
      if (updatedPlayer.equipment[i].name === 'Magic Eye') {
        eyeCheck = true
      }
    }
    if (eyeCheck === false) {
      updatedPlayer.purchasedEye = false
    }

    // Check if garden has any fully grown plants
    for (let i=0; i < player.garden.length; i++) {
      // Run check through garden array for fully grown plants
      if (player.garden[i].matureDay === day) {
        updatedLog.push(`${player.garden[i].name} is fully grown!`)
      }
    }

    // Remove crosses
    let updatedEquipment = []
    for (let i=0; i < player.equipment.length; i++) {
      if (player.equipment[i].name !== 'Used Slot') {
        updatedEquipment.push(player.equipment[i])
      }
    }
    updatedPlayer.equipment = updatedEquipment
    updatedPlayer.log = updatedLog
    setPlayer(updatedPlayer)
  },[day])



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
