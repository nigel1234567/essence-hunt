import React, { useContext, useEffect, useState } from 'react'
import { SeedContext } from '../../Contexts/SeedContext'
import { PlayerContext } from '../../Contexts/PlayerContext'

const HarvestOptions = (props) => {
  const {player, setPlayer} = useContext(PlayerContext)
  const {seedPriceList, setSeedPriceList} = useContext(SeedContext)
  const [seedPrice, setSeedPrice] = useState(0)
  let daysLeft
  // Updated values of player
  let updatedGarden = [...player.garden]
  let updatedPlayer = {...player}
  
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

  // Harvest button
  const harvest = () => {
    if (daysLeft > 0) {
      alert('The fruit plant is not matured yet!')
    } else {

    }
  }

  // Destroy button
  const destroy = () => {
    let destroyText = `Are you sure you want to destroy ${props.seed.name}?`
    if (window.confirm(destroyText)) {
      // Remove seed from garden
      updatedGarden.splice(props.position, 1)
      // Update player garden
      updatedPlayer.garden = updatedGarden
      // Set updated player
      setPlayer(updatedPlayer)
      // Inform player
      alert(`You destroyed ${props.seed.name}!`)
      props.setTrigger(null)
      console.log(player)
    }
  }

  return (
    <div className='harvest-options'>
      <h3>Harvest Fruit</h3>
      <div className='garden-slot item'>
        <img src={props.seed.image} alt={props.seed.name}></img>
      </div>
      Would you like to harvest or destroy {props.seed.name} Plant?
      <div className='harvest-details'>
        <span>Days Left to Mature: </span>
        <span>{daysLeft}</span>
        <span>Essence from Harvest: </span>
        <span>{seedPrice}</span>
      </div>
      <div className='harvest-options-btns'>
        <button className='harvest-btn' onClick={harvest}>Harvest</button>
        <button className='destroy-btn' onClick={destroy}>Destroy</button>
      </div>
    </div>
  )
}

export default HarvestOptions