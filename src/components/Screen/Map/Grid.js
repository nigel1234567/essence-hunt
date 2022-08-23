import React, { useEffect, useState } from 'react'
import GridCell from './GridCell'

const Grid = (props) => {
  // Grid display (Depends on Map)
  const [gridDisplay, setGridDisplay] = useState()
  const maxLevel = 10

  // Grid Cells (Contain GridItem)
  let grid = []

  // Generate Grid (Based on grid size)s
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
    // Loop creating of cell
    for (let i=0; i < currentLevel; i++) {
      let gridRow = []
      for (let j=0; j < currentLevel; j++) {
        gridRow.push(<GridCell/>)
      }
      grid.push(gridRow)
    }
      // Generate Grid Display
      setGridDisplay(grid.map(row => {
        let newRow = row.map(cell => {
          return (cell)
        })
        return (
          <div className='grid-col'>
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