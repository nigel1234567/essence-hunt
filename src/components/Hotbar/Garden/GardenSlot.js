import React, {useContext, useEffect, useState} from 'react'
import PopupOptions from './PopupOptions'
import { PlayerContext } from '../../Contexts/PlayerContext'

const GardenSlot = (props) => {
  const [popup, setPopup] = useState(null)
  const {player, setPlayer} = useContext(PlayerContext)
  const [log, setLog] = useState(player.log)

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
  const [daysLeft, setDaysLeft] = useState(0)
  const [status, setStatus] = useState('Growing')
  
  // Update daysLeft and status
  useEffect(() => {
    if (props.item !== undefined && props.item.matureDay > player.day) {
      setDaysLeft(props.item.matureDay - player.day)
      setStatus('Growing')
    } else if (props.item !== undefined && props.item.matureDay <= player.day) {
      setDaysLeft(0)
      setStatus('Fully Grown')
    }

  }, [props, player.day])

  useEffect(() => {
    // If slot has seed
    if (props.item !== undefined) {
      // If fully grown
      if (status === 'Fully Grown') {
        setSlot(
          <button className='garden-slot item mature' onClick={gardenOptions}>
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
      }
    } 
    else {
      setSlot(<button className='garden-slot' onClick={gardenOptions}></button>)
    }

  }, [props, daysLeft, status])


  return (
    <>
      {slot}
      <PopupOptions seed={props.item} trigger={popup} position={props.position} setTrigger={setPopup}></PopupOptions>
    </>
  )
}

export default GardenSlot