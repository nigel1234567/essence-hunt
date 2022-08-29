import React, { useContext, useEffect, useState } from 'react'
import { LootContext } from '../LootContext'

const SeedSlot = (props) => {
  const {loot, setLoot} = useContext(LootContext)
  const [name, setName] = useState('Undug')
  const position = parseInt(props.seed.key) // Need to convert string to number (diff type)

  useEffect(() => {

    console.log(props)
    console.log(props.key)
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