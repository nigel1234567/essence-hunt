import Equipment from "./Equipment";
import Upgrade from "./Upgrade";
import energyBar_img from '../../../images/energybar.png'
import magicEye_img from '../../../images/magiceye.png'
import magicDust_img from '../../../images/magicdust.png'

// Equipment items
let energyBar = new Equipment('Energy Bar', 200, energyBar_img, 'Gain 1 energy.')
let magicEye = new Equipment('Magic Eye', 500, magicEye_img, 'Reveal 20% of possible cells with chance of 1 loot (Max 1 per day).')
let magicDust = new Equipment('Magic Seed Dust', 1000, magicDust_img, 'Change an existing seed in your inventory to a random seed.')

// Shop List (Equipment)
const equipmentList = [
  energyBar,
  magicEye,
  magicDust
]

// Upgrades
let inventory = new Upgrade('Inventory', [1000, 2500, 5000, 8000], 5)
let garden = new Upgrade('Garden', [2500, 5000, 10000, 20000], 5)
let energy = new Upgrade('Energy', [400, 800, 1000, 1200, 1400, 
                                    1800, 2200, 2600, 3000, 3400, 
                                    4000, 4600, 5200, 5800, 6400, 
                                    7200, 8000, 8800, 9600, 10000], 21)

// Shop List (Upgrades)
const upgradeList = [
  inventory,
  garden,
  energy
]

export {equipmentList, upgradeList}