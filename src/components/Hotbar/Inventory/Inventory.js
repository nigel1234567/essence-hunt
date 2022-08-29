import React, {useEffect, useState, useContext} from 'react'
import InventorySlot from './InventorySlot'
import { InventoryContext } from '../../Contexts/PlayerContext'

const Inventory = () => {
  const [inventoryLevel, setInventoryLevel] = useState(1)
  const [inventoryGrid, setInventoryGrid] = useState()
  const {inventory, setInventory} = useContext(InventoryContext)

  useEffect(() => {
    // Array to be pushed to inventoryGrid
    let inventoryGridArray = []
    // Position to reference inventory array
    let inventoryPosition = 0
    const rowCells = 5
    for (let i=0; i < inventoryLevel; i++) {
      for (let j=0; j < rowCells; j++) {
        if (inventory[inventoryPosition] !== null) {
          // Push slot with item as props
          inventoryGridArray.push(<InventorySlot key={inventoryPosition} item={inventory[inventoryPosition]}/>)
        } else {
          // Push empty slot
          inventoryGridArray.push(<InventorySlot key={inventoryPosition} item={null}/>)
        }
        inventoryPosition += 1
      }
    }
    setInventoryGrid(inventoryGridArray)
  }, [inventoryLevel])

  return (
    <div className='inventory-main'>
      <h3>Inventory (Level {inventoryLevel})</h3>
      <div className='inventory-grid'>
        {inventoryGrid}
      </div>
    </div>

  )
}

export default Inventory