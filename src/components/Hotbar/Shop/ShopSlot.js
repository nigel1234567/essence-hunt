import React, { useEffect, useState } from 'react'

const ShopSlot = (props) => {
  const [slot, setSlot] = useState(
    <div className='shop-slot'>
      <img src={props.item.image} alt={props.item.name}></img>
      {props.item.name}
      {props.item.price}
    </div>
  )

  // Set display of slot depending on type of shop item
  useEffect(() => {
    if (props.type === 'equipment') {
      setSlot(
        <div className='shop-slot'>
          <img src={props.item.image} alt={props.item.name} className='shop-image'></img>
          <div className='shop-item-details'>
            <span><strong>Name: </strong>{props.item.name}</span>
            <span><strong>Price: </strong>{props.item.price}</span>
            <span><strong>Description: </strong>{props.item.description}</span>
          </div>
        <div className='shop-buttons'>
          <button className='shop-button buy'>Buy</button>
          <button className='shop-button sell'>Sell</button>
        </div>
      </div>
      )
    } else {
      setSlot(
      <div className='shop-slot'>
        <span><strong>{props.item.name}</strong></span>
        <div className='shop-item-details'>
        <span><strong>Level: </strong>{props.item.level}</span>
          <span><strong>Price: </strong>{props.item.prices[props.item.level-2]}</span>
        </div>
        <div className='shop-buttons'>
          <button className='shop-button buy'>Upgrade</button>
        </div>
      </div>
      )
    }
  }, [props])

  return (
    <>
      {slot}
    </>
  )
}

export default ShopSlot