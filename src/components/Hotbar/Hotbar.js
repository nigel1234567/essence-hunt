import React, {useState} from 'react'
import './styles/Hotbar.css'
import Popup from './Popup'

const Hotbar = () => {
  const [popup, setPopup] = useState(null)

  const showNews = () => {
    setPopup('news')
  }

  const showInventory = () => {
    setPopup('inventory')
  }

  const showFruitpedia = () => {
    setPopup('fruitpedia')
  }

  return (
    <div className='hotbar'>
      <Popup trigger={popup} setTrigger={setPopup}></Popup>
      <div className='info'>
        <div>Day: </div>
        <div>Essence: </div>
      </div>
      <div className='main'>
        <button className='btn news' onClick={showNews}>News</button>
        <button className='btn inventory' onClick={showInventory}>Inventory</button>
        <button className='btn fruitpedia' onClick={showFruitpedia}>Fruitpedia</button>
        <button className='btn end'>End Day</button>
      </div>
    </div>
  )
}

export default Hotbar