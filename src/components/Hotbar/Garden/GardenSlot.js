import React, {useContext, useEffect, useState} from 'react'
import PopupOptions from './PopupOptions'
import { PlayerContext } from '../../Contexts/PlayerContext'

const GardenSlot = (props) => {
  const [popup, setPopup] = useState(null)
  const {player, setPlayer} = useContext(PlayerContext)

  const gardenOptions = () => {
    // For slots containing seed, open HarvestOptions
    if (props.item !== undefined) {
      setPopup('harvest')
    } 
    // For slots that are empty, open PlantOptions
    else {
      setPopup('plant')
    }
  }

  const [slot, setSlot] = useState(<button className='garden-slot' onClick={gardenOptions}></button>)
  let daysLeft
  let status
  
  // Update daysLeft and status
  useEffect(() => {
    console.log(props.item)
    if (props.item !== undefined && props.item.matureDay > player.day) {
      daysLeft = props.item.matureDay - player.day
      status = 'Growing'
    } else {
      daysLeft = 0
      status = 'Fully Grown'
    }
    
  }, [player.garden])


  useEffect(() => {
    // If slot has seed
    if (props.item !== undefined) {
      setSlot(
        <button className='garden-slot item' onClick={gardenOptions}>
          <img src={props.item.image} alt={props.item.name}></img>
          <div className='tooltip'>
            <span className='item-name'><strong>{props.item.name}</strong></span>
            <strong className={props.item.rarity}>{props.item.rarity}</strong>
            <span><strong>Type: </strong>{props.item.type}</span>
            <span><strong>Days Left: </strong>{daysLeft}</span>
            <span><strong>Status: </strong>{status}</span>
          </div>
        </button>
      )
    } else {
      setSlot(<button className='garden-slot' onClick={gardenOptions}></button>)
    }
  }, [props])


  return (
    <>
      {slot}
      <PopupOptions seed={props.item} trigger={popup} position={props.position} setTrigger={setPopup}></PopupOptions>
    </>
  )
}

export default GardenSlot