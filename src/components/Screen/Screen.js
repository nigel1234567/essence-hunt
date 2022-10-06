import React, { useState, useEffect, useContext } from 'react'
import EquipmentSlot from './Equipment/EquipmentSlot'
import Grid from './Map/Grid'
import SeedSlot from './Map/SeedSlot'
import LogDisplay from '../Hotbar/Log/LogDisplay'
import { seedGenerator } from './Map/Seeds/Seeds'
import { PlayerContext } from '../Contexts/PlayerContext'
import { LootContext } from '../Contexts/LootContext'
import './styles/Screen.css'

const Screen = () => {
  // Equipment

  // Level info
  const [level, setLevel] = useState(1)
  const [prevLevelDay, setPrevLevelDay] = useState(1)

  // Map info
  const [startingSeed, setStartingSeed] = useState()
  const [seeds, setSeeds] = useState([])
  const [seedSlots, setSeedSlots] = useState()
  const [gridItemsArray, setGridItemsArray] = useState([])
  const [grid, setGrid] = useState()

  // Player info
  const {player, setPlayer} = useContext(PlayerContext)
  const [startingEnergy, setStartingEnergy] = useState(player.startingEnergy)
  const [currentEnergy, setCurrentEnergy] = useState(player.currentEnergy)
  const [loot, setLoot] = useState([])
  const [day, setDay] = useState(player.day)
  const [equipment, setEquipment] = useState(player.equipment)
  const [equipmentGrid, setEquipmentGrid] = useState([])

  let updatedPlayer = {...player}

  // Functions
  const showPlayer = () => {
    console.log(player)
  }

  const showGarden = () => {
    console.log(player.garden)
  }

  // Durstenfeld shuffle
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
  }

  // Update energy and day whenever player object changes
  useEffect(() => {
    setCurrentEnergy(player.currentEnergy)
    setStartingEnergy(player.startingEnergy)
    setDay(player.day)
    setEquipment(player.equipment)
  }, [player])

  // Equipment
  useEffect(() => {
    let equipmentArray = []
    for (let i=0; i < 3; i++) {
      if (equipment[i] !== null) {
        equipmentArray.push(<EquipmentSlot key={i} item={equipment[i]} position={i}/>)
      } else {
        equipmentArray.push(<EquipmentSlot item={null}/>)
      }
    }
    setEquipmentGrid(equipmentArray)
  }, [equipment])

  // Items array
  // Levels
  let currentLevel = level + 2
  const maxLevel = 10
  useEffect(()=>{
    // Set currentLevel (limited by maxLevel)
    if (level < maxLevel - 2) {
      currentLevel= level + 2
    } else {
      currentLevel = maxLevel
    }
  }, [level])

  // Set starting seed
  useEffect(() => {
    // Reset startingSeed and seedArray
    // Max seed = 10
    if (level > 8) {
      setStartingSeed(10)
    } else {
      setStartingSeed(level + 2)
    }
    
  }, [level])

  let gridItems = []
  // Set gridItems, seedArray and seeds
  useEffect(() => {
    // Loop creating of gridItems array
    for (let i=0; i < currentLevel * currentLevel; i++) {
      // Add in the loot on the first row
      if (i < currentLevel) {
        let loot = seedGenerator()
        // Create a deep copy of loot
        let lootCopy = JSON.parse(JSON.stringify(loot))
        // Create unique id (uid)
        lootCopy.uid = `${player.day}-${i}`
        gridItems.push(lootCopy)
      } else {
        // Add in empty for remaining rows
        gridItems.push('empty')
      }
      // Shuffle gridItems array
      shuffleArray(gridItems)
    }
    setGridItemsArray(gridItems)

  }, [startingSeed, currentLevel, day, player.load])

  useEffect(() => {
    // Generating seed slots
    let seedArray = []
    // Push seeds from gridItemsArray into seedArray
    for (let item in gridItemsArray) {
      let currentItem = gridItemsArray[item]
      if (currentItem !== 'empty') {
        seedArray.push(currentItem)
      }
    }
    setSeeds(seedArray)

    // Reset LootContext, grid and seedSlots
    setGrid()
    setSeedSlots()
    setLoot([])
  }, [gridItemsArray])

  // Set Grid
  useEffect(() => {
    setGrid(<Grid level={level} items={gridItemsArray}/>)
    // Update player grid
    updatedPlayer.grid = gridItemsArray
    setPlayer(updatedPlayer)
  }, [seeds, day])

  // Set SeedSlot components
  useEffect(() => {
    // Record positions of seeds
    let lootSeedsArray = []
    for (let pos in gridItemsArray) {
      if (gridItemsArray[pos] !== 'empty') {
        let lootSeed = { key: pos,  name: gridItemsArray[pos].name, image: gridItemsArray[pos].image}
        lootSeedsArray.push(lootSeed)
      }
    }
    // Shuffle positions of lootSeedsArray
    shuffleArray(lootSeedsArray)
    // Seed slots shown in window
    setSeedSlots(lootSeedsArray.map(item => {
      return (
        <SeedSlot
          seed={item}
          key={item.key}
          />
        )
      })
    )
  }, [seeds])

  // Increase stage level after every 7 days
  useEffect(() => {
    if (day - prevLevelDay === 7) {
      if (level < 8) {
        setLevel(level+1)
      }
      setPrevLevelDay(day)
    }
  }, [day])

  return (
    <div className='screen'>
      <div className='column equipment'>
        <h3>Consumables</h3>
        <div className='equipment-slots'>
          {equipmentGrid}
        </div>
      </div>
      <div className='column map'>
        <LootContext.Provider value={{loot, setLoot}}>
            <h3>Hunting Grounds</h3>
            {grid}
            <div className='player-info'>
              <div><strong>Energy: </strong>{currentEnergy}</div>
              <div><strong>Max Energy: </strong>{startingEnergy}</div>
              <div><strong>Level: </strong>{level}</div>
            </div>
            <div className='seed-info'>
              <div className='loot-title'>Loot</div>
              <div className='seed-slots'>
                {seedSlots}
              </div>
            </div>
        </LootContext.Provider>
      </div>
      <div className='column log'>
        <h3>Log</h3>
        <LogDisplay/>
      </div>
    </div>
  )
}

export default Screen