import React, { useContext, useEffect, useState } from 'react'
import { PlayerContext } from '../../Contexts/PlayerContext'
import cross from '../../../images/cross.png'

const EquipmentSlot = (props) => {
  const {player, setPlayer} = useContext(PlayerContext)
  const [slot, setSlot] = useState()

  let updatedPlayer = {...player}
  let updatedEquipment = [...player.equipment]
  let updatedLog = [...player.log]

  // Placeholder equipment
  const placeholder = {name:'Used Slot', image: cross}

  // Use equipment
  const useItem = () => {
    // Energy bar
    if (props.item.name === 'Energy Bar') {
      updatedPlayer.currentEnergy += 1
      // Update log
      updatedLog.push('Consumed energy bar. Gained 1 energy!')
      // Remove equipment and update with new object
      updatedEquipment[props.position] = placeholder
      updatedPlayer.equipment = updatedEquipment
    }
    updatedPlayer.log = updatedLog
    setPlayer(updatedPlayer)
  }

  // Set slot
  useEffect(() => {
    if (props.item !== undefined) {
      setSlot(
      <button className='equipment-slot-item' onClick={useItem}>
        <img src={props.item.image} alt={props.item.name} className='equipment-image'></img>
        <div className='tooltip'>
          {props.item.name}
        </div>

      </button>
      )
    } else {
      setSlot()
    }
  }, [props, player])

  return (
    <div className='equipment-item'>
      {slot}
    </div>
  )
}

export default EquipmentSlot