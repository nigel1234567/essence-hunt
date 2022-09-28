import React, {useContext, useEffect, useState} from 'react'
import { PlayerContext } from '../../Contexts/PlayerContext'

const InventorySlotPlant = (props) => {
  const [slot, setSlot] = useState(<button className='inventory-slot plant'></button>)
  const {player, setPlayer} = useContext(PlayerContext)
  
  const plant = () => {
    // Variables to be updated
    let updatedGarden = [...player.garden]
    let updatedInventory = [...player.inventory]
    let updatedPlayer = {...player}
    // Add maturity day to seed object
    props.item.matureDay = player.day + props.item.days
    // Push updated seed into updatedGarden array
    updatedGarden.push(props.item)
    // Remove seed from inventory
    updatedInventory.splice(props.position, 1)
    // Update updatedPlayer's garden and inventory
    updatedPlayer.garden = updatedGarden
    updatedPlayer.inventory = updatedInventory
    // Update player context
    setPlayer(updatedPlayer)
    // Close window
    props.setTrigger(null)
  }

  useEffect(() => {
    if (props.item !== undefined) {
      setSlot(
        <button className='inventory-slot plant item' onClick={plant}>
          <img src={props.item.image} alt={props.item.name}></img>
          <div className='tooltip'>
            <span className='item-name'><strong>{props.item.name}</strong></span>
            <strong className={props.item.rarity}>{props.item.rarity}</strong>
            <span><strong>Type: </strong>{props.item.type}</span>
            <span><strong>Days to grow: </strong>{props.item.days}</span>
          </div>
        </button>
      )
    }
  },[props])


  return (
    <>
      {slot}
    </>
  )
}

export default InventorySlotPlant