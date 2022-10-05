import React, {useState, useEffect, useContext} from 'react'
import { PlayerContext } from '../Contexts/PlayerContext'
import { SeedContext } from '../Contexts/SeedContext'

const Load = (props) => {
  const [choice, setChoice] = useState()
  const {player, setPlayer} = useContext(PlayerContext)
  const {seedPriceList, setSeedPriceList} = useContext(SeedContext)

  useEffect(() => {
    if (choice === 'yes') {
      // Check if localStorage is present
      if (window.localStorage.length !== 0) {
        // Get player object
        let savedPlayer = window.localStorage.getItem("player")
        savedPlayer = JSON.parse(savedPlayer)
        setPlayer(savedPlayer)
        // Get seedPriceList
        let savedPrices = window.localStorage.getItem("seedPriceList")
        savedPrices = JSON.parse(savedPrices)
        setSeedPriceList(savedPrices)
        // Close window
        props.setTrigger(null)
        setChoice(null)
      } else {
        alert('You do not have a save file!')
        // Close window
        props.setTrigger(null)
        setChoice(null)
      }

    } else if (choice === 'no') {
      // Close popup and refresh choice
      props.setTrigger(null)
      setChoice(null)
    }
  }, [choice])

  const choiceYes = () => {
    setChoice('yes')
  }



  return (
    <div className='options-main load-option'>
      <h2>Load</h2>
      <div className='options-inner'>
        <span>Do you want to load your previous saved file?</span>
        <div className="options-choice">
          <button className='choice-btn' onClick={() => setChoice('yes')}>Yes</button>
          <button className='choice-btn' onClick={() => setChoice('no')}>No</button>
        </div>
      </div>
    </div>
  )
}

export default Load