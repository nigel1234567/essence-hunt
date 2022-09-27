import React, { useContext, useEffect, useState } from 'react'
import { SeedContext } from '../../Contexts/SeedContext'
import { PlayerContext } from '../../Contexts/PlayerContext'

const HarvestOptions = (props) => {
  const {player, setPlayer} = useContext(PlayerContext)
  const {seedPriceList, setSeedPriceList} = useContext(SeedContext)
  const [seedPrice, setSeedPrice] = useState(0)
  let daysLeft
  
  // Set daysLeft
  if (props.seed.matureDay > player.day) {
    daysLeft = props.seed.matureDay - player.day
  } else {
    daysLeft = 0
  }

  // Set seed price
  useEffect(() => {
    // Find seed name from seed list
    for (let i=0; i < seedPriceList.length; i++) {
      if (seedPriceList[i].name === props.seed.name) {
        setSeedPrice(seedPriceList[i].price)
      }
    }
  }, [seedPriceList])


  return (
    <div className='harvest-options'>
      <h3>Harvest Seed</h3>
      <div className='garden-slot item'>
        <img src={props.seed.image} alt={props.seed.name}></img>
      </div>
      Would you like to harvest or destroy {props.seed.name}?
      <div className='harvest-details'>
        <span>Days Left: {daysLeft}</span>
        <span>Essence from Harvest: {seedPrice}</span>
      </div>
      <div className='harvest-options-btns'>
        <button className='harvest-btn'>Harvest</button>
        <button className='destroy-btn'>Destroy</button>
      </div>
    </div>
  )
}

export default HarvestOptions