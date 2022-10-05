import React, { useContext, useState, useEffect } from 'react'
import { PlayerContext } from '../../Contexts/PlayerContext'
import { LootContext } from '../../Contexts/LootContext'
import LootAlert from './LootAlert'

const GridCell = (props) => {
  let {loot, setLoot} = useContext(LootContext)
  let {player, setPlayer} = useContext(PlayerContext)
  const [inventoryFull, setInventoryFull] = useState(player.inventoryFull)
  const [log, setLog] = useState(player.log)
  const [inventory, setInventory] = useState(player.inventory)
  const [preview, setPreview] = useState()
  const [alert, setAlert] = useState(false)
  const [gridClass, setGridClass] = useState('grid-cell closed')
  let currentEnergy = player.currentEnergy

  // Refresh player object when player updates
  useEffect(() => {
    setLog(player.log)
    setInventory(player.inventory)
    setInventoryFull(player.inventoryFull)

    // For cells that are scanned
    if (player.scannedGrid.includes(props.position)) {
      setGridClass('grid-cell scanned')
    }
  }, [player])

  const handleChange = (e) => {
    // Check if sufficient energy and className is closed
    if (currentEnergy > 0 && e.target.className === 'grid-cell closed' || currentEnergy > 0 && e.target.className === 'grid-cell scanned' ) {
      // When cell is clicked to dig
      let updatedLoot = [...loot]
      let updatedInventory = [...inventory]
      let updatedLog = [...log]
      let updatedPlayer = {...player}
      if (props.item !== 'empty') {
        // If cell contains loot
        setPreview(<img src={props.item.image} alt={props.item.name} className='seed-image-mini'></img>)
        e.target.className='grid-cell loot'
        updatedLoot.push(props.position)
        setLoot(updatedLoot)
        // Check if inventory is full
        if (inventoryFull !== true) {
          // Update inventory
          updatedInventory.push(props.item)
          updatedPlayer.inventory = updatedInventory
          // Update log
          updatedLog.push(`You found x1 ${props.item.rarity} loot: ${props.item.name}! You have ${currentEnergy-1} energy left.`)
        } else {
          updatedLog.push(`You found x1 ${props.item.rarity} loot: ${props.item.name}! You have ${currentEnergy-1} energy left.`)
          setAlert(true)
        }
      } else {
        e.target.innerHTML = 'X'
        e.target.className='grid-cell empty'
        // Update log
        updatedLog.push(`You found nothing. You have ${currentEnergy-1} energy left.`)
      }
      currentEnergy -= 1
      updatedPlayer.currentEnergy = currentEnergy
      updatedPlayer.log = updatedLog
      updatedPlayer.newDay = false
      // Update Player Object
      setPlayer(updatedPlayer)
    }

  }

  return (
    <>
      <button onClick={handleChange} className={gridClass}>{preview}</button>
      <LootAlert trigger={alert} setTrigger={setAlert} loot={props.item}/>
    </>
  )
}

export default GridCell