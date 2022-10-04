import React, { useContext, useEffect, useState } from 'react'
import { PlayerContext } from '../../Contexts/PlayerContext'
import { upgradeList } from './ShopItems'

const ShopSlot = (props) => {
  const {player, setPlayer} = useContext(PlayerContext)
  const [categoryLevel, setCategoryLevel] = useState(2)
  const [slot, setSlot] = useState(
    <div className='shop-slot'>
    <img src={props.item.image} alt={props.item.name}></img>
      {props.item.name}
      {props.item.price}
    </div>
  )

  // Updated values
  let updatedPlayer = {...player}
  let updatedLog = [...player.log]

  // Check category and set level
  useEffect(() => {
    if (props.item.name === 'Inventory') {
      setCategoryLevel(player.inventoryLevel + 1)
    }
    else if (props.item.name === 'Garden') {
      setCategoryLevel(player.gardenLevel + 1)
    }
    else if (props.item.name === 'Energy') {
      setCategoryLevel(player.startingEnergy - 3)
    }
  }, [props, player])

  // Buy / Upgrades functions
  // Upgrade
  const upgrade = () => {
    // Check first if player has enough essence
    if (player.essence >= props.item.prices[categoryLevel-2]) {
      // Check which category player wants to upgrade
      // Inventory
      if (props.item.name === 'Inventory') {
        // Upgrade inventory
        updatedPlayer.inventoryLevel += 1
        // Update log
        updatedLog.push(`Upgraded Inventory to Level ${updatedPlayer.inventoryLevel}`)
        updatedPlayer.log = updatedLog
      }
      // Garden
      else if (props.item.name === 'Garden') {
        // Upgrade garden
        updatedPlayer.gardenLevel += 1
        // Update log
        updatedLog.push(`Upgraded Garden to Level ${updatedPlayer.gardenLevel}`)
        updatedPlayer.log = updatedLog
      }
      // Energy
      else if (props.item.name === 'Energy') {
        // Upgrade energy
        updatedPlayer.startingEnergy += 1
        // Update log
        updatedLog.push(`Upgraded Energy Level. You now have ${updatedPlayer.startingEnergy} starting energy.`)
        updatedPlayer.log = updatedLog
      }
      // Update essence
      updatedPlayer.essence -= props.item.prices[categoryLevel-2]
      // Set Player
      setPlayer(updatedPlayer)
    } else {
      alert('You do not have enough essence!')
    }
  }

  // Set display of slot depending on type of shop item
  useEffect(() => {
    if (props.type === 'equipment') {
      setSlot(
        <div className='shop-slot'>
          <img src={props.item.image} alt={props.item.name} className='shop-image'></img>
          <div className='shop-item-details'>
            <span><strong>Name: </strong>{props.item.name}</span>
            <span><strong>Price: </strong>{props.item.price}</span>
            <span><strong>Description: </strong>{props.item.description}</span>
          </div>
        <div className='shop-buttons'>
          <button className='shop-button buy'>Buy</button>
          <button className='shop-button sell'>Sell</button>
        </div>
      </div>
      )
    } else {
      // If max level
      if (categoryLevel <= props.item.maxLevel) {
        setSlot(
          <div className='shop-slot'>
            <span><strong>{props.item.name}</strong></span>
            <div className='shop-item-details'>
            <span><strong>Level: </strong>{categoryLevel}</span>
              <span><strong>Price: </strong>{props.item.prices[categoryLevel-2]}</span>
            </div>
            <div className='shop-buttons'>
              <button className='shop-button buy' onClick={upgrade}>Upgrade</button>
            </div>
          </div>
          )
      } else {
        setSlot(
          <div className='shop-slot'>
            <span><strong>{props.item.name}</strong></span>
            <div className='shop-item-details'>
            <span><strong>Level: </strong>MAX</span>
              <span><strong>Price: </strong>MAX</span>
            </div>
            <div className='shop-buttons'>
              <button className='shop-button max'>MAX</button>
            </div>
          </div>
          )
      }

    }
  }, [player, categoryLevel, props])

  return (
    <>
      {slot}
    </>
  )
}

export default ShopSlot