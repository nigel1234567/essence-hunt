import React, {useEffect, useState} from 'react'
import Market from './Market/Market'
import Inventory from './Inventory/Inventory'
import Garden from './Garden/Garden'
import Shop from './Shop/Shop'
import End from './End'
import Restart from './Restart'
import Load from './Load'
import Instructions from './Instructions'

const Popup = (props) => {
  const [currentPopup, setCurrentPopup] = useState()
  
  useEffect(() => {
    if (props.trigger === 'market') {
      setCurrentPopup(<Market />)
    } 
    else if (props.trigger === 'inventory') {
      setCurrentPopup(<Inventory />)
    }
    else if (props.trigger === 'garden') {
      setCurrentPopup(<Garden />)
    }
    else if (props.trigger === 'shop') {
      setCurrentPopup(<Shop />)
    }
    else if (props.trigger === 'end') {
      setCurrentPopup(<End trigger = {props.trigger} setTrigger={props.setTrigger}/>)
    }
    else if (props.trigger === 'restart') {
      setCurrentPopup(<Restart trigger={props.trigger} setTrigger={props.setTrigger}/>)
    }
    else if (props.trigger === 'load') {
      setCurrentPopup(<Load trigger={props.trigger} setTrigger={props.setTrigger}/>)
    }
    else if (props.trigger === 'instructions') {
      setCurrentPopup(<Instructions trigger={props.trigger} setTrigger={props.setTrigger}/>)

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