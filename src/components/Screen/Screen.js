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

  let grid = <Grid level={level}/>

  // Player info
  const [startingEnergy, setStartingEnergy] = useState(5)
  const [energy, setEnergy] = useState(startingEnergy)
  
  // Log window

  // Functions

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

  // Set seedArray and seeds
  useEffect(() => {
    let seedArray = []

    // Generating starting seeds
    for (let i = 0; i < startingSeed; i++) {
      // Insert seed data here (to create seed generator)
      let seed = {key: i, name: `Seed ${i+1}`}
      seedArray.push(seed)
      }

    setSeeds(seedArray)
  }, [startingSeed])

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