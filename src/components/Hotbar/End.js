import React, {useState, useEffect, useContext} from 'react'
import { PlayerContext } from '../Contexts/PlayerContext'
import { SeedContext } from '../Contexts/SeedContext'
import { priceList, priceListSetter } from './Market/SeedPrice'

const End = (props) => {
  const [choice, setChoice] = useState()
  const {player, setPlayer} = useContext(PlayerContext)
  const {seedPriceList, setSeedPriceList} = useContext(SeedContext)
  const [day, setDay] = useState(player.day)
  const [startingEnergy, setStartingEnergy] = useState(player.startingEnergy)

  let updatedPlayer = {...player}

  useEffect(() => {
    if (choice === 'yes') {
      // Increase day
      let updatedDay = day + 1
      updatedPlayer.day = updatedDay
      updatedPlayer.newDay = true
      // Refresh energy
      updatedPlayer.currentEnergy = startingEnergy
      // Refresh log
      updatedPlayer.log = []
      // Run priceListSetter for seed prices
      priceListSetter(seedPriceList)
      // Close popup and refresh choice
      props.setTrigger(null)
      setChoice(null)
    } else if (choice === 'no') {
      // Close popup and refresh choice
      props.setTrigger(null)
      setChoice(null)
    }

    // Update player
    setPlayer(updatedPlayer)
  }, [choice])



  return (
    <div className='end-day'>
      <h2>End Day {day}</h2>
      <div className='end-alert'>
        <span>Do you want to end day {day}?</span>
        <div className="end-choice">
          <button className='choice-btn' onClick={() => setChoice('yes')}>Yes</button>
          <button className='choice-btn' onClick={() => setChoice('no')}>No</button>
        </div>
      </div>
    </div>
  )
}

export default End