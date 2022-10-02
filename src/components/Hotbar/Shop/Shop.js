import React, { useState, useContext, useEffect } from 'react'
import ShopSlot from './ShopSlot'
import { PlayerContext } from '../../Contexts/PlayerContext'
import { equipmentList } from './ShopItems'

const Shop = () => {
  const {player, setPlayer} = useContext(PlayerContext)
  const [equipmentShopGrid, setEquipmentShopGrid] = useState([])

  useEffect(() => {
    let equipmentArray = []
    let equipmentPosition = 0
    for (let i=0; i < equipmentList.length; i++) {
      equipmentArray.push(<ShopSlot key={i} item={equipmentList[i]}/>)
    }

    setEquipmentShopGrid(equipmentArray)
  }, [equipmentList])

  return (
    <div className='shop-main'>
      <h3>Shop</h3>
      {equipmentShopGrid}
    </div>
  )
}

export default Shop