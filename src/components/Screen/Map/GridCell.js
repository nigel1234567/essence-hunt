import React, { useContext } from 'react'
import { EnergyContext } from '../EnergyContext'

const GridCell = (props) => {
  let {currentEnergy, setCurrentEnergy} = useContext(EnergyContext)

  const handleChange = (e) => {
    // Check if sufficient energy and className is closed
    if (currentEnergy > 0 && e.target.className === 'grid-cell closed') {
      // When cell is clicked to dig
      console.log(props.item)
      if (props.item !== 'empty') {
        e.target.innerHTML = props.item.name
        e.target.className='grid-cell loot'
      } else {
        e.target.innerHTML = 'X'
        e.target.className='grid-cell empty'
      }
      setCurrentEnergy(currentEnergy - 1)
    }

  }

  return (
    <button onClick={handleChange} className='grid-cell closed'>Cell</button>
  )
}

export default GridCell