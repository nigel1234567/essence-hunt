import React, {useEffect, useState} from 'react'
import './App.css'
import Hotbar from './components/Hotbar/Hotbar'
import Screen from './components/Screen/Screen'
import { EnergyContext, InventoryContext, StartingEnergyContext, DayContext } from './components/Contexts/PlayerContext'

const App = () => {
  const [inventory, setInventory] = useState([])
  const [startingEnergy, setStartingEnergy] = useState(5)
  const [currentEnergy, setCurrentEnergy] = useState(5)
  const [day, setDay] = useState(1)

  useEffect(() => {
    console.log(day)
  }, [day])

  return (
    <>
    <InventoryContext.Provider value={{inventory, setInventory}}>
      <StartingEnergyContext.Provider value={{startingEnergy, setStartingEnergy}}>
        <EnergyContext.Provider value={{currentEnergy, setCurrentEnergy}}>
          <DayContext.Provider value={{day, setDay}}>
          <Screen />
          <Hotbar />
          </DayContext.Provider>
        </EnergyContext.Provider>
      </StartingEnergyContext.Provider>
    </InventoryContext.Provider>
    </>
  )
}

export default App;
