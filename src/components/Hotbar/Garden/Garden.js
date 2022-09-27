import React, { useState, useContext, useEffect } from 'react'
import { PlayerContext } from '../../Contexts/PlayerContext'
import GardenSlot from './GardenSlot'

const Garden = () => {
  const {player, setPlayer} = useContext(PlayerContext)
  const [garden, setGarden] = useState(player.garden)
  const [gardenLevel, setGardenLevel] = useState(player.gardenLevel)
  const [gardenGrid, setGardenGrid] = useState()
  const [inventory, setInventory] = useState(player.inventory)

    // Show player
    const showPlayer = () => {
      console.log(player)
    }

  // Update garden and inventory once player object is updated
  useEffect(() => {
    setGarden(player.garden)
    setInventory(player.inventory)
    setGardenLevel(player.gardenLevel)
  }, [player])

  // Set gardenGrid
  useEffect(() => {
    // Array to be pushed to gardenGrid
    let gardenGridArray = []
    // Position to reference garden array
    let gardenPosition = 0
    const rowCells = 5
    for (let i=0; i < gardenLevel; i++) {
      for (let j=0; j < rowCells; j++) {
        if (garden[gardenPosition] !== null) {
          // Push slot with item as props
          gardenGridArray.push(<GardenSlot key={gardenPosition} item={garden[gardenPosition]} position={gardenPosition}/>)
        } else {
          // Push empty slot
          gardenGridArray.push(<GardenSlot key={gardenPosition} item={null}/>)
        }
        gardenPosition += 1
      }
    }
    setGardenGrid(gardenGridArray)
  }, [garden])

  return (
    <div className='garden-main'>
      <button onClick={showPlayer}>Player</button>
      <h3>Garden</h3>
      <div>Click on a slot to plant / harvest a fruit!</div>
      <div className='garden-grid'>
        {gardenGrid}
      </div>
    </div>
  )
}

export default Garden