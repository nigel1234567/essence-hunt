import React, {useEffect, useState, useContext} from 'react'
import { PlayerContext } from '../../Contexts/PlayerContext'

const InventorySlot = (props) => {
  const [slot, setSlot] = useState(<button className='inventory-slot'></button>)
  
  // Player data
  const {player, setPlayer} = useContext(PlayerContext)
  const [log, setLog] = useState(player.log)
  const [inventory, setInventory] = useState(player.inventory)

  let updatedPlayer = {...player}
  let updatedLog = [...log]
  let updatedInventory = [...inventory]

  useEffect(() => {
    setLog(player.log)
    setInventory(player.inventory)
  }, [player])

  const discardItem = () => {
    // Remove item from inventory
    updatedInventory.splice(props.position, 1)
    
    // Push new loot into inventory
    updatedInventory.push(props.loot)
    updatedPlayer.inventory = updatedInventory

    // Update log after replacing item
    updatedLog.push(`Discarded ${props.item.name} for ${props.loot.name}.`)
    updatedPlayer.log = updatedLog

    // Set updated player
    setPlayer(updatedPlayer)

    // Close popup
    props.setTrigger(false)
  }

  useEffect(() => {
    if (props.item !== undefined) {
      setSlot(
        <button className='inventory-slot item' onClick={discardItem}>
          <img src={props.item.image} alt={props.item.name}></img>
          <div className='tooltip'>
            <span className='item-name'><strong>{props.item.name}</strong></span>
            <strong className={props.item.rarity}>{props.item.rarity}</strong>
            <span><strong>Type: </strong>{props.item.type}</span>
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

export default InventorySlot