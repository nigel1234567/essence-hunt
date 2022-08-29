import React, { useContext, useState } from 'react'
import { EnergyContext } from '../../Contexts/PlayerContext'
import { LootContext } from '../../Contexts/LootContext'
import { InventoryContext } from '../../Contexts/PlayerContext'

const GridCell = (props) => {
  let {currentEnergy, setCurrentEnergy} = useContext(EnergyContext)
  let {loot, setLoot} = useContext(LootContext)
  let {inventory, setInventory} = useContext(InventoryContext)
  const [preview, setPreview] = useState()

  const handleChange = (e) => {
    // Check if sufficient energy and className is closed
    if (currentEnergy > 0 && e.target.className === 'grid-cell closed') {
      // When cell is clicked to dig
      console.log(props.item)
      let updatedLoot = [...loot]
      let updatedInventory = [...inventory]
      if (props.item !== 'empty') {
        // If cell contains loot
        setPreview(<img src={props.item.image} alt={props.item.name} className='seed-image-mini'></img>)
        e.target.className='grid-cell loot'
        updatedLoot.push(props.position)
        setLoot(updatedLoot)
        // Update inventory
        updatedInventory.push(props.item)
        setInventory(updatedInventory)
      } else {
        e.target.innerHTML = 'X'
        e.target.className='grid-cell empty'
      }
      setCurrentEnergy(currentEnergy - 1)
    }
    console.log(loot)

  }

  return (
    <button onClick={handleChange} className='grid-cell closed'>{preview}</button>
  )
}

export default GridCell