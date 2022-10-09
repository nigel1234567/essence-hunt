import React, { useContext, useEffect, useState } from 'react'
import { SeedContext } from '../../Contexts/SeedContext'
import { PlayerContext } from '../../Contexts/PlayerContext'

const HarvestOptions = (props) => {
  const {player, setPlayer} = useContext(PlayerContext)
  const {seedPriceList, setSeedPriceList} = useContext(SeedContext)
  const [seedPrice, setSeedPrice] = useState(0)
  const [daysLeft, setDaysLeft] = useState()
  const [confirmation, setConfirmation] = useState(null)
  const [confirmationPopup, setConfirmationPopup] = useState(<></>)
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
      // Setup harvest confirmation
      setConfirmation('harvest')
    }
  }

  // Destroy button
  const destroy = () => {
    // Setup destroy confirmation
    setConfirmation('destroy')
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

  // Popup to confirm harvest / destroy
  useEffect(() => {
    // If harvest
    if (confirmation === 'harvest') {
      setConfirmationPopup(
      <div className='confirm harvest'>
        <h3>Are you sure you want to harvest {props.seed.name}?</h3>
        <div className='confirm-buttons'>
          <button onClick={confirmHarvest} className='yes'>Yes</button>
          <button onClick={cancelButton} className='no'>No</button>
        </div>
      </div>
      )
    }
    // If destroy
    else if (confirmation === 'destroy') {
      setConfirmationPopup(
        <div className='confirm destroy'>
          <h3>Are you sure you want to destroy {props.seed.name}?</h3>
          <div className='confirm-buttons'>
            <button onClick={confirmDestroy} className='yes'>Yes</button>
            <button onClick={cancelButton} className='no'>No</button>
          </div>
        </div>
        )
    }
    // Default null state
    else {
      setConfirmationPopup(<></>)
    }
  }, [confirmation])

  // Button functions

  // Confirm harvest
  const confirmHarvest = () => {
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
    props.setTrigger(null)
  }

  // Confirm destroy
  const confirmDestroy = () => {
    // Remove seed from garden
    updatedGarden.splice(props.position, 1)
    // Update player garden
    updatedPlayer.garden = updatedGarden
    // Update player log
    updatedLog.push(`Destroyed ${props.seed.name}!`)
    updatedPlayer.log = updatedLog
    // Set updated player
    setPlayer(updatedPlayer)
    props.setTrigger(null)
  }

  // Cancel button
  const cancelButton = () => {
    setConfirmation(null)
  }



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
    {confirmationPopup}
  </div>
  )

}

export default HarvestOptions