import React, {useContext, useEffect, useState} from 'react'
import './styles/Hotbar.css'
import Popup from './Popup'
import { PlayerContext } from '../Contexts/PlayerContext'

const Hotbar = () => {
  let {player, setPlayer} = useContext(PlayerContext)
  const [popup, setPopup] = useState(null)
  const [day, setDay] = useState(player.day)
  const [essence, setEssence] = useState(player.essence)

  useEffect(() => {
    setDay(player.day)
    setEssence(player.essence)
  }, [player])

  const showMarket = () => {
    setPopup('market')
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
        <div>Essence: {essence}</div>
      </div>
      <div className='main'>
        <button className='btn market' onClick={showMarket}>Market</button>
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