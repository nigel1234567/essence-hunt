import React, { useContext, useEffect, useState } from 'react'
import { SeedContext } from '../../Contexts/SeedContext'
import MarketSeed from './MarketSeed'

const Market = () => {
  const {seedPriceList} = useContext(SeedContext)
  const [seedList, setSeedList] = useState()

  useEffect(() => {
    let seedListArray = []
    // Update seed prices
    for (let i=0; i < seedPriceList.length; i++) {
      // Push seed prices into seedListArray
      seedListArray.push(<MarketSeed key={i} seed={seedPriceList[i]}/>)
    }

    setSeedList(seedListArray)
  }, [seedPriceList])

  return (
    <div className='market-main'>
      <h3 className='market-title'>Market Prices</h3>
      <div className='seed-list'>
        {seedList}
      </div>
    </div>
  )
}

export default Market