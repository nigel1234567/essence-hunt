import React, { useState, useEffect } from 'react'
import EquipmentSlot from './Equipment/EquipmentSlot'
import Grid from './Map/Grid'
import SeedSlot from './Map/SeedSlot'
import './styles/Screen.css'

const Screen = () => {
  // Equipment

  // Map info
  const [level, setLevel] = useState(1)
  const [startingSeed, setStartingSeed] = useState(level + 2)
  const [seeds, setSeeds] = useState([])
  const [seedsRemaining, setSeedsRemaining] = useState()

  // Player info
  const [startingEnergy, setStartingEnergy] = useState(5)
  const [energy, setEnergy] = useState(startingEnergy)
  
  // Log window

  // Functions
  // Generating starting seeds
  for (let i = 0; i < startingSeed; i++) {
    let seed = {key: i, name: `Seed ${i}`}
    seeds.push(seed)
  }

  // Seed slots shown in window
  const seedSlots = seeds.map(item => {
    console.log(item.key)
      return (
        <SeedSlot
          key={item.key}
          name={item.name}
          />
      )
  })

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
        <Grid level={level}/>
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