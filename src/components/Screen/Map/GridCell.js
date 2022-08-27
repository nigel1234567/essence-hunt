import React, { useContext } from 'react'
import { EnergyContext } from '../EnergyContext'
import { LootContext } from '../LootContext'

const GridCell = (props) => {
  let {currentEnergy, setCurrentEnergy} = useContext(EnergyContext)
  let {loot, setLoot} = useContext(LootContext)

  const handleChange = (e) => {
    // Check if sufficient energy and className is closed
    if (currentEnergy > 0 && e.target.className === 'grid-cell closed') {
      // When cell is clicked to dig
      console.log(props.item)
      let updatedLoot = [...loot]
      if (props.item !== 'empty') {
        e.target.innerHTML = props.item.name
        e.target.className='grid-cell loot'
        updatedLoot.push(props.position)
        setLoot(updatedLoot)
      } else {
        e.target.innerHTML = 'X'
        e.target.className='grid-cell empty'
      }
      setCurrentEnergy(currentEnergy - 1)
    }
    console.log(loot)

  }

  return (
    <button onClick={handleChange} className='grid-cell closed'>Cell</button>
  )
}

export default GridCell