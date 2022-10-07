import React, { useState, useContext, useEffect } from 'react'
import ShopSlot from './ShopSlot'
import { PlayerContext } from '../../Contexts/PlayerContext'
import { equipmentList, upgradeList } from './ShopItems'

const Shop = () => {
  const {player, setPlayer} = useContext(PlayerContext)
  const [shopGrid, setShopGrid] = useState([])
  const [equipmentButton, setEquipmentButton] = useState()
  const [upgradeButton, setUpgradeButton] = useState()

  // Choosing equipment category
  const equipmentOption = () => {
    // Set equipment and upgrade buttons
    setEquipmentButton(<button onClick={equipmentOption} className='focus'>Equipment</button>)
    setUpgradeButton(<button onClick={upgradeOption} className=''>Upgrade</button>)
    
    let equipmentArray = []
    for (let i=0; i < equipmentList.length; i++) {
      equipmentArray.push(<ShopSlot key={i} type='equipment' item={equipmentList[i]}/>)
    }

    setShopGrid(equipmentArray)
  }

    // Choosing upgrades category
  const upgradeOption = () => {
    // Set equipment and upgrade buttons
    setEquipmentButton(<button onClick={equipmentOption} className=''>Consumables</button>)
    setUpgradeButton(<button onClick={upgradeOption} className='focus'>Upgrade</button>)

    // Update shop display
    let upgradeArray = []
    for (let i=0; i < upgradeList.length; i++) {
      upgradeArray.push(<ShopSlot key={i} type='upgrade' item={upgradeList[i]}/>)
    }

    setShopGrid(upgradeArray)
  }

    // Initial opening of shop
    useEffect(() => {
      // Set equipment and upgrade buttons
      setEquipmentButton(<button onClick={equipmentOption} className='focus'>Consumables</button>)
      setUpgradeButton(<button onClick={upgradeOption} className=''>Upgrade</button>)
      // Set as equipment
      let equipmentArray = []
      for (let i=0; i < equipmentList.length; i++) {
        equipmentArray.push(<ShopSlot key={i} type='equipment' item={equipmentList[i]}/>)
      }
  
      setShopGrid(equipmentArray)
    }, [])

  return (
    <div className='shop-main'>
      <h3>Shop</h3>
      <div className='shop-options'>
        {equipmentButton}
        {upgradeButton}
      </div>
      <div className='shop-details'>
        {shopGrid}
      </div>
    </div>
  )
}

export default Shop