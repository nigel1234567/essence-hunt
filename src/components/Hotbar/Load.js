import React, {useState, useEffect, useContext} from 'react'
import { PlayerContext } from '../Contexts/PlayerContext'
import { SeedContext } from '../Contexts/SeedContext'

const Load = (props) => {
  const [choice, setChoice] = useState()
  const {player, setPlayer} = useContext(PlayerContext)
  const {seedPriceList, setSeedPriceList} = useContext(SeedContext)

  let updatedPlayer = {...player}

  useEffect(() => {
    if (choice === 'yes') {
      // Check if localStorage is present
      if (window.localStorage.length !== 0) {
        updatedPlayer.load = true
        setPlayer(updatedPlayer)
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

  // Once player load === true
  useEffect(() => {
    if (player.load === true) {
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
    }
  }, [player.load])

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