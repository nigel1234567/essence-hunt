import React, { useState, useContext, useEffect } from 'react'
import ShopSlot from './ShopSlot'
import { PlayerContext } from '../../Contexts/PlayerContext'
import { equipmentList, upgradeList } from './ShopItems'

const Shop = () => {
  const {player, setPlayer} = useContext(PlayerContext)
  const [shopGrid, setShopGrid] = useState([])

  // Initial opening of shop
  useEffect(() => {
    // Set as equipment
    let equipmentArray = []
    for (let i=0; i < equipmentList.length; i++) {
      equipmentArray.push(<ShopSlot key={i} type='equipment' item={equipmentList[i]}/>)
    }

    setShopGrid(equipmentArray)
  }, [])

  // Choosing equipment category
  const equipmentOption = () => {
    let equipmentArray = []
    for (let i=0; i < equipmentList.length; i++) {
      equipmentArray.push(<ShopSlot key={i} type='equipment' item={equipmentList[i]}/>)
    }

    setShopGrid(equipmentArray)
  }

    // Choosing upgrades category
  const upgradeOption = () => {
    let upgradeArray = []
    for (let i=0; i < upgradeList.length; i++) {
      upgradeArray.push(<ShopSlot key={i} type='upgrade' item={upgradeList[i]}/>)
    }

    setShopGrid(upgradeArray)
  }

  return (
    <div className='shop-main'>
      <h3>Shop</h3>
      <div className='shop-options'>
        <button onClick={equipmentOption}>Equipment</button>
        <button onClick={upgradeOption}>Upgrade</button>
      </div>
      <div className='shop-details'>
        {shopGrid}
      </div>
    </div>
  )
}

export default Shop