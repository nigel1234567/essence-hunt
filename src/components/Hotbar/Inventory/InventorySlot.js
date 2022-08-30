import React, {useEffect, useState} from 'react'

const InventorySlot = (props) => {
  const [slot, setSlot] = useState(<button className='inventory-slot'></button>)

  useEffect(() => {
    if (props.item !== undefined) {
      console.log(props.item)
      setSlot(
        <button className='inventory-slot item'>
          <img src={props.item.image} alt={props.item.name}></img>
          <div className='tooltip'>
            <span className='item-name'><strong>{props.item.name}</strong></span>
            <strong className={props.item.rarity}>{props.item.rarity}</strong>
            <span><strong>Type: </strong>{props.item.type}</span>
          </div>
        </button>
      )
    }
  },[props])


  return (
    <>
      {slot}
    </>
  )
}

export default InventorySlot