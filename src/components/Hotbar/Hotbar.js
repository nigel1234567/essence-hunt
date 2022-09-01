import React, {useContext, useEffect, useState} from 'react'
import './styles/Hotbar.css'
import Popup from './Popup'
import { DayContext } from '../Contexts/PlayerContext'

const Hotbar = () => {
  const [popup, setPopup] = useState(null)
  const {day, setDay} = useContext(DayContext)

  const showNews = () => {
    setPopup('news')
  }

  const showInventory = () => {
    setPopup('inventory')
  }

  const showGarden = () => {
    setPopup('garden')
  }

  const showShop = () => {
    setPopup('shop')
  }

  const endDay = () => {
    setPopup('end')
  }

  return (
    <div className='hotbar'>
      <Popup trigger={popup} setTrigger={setPopup}></Popup>
      <div className='info'>
        <div>Day: {day}</div>
        <div>Essence: </div>
      </div>
      <div className='main'>
        <button className='btn news' onClick={showNews}>News</button>
        <button className='btn inventory' onClick={showInventory}>Inventory</button>
        <button className='btn garden' onClick={showGarden}>Garden</button>
        <button className='btn shop' onClick={showShop}>Shop</button>
        <button className='end' onClick={endDay}>End Day</button>
        <button className='question'>?</button>
      </div>
    </div>
  )
}

export default Hotbar