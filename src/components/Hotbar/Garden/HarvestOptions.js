import React, { useContext, useEffect, useState } from 'react'
import { SeedContext } from '../../Contexts/SeedContext'
import { PlayerContext } from '../../Contexts/PlayerContext'

const HarvestOptions = (props) => {
  const {player, setPlayer} = useContext(PlayerContext)
  const {seedPriceList, setSeedPriceList} = useContext(SeedContext)
  const [seedPrice, setSeedPrice] = useState(0)
  const [daysLeft, setDaysLeft] = useState()
  const [seedImage, setSeedImage] = useState(    
  <div className='garden-slot item'>
    <img src={props.seed.image} alt={props.seed.name}></img>
  </div>
)

  // Updated values of player
  let updatedGarden = [...player.garden]
  let updatedPlayer = {...player}
  let updatedLog = [...player.log]

  // Update days left
  useEffect(() => {
    // Set daysLeft
    if (props.seed.matureDay > player.day) {
      setDaysLeft(props.seed.matureDay - player.day)
    } else {
      setDaysLeft(0)
    }
  }, [props])

  // Set seed price
  useEffect(() => {
    // Find seed name from seed list
    for (let i=0; i < seedPriceList.length; i++) {
      if (seedPriceList[i].name === props.seed.name) {
        setSeedPrice(seedPriceList[i].price)
      }
    }
  }, [seedPriceList, props])

  // Harvest button
  const harvest = () => {
    if (daysLeft > 0) {
      alert('The fruit plant is not matured yet!')
    } else {
      if (window.confirm(`Are you sure you want to harvest ${props.seed.name}?`)) {
        // Add essence
        updatedPlayer.essence += seedPrice
        // Remove seed from garden
        updatedGarden.splice(props.position, 1)
        // Update player garden
        updatedPlayer.garden = updatedGarden
        // Update player log
        updatedLog.push(`Harvested ${props.seed.name} for ${seedPrice} essence!`)
        updatedPlayer.log = updatedLog
        // Set updated player
        setPlayer(updatedPlayer)
        // Inform player
        alert(`Successfully harvested ${props.seed.name} for ${seedPrice} essence!`)
        props.setTrigger(null)
      }
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
      // Update player log
      updatedLog.push(`Destroyed ${props.seed.name}!`)
      updatedPlayer.log = updatedLog
      // Set updated player
      setPlayer(updatedPlayer)
      // Inform player
      alert(`You destroyed ${props.seed.name}!`)
      props.setTrigger(null)
    }
  }

  // Update image slot
  useEffect(() => {
    if (daysLeft === 0) {
      setSeedImage(
      <div className='garden-slot item mature'>
        <img src={props.seed.image} alt={props.seed.name}></img>
      </div>
      )
    } else {
      setSeedImage(
        <div className='garden-slot item'>
          <img src={props.seed.image} alt={props.seed.name}></img>
        </div>
        )
    }
  },[daysLeft])

  return (
    <div className='harvest-options'>
    <h3>Harvest Fruit</h3>
    {seedImage}
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