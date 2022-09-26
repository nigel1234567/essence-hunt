import React, {useState, useEffect} from 'react'
import PlantOptions from './PlantOptions'

const PopupOptions = (props) => {
  const [currentPopup, setCurrentPopup] = useState()

  useEffect(() => {
    if (props.trigger === 'plant') {
      setCurrentPopup(<PlantOptions />)
    } 
    else if (props.trigger === 'harvest') {
      
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