import React, { useState } from 'react'
import EquipmentSlot from './Equipment/EquipmentSlot'
import Grid from './Map/Grid'
import './styles/Screen.css'

const Screen = () => {
  // Equipment
  
  // Map grid

  // Map info
  
  // Log window

  return (
    <div className='screen'>
      <div className='column equipment'>
        <h3>Equipment</h3>
        <div className='equipment-slots'>
          <EquipmentSlot/>
          <EquipmentSlot/>
          <EquipmentSlot/>
        </div>
      </div>
      <div className='column map'>
        <h3>Area Name</h3>
        <Grid/>
      </div>
      <div className='column log'>
        Log
      </div>
    </div>
  )
}

export default Screen