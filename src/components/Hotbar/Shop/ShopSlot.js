import React from 'react'

const ShopSlot = (props) => {

  return (
    <div>
      <img src={props.item.image} alt={props.item.name}></img>
      {props.item.name}
      {props.item.price}
    </div>
  )
}

export default ShopSlot