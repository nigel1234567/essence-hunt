import React, {useEffect, useState} from 'react'

const InventorySlotPlant = (props) => {
  const [slot, setSlot] = useState(<button className='inventory-slot plant'></button>)
  const plant = () => {
    alert('plant')
  }

  useEffect(() => {
    if (props.item !== undefined) {
      setSlot(
        <button className='inventory-slot plant item' onClick={plant}>
          <img src={props.item.image} alt={props.item.name}></img>
          <div className='tooltip'>
            <span className='item-name'><strong>{props.item.name}</strong></span>
            <strong className={props.item.rarity}>{props.item.rarity}</strong>
            <span><strong>Type: </strong>{props.item.type}</span>
            <span><strong>Price: </strong>{props.item.price}</span>
            <span><strong>Days to grow: </strong>{props.item.days}</span>
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

export default InventorySlotPlant