import React, {useEffect, useState} from 'react'

const InventorySlot = (props) => {
  const [slot, setSlot] = useState(<button className='inventory-slot'></button>)

  useEffect(() => {
    if (props.item !== undefined) {
      console.log(props.item)
      setSlot(
        <button className='inventory-slot item'>
          <img src={props.item.image} alt={props.item.name}></img>
          <span className='tooltip'>{props.item.name}</span>
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