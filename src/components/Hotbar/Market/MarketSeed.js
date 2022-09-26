import React from 'react'

const MarketSeed = (props) => {

  return (
    <div className='market-seed'>
      <div className='seed-details'>
        <img src={props.seed.image} alt={props.seed.name} className='seed-image'></img>
        <span><strong>Price: </strong>{props.seed.price}</span>
        <span><strong>Previous: </strong>{props.seed.previousPrice}</span>
        <span><strong>Change: </strong>{props.seed.priceChange}</span>
        <span><strong>Change(%): </strong>{props.seed.priceChangePercentage}%</span>
      </div>

    </div>
  )
}

export default MarketSeed