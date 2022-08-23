import React, { useEffect, useState } from 'react'
import GridCell from './GridCell'
import { apple } from './Items/Items'

const Grid = (props) => {
  // Grid display (Depends on Map)
  const [gridDisplay, setGridDisplay] = useState()
  const maxLevel = 10
  console.log(props.items)
  console.log(props.items[0])

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
          item = apple
        }
        gridRow.push(<GridCell item={item}/>)
        // Increment of 1 for loopPosition
        loopPosition += 1
      }
      // Create whole grid and gridItem array
      grid.push(gridRow)
    }
      // Generate Grid Display
      setGridDisplay(grid.map(row => {
        let newRow = row.map(cell => {
          return (cell)
        })
        return (
          <div className='grid-row'>
            {newRow}
          </div>
        )
      }))

  }, [currentLevel])


  return (
    <div className='grid'>
      {gridDisplay}
    </div>
  )
}

export default Grid