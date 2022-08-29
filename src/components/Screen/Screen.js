import React, { useState, useEffect } from 'react'
import EquipmentSlot from './Equipment/EquipmentSlot'
import Grid from './Map/Grid'
import SeedSlot from './Map/SeedSlot'
import { seedGenerator } from './Map/Seeds/Seeds'
import { EnergyContext } from '../Contexts/PlayerContext'
import { LootContext } from '../Contexts/LootContext'
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
  const [startingEnergy, setStartingEnergy] = useState(5)
  const [currentEnergy, setCurrentEnergy] = useState(startingEnergy)
  const [loot, setLoot] = useState([])
  
  // Log window

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

  let gridItems = []

  // Use Effect hooks

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

  }, [startingSeed, currentLevel])

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

    setGrid(<Grid level={level} items={gridItemsArray}/>)
  }, [gridItemsArray])

  // Set SeedSlot components
  useEffect(() => {
    // Record positions of seeds
    let lootSeedsArray = []
    for (let pos in gridItemsArray) {
      if (gridItemsArray[pos] !== 'empty') {
        let lootSeed = { key: pos,  name: gridItemsArray[pos].name, image: gridItemsArray[pos].image}
        console.log(lootSeed)
        lootSeedsArray.push(lootSeed)
      }
    }
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
      <div className='column map'>
        <EnergyContext.Provider value={{currentEnergy, setCurrentEnergy}}>
          <LootContext.Provider value={{loot, setLoot}}>
            <h3>Area Name</h3>
            {grid}
            <div className='player-info'>
                <p><strong>Energy: </strong>{currentEnergy}</p>
              <p><strong>Level: </strong>{level}</p>
            </div>
            <div className='seed-info'>
              {seedSlots}
            </div>
          </LootContext.Provider>
          <button onClick={increaseLevel}>Increase Level</button>
        </EnergyContext.Provider>
      </div>
      <div className='column log'>
        Log
      </div>
    </div>
  )
}

export default Screen