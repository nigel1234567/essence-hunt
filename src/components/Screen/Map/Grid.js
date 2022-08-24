import React, { useEffect, useState } from 'react'
import GridCell from './GridCell'
import { seedGenerator } from './Seeds/Seeds'

const Grid = (props) => {
  // Grid display (Depends on Map)
  const [gridDisplay, setGridDisplay] = useState()
  const maxLevel = 10

  // Grid Cells (Contain GridItem)
  let grid = []

  // Generate Grid (Based on grid size)
  let currentLevel = props.level + 2
  useEffect(()=>{
    // Set Grid Size
    if (props.level < maxLevel - 2) {
      currentLevel= props.level + 2
    } else {
      currentLevel = maxLevel
    }
  }, [props.level])

  // Show grid display
  useEffect(() => {
    // To indicate current iteration of loop
    let loopPosition = 0
    // Loop creating of cell (and gridItems array)
    for (let i=0; i < currentLevel; i++) {
      let gridRow = []
      // Create rows in grid
      for (let j=0; j < currentLevel; j++) {
        let item = 'empty'
        // Get from gridItems array if current cell contains loot
        if (props.items[loopPosition] === 'loot') {
          // To add randomiser
          item = seedGenerator()
          console.log(item)
        }
        gridRow.push(<GridCell key={loopPosition} item={item}/>)
        // Increment of 1 for loopPosition
        loopPosition += 1
      }
      // Create whole grid and gridItem array
      grid.push(gridRow)
    }
      // Generate Grid Display
      let rowNum = 0
      setGridDisplay(grid.map(row => {
        let newRow = row.map(cell => {
          rowNum+=1
          return (cell)
        })
        return (
          <div className='grid-row' key={rowNum}>
            {newRow}
          </div>
        )
      }))

  }, [currentLevel, props.items])


  return (
    <div className='grid'>
      {gridDisplay}
    </div>
  )
}

export default Grid