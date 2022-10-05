import React, {useState, useEffect, useContext} from 'react'
import { PlayerContext } from '../Contexts/PlayerContext'

const Restart = (props) => {
  const [choice, setChoice] = useState()
  const {player, setPlayer} = useContext(PlayerContext)
  const [day, setDay] = useState(player.day)
  const [startingEnergy, setStartingEnergy] = useState(player.startingEnergy)

  let updatedPlayer = {...player}

  useEffect(() => {
    if (choice === 'yes') {
      // Remove player object and seedPriceList
      window.localStorage.removeItem("player")
      window.localStorage.removeItem("seedPriceList")
      props.setTrigger(null)
      setChoice(null)
      window.location.reload()
    } else if (choice === 'no') {
      // Close popup and refresh choice
      props.setTrigger(null)
      setChoice(null)
    }

    // Update player
    setPlayer(updatedPlayer)
  }, [choice])

  const choiceYes = () => {
    setChoice('yes')
  }



  return (
    <div className='options-main restart-option'>
      <h2>Restart</h2>
      <div className='options-inner'>
        <span>Do you want to restart your progress?</span>
        <div className="options-choice">
          <button className='choice-btn' onClick={() => setChoice('yes')}>Yes</button>
          <button className='choice-btn' onClick={() => setChoice('no')}>No</button>
        </div>
      </div>
    </div>
  )
}

export default Restart