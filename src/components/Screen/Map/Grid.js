import React, { useState } from 'react'

const Grid = (props) => {
  // Grid Size (Depends on Map Name)
  const [gridSize, setGridSize] = useState(props.level * props.level)

  // Grid Cell (Contain GridItem)

  // Generate Grid (Based on grid size)

  return (
    <div>Grid {gridSize}</div>
  )
}

export default Grid