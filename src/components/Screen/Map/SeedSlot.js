import React, { useContext, useEffect, useState } from 'react'
import { LootContext } from '../../Contexts/LootContext'

const SeedSlot = (props) => {
  const {loot, setLoot} = useContext(LootContext)
  const [preview, setPreview] = useState('?')
  const position = parseInt(props.seed.key) // Need to convert string to number (diff type)

  useEffect(() => {
    console.log(props.seed.image)
    if (loot.includes(position)) {
      setPreview(<img src={props.seed.image} alt={props.seed.name} className='seed-image'></img>)
    }
  }, [loot])

  return (
    <div className='seed-item'>
      <div>{props.seed.key}</div>
      {preview}
    </div>
  )
}

export default SeedSlot