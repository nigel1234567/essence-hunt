import Equipment from "./Equipment";
import energyBar_img from '../../../images/energybar.png'
import magicEye_img from '../../../images/magiceye.png'
import magicDust_img from '../../../images/magicdust.png'

// Equipment items
let energyBar = new Equipment('Energy Bar', 100, energyBar_img, 'Consume this to gain 1 energy')
let magicEye = new Equipment('Magic Eye', 300, magicEye_img, 'Consume to reveal 10% of possible cells with loot')
let magicDust = new Equipment('Magic Seed Dust', 500, magicDust_img, 'Consume to change an existing seed in your inventory to another random seed.')

// Shop List (Equipment)
const equipmentList = [
  energyBar,
  magicEye,
  magicDust
]

export {equipmentList}