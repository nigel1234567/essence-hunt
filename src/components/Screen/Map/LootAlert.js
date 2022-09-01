import React, {useEffect, useState, useContext} from 'react'
import { PlayerContext } from '../../Contexts/PlayerContext'
import InventorySlotDiscard from '../../Hotbar/Inventory/InventorySlotDiscard'

const LootAlert = (props) => {
  const {player, setPlayer} = useContext(PlayerContext)
  const [inventoryLevel, setInventoryLevel] = useState(player.inventoryLevel)
  const [inventory, setInventory] = useState(player.inventory)
  const [inventoryGrid, setInventoryGrid] = useState()

  // Refresh
  useEffect(() => {
    setInventory(player.inventory)
    setInventoryLevel(player.inventoryLevel)
  }, [player])

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
          inventoryGridArray.push(<InventorySlotDiscard key={inventoryPosition}
            loot={props.loot} 
            item={inventory[inventoryPosition]} 
            position={inventoryPosition} 
            setTrigger={props.setTrigger}/>)
        } else {
          // Push empty slot
          inventoryGridArray.push(<InventorySlotDiscard key={inventoryPosition} item={null}/>)
        }
        inventoryPosition += 1
      }
    }
    setInventoryGrid(inventoryGridArray)
  }, [inventoryLevel])

  if (props.trigger === true) {
    return (
      <div className='popup'>
        <div className='popup-inner'>
          <button className='close-btn' onClick={() => props.setTrigger(false)}>X</button>
          <div className='discard-window'>
            <h2>Your Inventory is Full!</h2>
            <span>You have no more space in your inventory to keep the {props.loot.name}! Please choose an item from your inventory to discard or close this window to cancel.</span>
            <div className="inventory-main">
              <div className="inventory-grid">{inventoryGrid}</div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      ''
    )
  }

}

export default LootAlert