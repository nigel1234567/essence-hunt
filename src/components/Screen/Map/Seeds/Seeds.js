import Seed from "./Seed"
import opple_img from '../../../../images/opple.png'
import pearmerald_img from '../../../../images/pearmerald.png'
import strawruby_img from '../../../../images/strawruby.png'
import diamelon_img from '../../../../images/diamelon.png'
import mudfruit_img from '../../../../images/mudfruit.png'
import marshmelon_img from '../../../../images/marshmelon.png'
import swamproot_img from '../../../../images/swamproot.png'
import monsoonberry_img from '../../../../images/monsoonberry.png'
import waterfruit_img from '../../../../images/waterfruit.png'
import earthfruit_img from '../../../../images/earthfruit.png'
import firefruit_img from '../../../../images/firefruit.png'
import airfruit_img from '../../../../images/airfruit.png'


// ********* CREATE A JS TEST *********

// Seeds Data
// Gem seeds
let apple = new Seed('Opple', 'Gem', 'Common', opple_img, 200, 3, 0.03, 0.02, 0.5)
let pear = new Seed('Pearmerald', 'Gem', 'Uncommon', pearmerald_img, 400, 4, 0.05, 0.03, 0.5)
let strawberry = new Seed('Strawruby', 'Gem', 'Rare', strawruby_img, 600, 5, 0.07, 0.04, 0.5)
let melon = new Seed('Diamelon', 'Gem', 'Mythical', diamelon_img, 1000, 6, 0.1, 0.05, 0.5)

// Swamp seeds
let mud = new Seed('Mud Fruit', 'Swamp', 'Common', mudfruit_img, 50, 1, 0.8, 0.3, 0.4)
let marsh = new Seed('Marshmelon', 'Swamp', 'Uncommon', marshmelon_img, 100, 1, 0.9, 0.5, 0.4)
let swamp = new Seed('Swamproot', 'Swamp', 'Rare', swamproot_img, 200, 1, 1, 0.7, 0.4)
let monsoon = new Seed('Monsoon Berry', 'Swamp', 'Mythical', monsoonberry_img, 500, 1, 1.2, 0.9, 0.4)

// Elemental Seeds
let water = new Seed('Water Fruit', 'Elemental', 'Common', waterfruit_img, 10, 5, 0.5, 0.04, 0.8)
let earth = new Seed('Earth Fruit', 'Elemental', 'Uncommon', earthfruit_img, 10, 5, 0.6, 0.06, 0.8)
let fire = new Seed('Fire Fruit', 'Elemental', 'Rare', firefruit_img, 10, 5, 0.7, 0.08, 0.8)
let air = new Seed('Air Fruit', 'Elemental', 'Mythical', airfruit_img, 10, 5, 0.8, 0.1, 0.8)

// Function to get random int
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Seed Generator
function seedGenerator() {
  // Seed lists
  const gem_list = [apple, pear, strawberry, melon]
  const swamp_list = [mud, marsh, swamp, monsoon]
  const elemental_list = [water, earth, fire, air]

  // Choose random number
  let typeNumber = getRandomInt(99)

  // Types (Gem (50%), Swamp (40%), Elemental (10%))
  const types = {
    'Gem': 100, // 51 - 100
    'Swamp': 50, // 11 - 50
    'Elemental': 10 // 0 - 9
  }

  // Seed Rarity (Common (50%), Uncommon (30%), Rare (15%), Mythical (5%))
  const rarity = {
    'Common': 100, // 51 - 100
    'Uncommon': 50, // 21 - 50
    'Rare': 20, // 6 - 20
    'Mythical': 5 // 0 - 5
  }

  // For loop to choose type
  let chosenType = null
  for (var i in types) {
    if (typeNumber <= types[i]) {
      chosenType = i
    }
  }

  // Choose random number
  let rarityNumber = getRandomInt(99)

  // For loop to choose rarity
  let chosenRarity = null
  for (var j in rarity) {
    if (rarityNumber <= rarity[j]) {
      chosenRarity = j
    }
  }

  // Select type list
  let typeList = null
  if (chosenType === 'Gem') {
    typeList = gem_list
  } else if (chosenType === 'Swamp') {
    typeList = swamp_list
  } else if (chosenType === 'Elemental') {
    typeList = elemental_list
  }

  // Select seed from typeList
  let selectedSeed = null
  for (var seed in typeList) {
    if (typeList[seed].rarity === chosenRarity) {
      selectedSeed = typeList[seed]
    }
  }

  return selectedSeed
}

// Create seedList
let seedList = [apple, pear, strawberry, melon, mud, marsh, swamp, monsoon, water, earth, fire, air]

// Randomly select seed rarity

export { seedGenerator, seedList }