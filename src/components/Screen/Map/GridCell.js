import React from 'react'

const GridCell = (props) => {
  const selectCell = (e) => {
    console.log(props.item)
    if (props.item !== 'empty') {
      e.target.innerHTML = props.item.name
      e.target.className='grid-cell loot'
    } else {
      e.target.innerHTML = 'X'
      e.target.className='grid-cell empty'
    }
  }

  return (
    <button onClick={selectCell} className='grid-cell'>Cell</button>
  )
}

export default GridCell