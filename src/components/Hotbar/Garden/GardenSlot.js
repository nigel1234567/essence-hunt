import React, {useContext, useEffect, useState} from 'react'
import PlantOptions from './PlantOptions'
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
  

  useEffect(() => {
    // If slot has seed
    if (props.item !== undefined) {
      console.log(props.item)
      setSlot(
        <button className='garden-slot item' onClick={gardenOptions}>
          <img src={props.item.image} alt={props.item.name}></img>
          <div className='tooltip'>
            <span className='item-name'><strong>{props.item.name}</strong></span>
            <strong className={props.item.rarity}>{props.item.rarity}</strong>
            <span><strong>Type: </strong>{props.item.type}</span>
            <span><strong>Days Left: </strong>{props.item.matureDay - player.day}</span>
          </div>
        </button>
      )
    }
  },[props])


  return (
    <>
      {slot}
      <PopupOptions seed={props.item} trigger={popup} setTrigger={setPopup}></PopupOptions>
    </>
  )
}

export default GardenSlot