import React, {useContext, useState, useEffect} from 'react'
import { PlayerContext } from '../../Contexts/PlayerContext'
import InventorySlotDust from './InventorySlotDust'

const DustOptions = (props) => {
  const {player, setPlayer} = useContext(PlayerContext)
  const [inventory, setInventory] = useState(player.inventory)
  const [inventoryGrid, setInventoryGrid] = useState()

  useEffect(() => {
    setInventory(player.inventory)
  }, [player])

  useEffect(() => {
    // Array to be pushed to inventoryGrid
    let inventoryGridArray = []
    // Position to reference inventory array
    let inventoryPosition = 0
    const rowCells = 5
    for (let i=0; i < player.inventoryLevel; i++) {
      for (let j=0; j < rowCells; j++) {
        if (inventory[inventoryPosition] !== null) {
          // Push slot with item as props
          inventoryGridArray.push(<InventorySlotDust key={inventoryPosition} item={inventory[inventoryPosition]} position={inventoryPosition} setTrigger = {props.setTrigger}/>)
        } else {
          // Push empty slot
          inventoryGridArray.push(<InventorySlotDust key={inventoryPosition} item={null}/>)
        }
        inventoryPosition += 1
      }
    }
    setInventoryGrid(inventoryGridArray)
  }, [inventory])

  return (
    <div className='plant-options'>
      <h3>Dust Seed</h3>
      Choose a seed from your inventory to dust.
      <div className='plant-grid'>
        {inventoryGrid}
      </div>
    </div>
  )
}

export default DustOptions