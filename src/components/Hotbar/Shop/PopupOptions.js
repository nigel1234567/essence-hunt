import React, {useState, useEffect} from 'react'
import DustOptions from './DustOptions'

const PopupOptions = (props) => {
  const [currentPopup, setCurrentPopup] = useState()

  useEffect(() => {
    if (props.trigger === 'dust') {
      setCurrentPopup(<DustOptions setTrigger={props.setTrigger}/>)
    } 
  }, [props.trigger])

  if (props.trigger != null) {
    return (
      <div className='options-popup'>
        <div className='options-popup-inner'>
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

export default PopupOptions