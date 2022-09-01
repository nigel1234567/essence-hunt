import React, {useState, useEffect, useContext} from 'react'
import { DayContext, EnergyContext, StartingEnergyContext } from '../Contexts/PlayerContext'

const End = (props) => {
  const [choice, setChoice] = useState()
  const {day, setDay} = useContext(DayContext)
  const {currentEnergy, setCurrentEnergy} = useContext(EnergyContext)
  const {startingEnergy, setStartingEnergy} = useContext(StartingEnergyContext)

  useEffect(() => {
    console.log(choice)
    if (choice === 'yes') {
      // Increase day
      let updatedDay = day + 1
      setDay(updatedDay)
      // Refresh energy
      setCurrentEnergy(startingEnergy)
      // Close popup and refresh choice
      props.setTrigger(null)
      setChoice(null)
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
    <div className='end-day'>
      <h2>End Day #</h2>
      <div className='end-alert'>
        <span>Do you want to end day #?</span>
        <div className="end-choice">
          <button onClick={() => setChoice('yes')}>Yes</button>
          <button onClick={() => setChoice('no')}>No</button>
        </div>
      </div>
    </div>
  )
}

export default End