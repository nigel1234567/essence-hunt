import React from 'react'
import './styles/Hotbar.css'

const Hotbar = () => {

  return (
    <div className='hotbar'>
      <div className='info'>
        <div>Day: </div>
        <div>Essence: </div>
      </div>
      <div className='main'>
        <button className='btn news'>News</button>
        <button className='btn inventory'>Inventory</button>
        <button className='btn fruitpedia'>Fruitpedia</button>
        <button className='btn end'>End Day</button>
      </div>
    </div>
  )
}

export default Hotbar