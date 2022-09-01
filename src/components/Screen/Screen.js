import React, { useState, useEffect, useContext } from 'react'
import EquipmentSlot from './Equipment/EquipmentSlot'
import Grid from './Map/Grid'
import SeedSlot from './Map/SeedSlot'
import LogDisplay from '../Hotbar/Log/LogDisplay'
import { seedGenerator } from './Map/Seeds/Seeds'
import { DayContext, EnergyContext, StartingEnergyContext } from '../Contexts/PlayerContext'
import { LootContext } from '../Contexts/LootContext'
import { LogContext } from '../Contexts/LogContext'
import './styles/Screen.css'

const Screen = () => {
  // Equipment

  // Map info
  const [level, setLevel] = useState(1)
  const [startingSeed, setStartingSeed] = useState()
  const [seeds, setSeeds] = useState([])
  const [seedSlots, setSeedSlots] = useState()
  const [gridItemsArray, setGridItemsArray] = useState([])
  const [grid, setGrid] = useState()

  // Player info
  const {startingEnergy, setStartingEnergy} = useContext(StartingEnergyContext)
  const {currentEnergy, setCurrentEnergy} = useContext(EnergyContext)
  const [loot, setLoot] = useState([])
  const {day, setDay} = useContext(DayContext)
  
  // Log
  const [log, setLog] = useState([])

  // Functions
  // Durstenfeld shuffle
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  }

  // Items array
  // Levels
  let currentLevel = level + 2
  const maxLevel = 10
  useEffect(()=>{
    // Set currentLevel (limited by maxLevel)
    if (level < maxLevel - 2) {
      currentLevel= level + 2
    } else {
      currentLevel = maxLevel
    }
  }, [level])

  // Set starting seed
  useEffect(() => {
    // Reset startingSeed and seedArray
    // Max seed = 10
    if (level > 8) {
      setStartingSeed(10)
    } else {
      setStartingSeed(level + 2)
    }
    
  }, [level])

  let gridItems = []
  // Set gridItems, seedArray and seeds
  useEffect(() => {
    // Loop creating of gridItems array
    for (let i=0; i < currentLevel * currentLevel; i++) {
      // Add in the loot on the first row
      if (i < currentLevel) {
        let loot = seedGenerator()
        gridItems.push(loot)
      } else {
        // Add in empty for remaining rows
        gridItems.push('empty')
      }
      // Shuffle gridItems array
      shuffleArray(gridItems)
    }
    setGridItemsArray(gridItems)

  }, [startingSeed, currentLevel, day])

  useEffect(() => {
    // Generating seed slots
    let seedArray = []
    // Push seeds from gridItemsArray into seedArray
    for (let item in gridItemsArray) {
      let currentItem = gridItemsArray[item]
      if (currentItem !== 'empty') {
        seedArray.push(currentItem)
      }
    }
    setSeeds(seedArray)

    // Reset LootContext, grid and seedSlots
    setGrid()
    setSeedSlots()
    setLoot([])
  }, [gridItemsArray])

  // Set Grid
  useEffect(() => {
    setGrid(<Grid level={level} items={gridItemsArray}/>)
  }, [seeds, day])

  // Set SeedSlot components
  useEffect(() => {
    // Record positions of seeds
    let lootSeedsArray = []
    for (let pos in gridItemsArray) {
      if (gridItemsArray[pos] !== 'empty') {
        let lootSeed = { key: pos,  name: gridItemsArray[pos].name, image: gridItemsArray[pos].image}
        lootSeedsArray.push(lootSeed)
      }
    }
    // Shuffle positions of lootSeedsArray
    shuffleArray(lootSeedsArray)
    // Seed slots shown in window
    setSeedSlots(lootSeedsArray.map(item => {
      return (
        <SeedSlot
          seed={item}
          />
        )
      })
    )
  }, [seeds])

  // Increase level
  const increaseLevel = () => {
    setLevel(level+1)
  }

  return (
    <div className='screen'>
      <div className='column equipment'>
        <h3>Equipment</h3>
        <div className='equipment-slots'>
          <EquipmentSlot/>
          <EquipmentSlot/>
          <EquipmentSlot/>
        </div>
      </div>
      <LogContext.Provider value={{log, setLog}}>
      <div className='column map'>
        <LootContext.Provider value={{loot, setLoot}}>
            <h3>Area Name</h3>
            {grid}
            <div className='player-info'>
              <div><strong>Energy: </strong>{currentEnergy}</div>
              <div><strong>Level: </strong>{level}</div>
            </div>
            <div className='seed-info'>
              <div className='loot-title'>Loot</div>
              <div className='seed-slots'>
                {seedSlots}
              </div>
            </div>
        </LootContext.Provider>
        <button onClick={increaseLevel}>Increase Level</button>
      </div>
      <div className='column log'>
        <h3>Log</h3>
        <LogDisplay/>
      </div>
      </LogContext.Provider>
    </div>
  )
}

export default Screen