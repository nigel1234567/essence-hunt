import React, { useState, useEffect } from 'react'
import EquipmentSlot from './Equipment/EquipmentSlot'
import Grid from './Map/Grid'
import SeedSlot from './Map/SeedSlot'
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
  const [energy, setEnergy] = useState(startingEnergy)
  
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
        gridItems.push('loot')
      } else {
        // Add in empty for remaining rows
        gridItems.push('empty')
      }
      // Shuffle gridItems array
      shuffleArray(gridItems)
    }
    setGridItemsArray(gridItems)

    // Generating starting seeds
    let seedArray = []
    for (let i = 0; i < startingSeed; i++) {
      // Insert seed data here (to create seed generator)
      let seed = {key: i, name: `Seed ${i+1}`}
      seedArray.push(seed)
      }
    setSeeds(seedArray)
  }, [startingSeed, currentLevel])

  useEffect(() => {
    setGrid(<Grid level={level} items={gridItemsArray}/>)
  }, [gridItemsArray])

  // Set SeedSlot components
  useEffect(() => {
    // Seed slots shown in window
    setSeedSlots(seeds.map(item => {
      return (
        <SeedSlot
          key={item.key}
          name={item.name}
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
        <h3>Area Name</h3>
        {grid}
        <div className='player-info'>
          <p><strong>Energy: </strong>{energy}</p>
          <p><strong>Level: </strong>{level}</p>
        </div>
        <div className='seed-info'>
          {seedSlots}
        </div>
        <button onClick={increaseLevel}>Increase Level</button>
      </div>
      <div className='column log'>
        Log
      </div>
    </div>
  )
}

export default Screen