import React, {useState} from 'react'
import './App.css'
import Hotbar from './components/Hotbar/Hotbar'
import Screen from './components/Screen/Screen'
import { InventoryContext } from './components/Contexts/PlayerContext'

const App = () => {
  const [inventory, setInventory] = useState([])
  return (
    <>
    <InventoryContext.Provider value={{inventory, setInventory}}>
      <Screen />
      <Hotbar />
    </InventoryContext.Provider>
    </>
  )
}

export default App;
