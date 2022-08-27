import React, { useContext, useEffect, useState } from 'react'
import { LootContext } from '../LootContext'

const SeedSlot = (props) => {
  const {loot, setLoot} = useContext(LootContext)
  const [name, setName] = useState('Undug')
  const position = parseInt(props.pos) // Need to convert string to number (diff type)

  // Not working
  useEffect(() => {

    if (loot.includes(position)) {
      setName(props.seed.name)
    }
  }, [loot])

  return (
    <div className='seed-item'>
      <div>{props.seed.key}</div>
      <div>{name}</div>
    </div>
  )
}

export default SeedSlot