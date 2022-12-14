import React, {useContext, useEffect, useState} from 'react'
import './styles/Hotbar.css'
import Popup from './Popup'
import { PlayerContext } from '../Contexts/PlayerContext'

const Hotbar = () => {
  let {player, setPlayer} = useContext(PlayerContext)
  const [log, setLog] = useState(player.log)
  const [popup, setPopup] = useState('instructions')
  const [day, setDay] = useState(player.day)
  const [week, setWeek] = useState(1)
  const [essence, setEssence] = useState(player.essence)

  let updatedLog = [...log]
  let updatedPlayer ={...player}

  useEffect(() => {
    setDay(player.day)
    setLog(player.log)
    setEssence(player.essence)
    updatedLog = [...log]
  }, [player])

  // Update week
  useEffect(() => {
    setWeek(Math.ceil(day / 7))
  }, [day])

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

  const restart = () => {
    setPopup('restart')
  }

  const load = () => {
    setPopup('load')
  }

  const instructions = () => {
    setPopup('instructions')
  }

  return (
    <div className='hotbar'>
      <Popup trigger={popup} setTrigger={setPopup}></Popup>
      <div className='info'>
        <div>Day: {day}</div>
        <div>Week: {week}</div>
        <div>Essence: {essence}</div>
      </div>
      <div className='main'>
        <button className='btn market' onClick={showMarket}>Market</button>
        <button className='btn inventory' onClick={showInventory}>Inventory</button>
        <button className='btn garden' onClick={showGarden}>Garden</button>
        <button className='btn shop' onClick={showShop}>Shop</button>
        <button className='end' onClick={endDay}>End Day</button>
        <button className='options-btn restart' onClick={restart}>Restart</button>
        <button className='options-btn load' onClick={load}>Load</button>
        <button className='instructions' onClick={instructions}>?</button>
      </div>
    </div>
  )
}

export default Hotbar