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

  // Function to get random int
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

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
    // Magic eye
    else if (props.item.name === 'Magic Eye') {
      // Get 10% of total number of cells
      let scanArray = []
      let cellsToScan = Math.ceil(0.2 * player.grid.length)
      // Get positions of loot in grid
      let lootPositionArray = []
      let emptyPositionArray = []
      for (let i=0; i < player.grid.length; i++) {
        if (player.grid[i] !== 'empty') {
          lootPositionArray.push(i)
        } else {
          emptyPositionArray.push(i)
        }
      }
      // Choose a random position for loot and push into scanArray
      let chosenPosition = getRandomInt(lootPositionArray.length)
      scanArray.push(lootPositionArray[chosenPosition])
      cellsToScan -= 1
      // Choose empty cells for remaining cells to scan
      let memoryArray = []
      let chosenEmpty
      // Recursive function for updating empty cells into scanArray
      const updateEmpty = () => {
        // Choose random int
          chosenEmpty = getRandomInt(emptyPositionArray.length)
          if (memoryArray.includes(emptyPositionArray[chosenEmpty]) === false) {
            scanArray.push(emptyPositionArray[chosenEmpty])
            memoryArray.push(emptyPositionArray[chosenEmpty])
          } else {
            updateEmpty()
          }
      }
      // Populate empty cells into scanArray
      for (let i=0; i < cellsToScan; i++) {
        updateEmpty()
      }
      console.log(scanArray)
      // Update player scannedGrid
      updatedPlayer.scannedGrid = scanArray
      // Update log
      updatedLog.push(`Scanned ${scanArray.length} cells.`)
      for (let i=0; i < scanArray.length; i++) {
        updatedLog.push(`Scanned position ${scanArray[i]}.`)
      }
      // Remove equipment and update with new object
      updatedEquipment[props.position] = placeholder
      updatedPlayer.equipment = updatedEquipment
    }
    // Magic Dust
    else if (props.item.name === 'Magic Seed Dust') {

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