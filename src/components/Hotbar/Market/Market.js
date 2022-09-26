import React, { useContext } from 'react'
import { SeedContext } from '../../Contexts/SeedContext'

const Market = () => {
  const {seedPrice, setSeedPrice} = useContext(SeedContext)
  console.log(seedPrice)
  return (
    <h3>Market</h3>
  )
}

export default Market