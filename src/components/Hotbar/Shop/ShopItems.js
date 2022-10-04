import Equipment from "./Equipment";
import Upgrade from "./Upgrade";
import energyBar_img from '../../../images/energybar.png'
import magicEye_img from '../../../images/magiceye.png'
import magicDust_img from '../../../images/magicdust.png'

// Equipment items
let energyBar = new Equipment('Energy Bar', 100, energyBar_img, 'Gain 1 energy.')
let magicEye = new Equipment('Magic Eye', 300, magicEye_img, 'Reveal 20% of possible cells with loot.')
let magicDust = new Equipment('Magic Seed Dust', 500, magicDust_img, 'Change an existing seed in your inventory to another random seed.')

// Shop List (Equipment)
const equipmentList = [
  energyBar,
  magicEye,
  magicDust
]

// Upgrades
let inventory = new Upgrade('Inventory', [1000, 2500, 5000, 8000], 5)
let garden = new Upgrade('Garden', [2500, 5000, 10000, 20000], 5)
let energy = new Upgrade('Energy', [400, 800, 1200, 2000, 2800, 3800, 4800, 6000, 8000, 10000], 11 )

// Shop List (Upgrades)
const upgradeList = [
  inventory,
  garden,
  energy
]

export {equipmentList, upgradeList}