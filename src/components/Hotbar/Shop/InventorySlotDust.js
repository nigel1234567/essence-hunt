import React, {useContext, useEffect, useState} from 'react'
import { PlayerContext } from '../../Contexts/PlayerContext'
import { SeedContext } from '../../Contexts/SeedContext'
import { seedList } from '../../Screen/Map/Seeds/Seeds'

const InventorySlotDust = (props) => {
  const [slot, setSlot] = useState(<button className='inventory-slot plant'></button>)
  const {player, setPlayer} = useContext(PlayerContext)
  const {seedPriceList, setSeedPriceList} = useContext(SeedContext)

  // Updated player value
  let updatedPlayer = {...player}
  let updatedInventory = [...player.inventory]
  let updatedLog = [...player.log]

    // Function to get random int
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
  
  const dust = () => {
    // Randomly choose a seed
    let dustOption = getRandomInt(seedList.length)
    let chosenSeed = seedList[dustOption]
    // Update inventory
    updatedInventory[props.position] = chosenSeed
    // Update log
    updatedLog.push(`Successfully transformed ${props.item.name} to ${chosenSeed.name}!`)
    // Inform player
    alert(`Successfully transformed ${props.item.name} to ${chosenSeed.name}!`)
    props.setTrigger(null)
    // Update player object
    updatedPlayer.inventory = updatedInventory
    updatedPlayer.log = updatedLog
    setPlayer(updatedPlayer)
  }

  useEffect(() => {
    if (props.item !== undefined) {
      setSlot(
        <button className='inventory-slot plant item' onClick={dust}>
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

export default InventorySlotDust