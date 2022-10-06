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
      purchasedEye: false,
      load: false,
      win: false,
      winDay: 0,
      level: 1
    }

  const [player, setPlayer] = useState(defaultPlayer)

  const [seedPriceList, setSeedPriceList] = useState(priceList)
  const [inventory, setInventory] = useState(player.inventory)
  const [inventoryLevel, setInventoryLevel] = useState(player.inventoryLevel)
  const [log, setLog] = useState(player.log)
  const [day, setDay] = useState(player.day)
  const [week, setWeek] = useState(1)
  let updatedPlayer = {...player}
  let updatedLog = [...log]

    // Refresh
    useEffect(() => {
      setInventory(player.inventory)
      setInventoryLevel(player.inventoryLevel)
      setLog(player.log)
      setDay(player.day)

      // Check if essence is 1mil
      if (player.win === false && player.essence >= 1000000) {
        alert(`Congratulations! You have achieved 1 million essence in ${player.day} days!`)
        updatedPlayer.winDay = player.day
        updatedPlayer.win = true
        setPlayer(updatedPlayer)
      }
    }, [player])

    // Win message
    useEffect(() => {
      if (player.win === true) {
        updatedLog.push(`You won! You have completed the game on Day ${player.winDay}!`)
        updatedPlayer.log = updatedLog
        setPlayer(updatedPlayer)
      }
    }, [player.win, day])

  // Starting new day
  useEffect(() => {
    // Set week
    setWeek(Math.ceil(day / 7))

    // New day message
    updatedLog.push(`Started a new day! It is now Day ${day}.`)
    // New week message
    if ( (day - 1) % 7 === 0) {
      updatedLog.push(`Started new week! It is Week ${week + 1}.`)
    }
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

    // Check for mature gem plants to produce essence
    for (let i=0; i < player.garden.length; i++) {
      let currentSeed = player.garden[i]
      let currentSeedPrice
      // Run check through garden array for fully grown plants
      if (currentSeed.type === 'Gem' && currentSeed.matureDay <= day) {
        // Find price of seed in seedPriceList
        for (let j=0; j < seedPriceList.length; j++) {
          if (seedPriceList[j].name === currentSeed.name) {
            currentSeedPrice = seedPriceList[j].price
          }
        }
        let currentSeedReturns = Math.ceil(currentSeedPrice * 0.1)
        updatedPlayer.essence += currentSeedReturns
        updatedLog.push(`${currentSeed.name} has provided you with ${currentSeedReturns} essence!`)
      }
    }

    // Remove crosses (placeholders)
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


    // Set level
    useEffect(() => {
      if (player.level < 8) {
        updatedPlayer.level = week
        setPlayer(updatedPlayer)
      }
    }, [week])


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
  }, [inventoryLevel, inventory])

  return (
    <>
    <PlayerContext.Provider value={{player, setPlayer}}>
      <SeedContext.Provider value={{seedPriceList, setSeedPriceList}}>
          <Screen />
          <Hotbar />
          <span className='watermark'>© nigel1234567</span>
      </SeedContext.Provider>
    </PlayerContext.Provider>
    </>
  )
}

export default App;
