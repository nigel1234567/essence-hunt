import React, {useEffect, useState} from 'react'
import News from './News'
import Inventory from './Inventory/Inventory'
import Garden from './Garden'

const Popup = (props) => {
  const [currentPopup, setCurrentPopup] = useState()
  
  useEffect(() => {
    if (props.trigger === 'news') {
      setCurrentPopup(<News />)
    } 
    else if (props.trigger === 'inventory') {
      setCurrentPopup(<Inventory />)
    }
    else if (props.trigger === 'garden') {
      setCurrentPopup(<Garden />)
    }
  }, [props.trigger])


  if (props.trigger != null) {
    return (
      <div className='popup'>
        <div className='popup-inner'>
          {currentPopup}
          <button className='close-btn' onClick={() => props.setTrigger(null)}>X</button>
        </div>
      </div>
    )
  } else {
    return (
      ''
    )
  }
}

export default Popup