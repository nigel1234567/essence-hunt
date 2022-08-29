import Seed from "./Seed"
import opple_img from '../../../../images/opple.png'
import pearmerald_img from '../../../../images/pearmerald.png'
import strawruby_img from '../../../../images/strawruby.png'
import diamelon_img from '../../../../images/diamelon.png'

// ********* CREATE A JS TEST *********

// Seeds Data
// Gem seeds
let apple = new Seed('Opple', 'gem', 'common', opple_img)
let pear = new Seed('Pearmerald', 'gem', 'uncommon', pearmerald_img)
let strawberry = new Seed('Strawruby', 'gem', 'rare', strawruby_img)
let melon = new Seed('Diamelon', 'gem', 'mythical', diamelon_img)

// Swamp seeds
let mud = new Seed('Mud Fruit', 'swamp', 'common')
let marsh = new Seed('Marshmelon', 'swamp', 'uncommon')
let swamp = new Seed('Swamproot', 'swamp', 'rare')
let monsoon = new Seed('Monsoon Berry', 'swamp', 'mythical')

// Elemental Seeds
let water = new Seed('Water Fruit', 'elemental', 'common')
let earth = new Seed('Earth Fruit', 'elemental', 'uncommon')
let fire = new Seed('Fire Fruit', 'elemental', 'rare')
let air = new Seed('Air Fruit', 'elemental', 'mythical')

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
    'gem': 100,
    'swamp': 50,
    'elemental': 10
  }

  // Seed Rarity (Common (50%), Uncommon (30%), Rare (15%), Mythical (5%))
  const rarity = {
    'common': 100,
    'uncommon': 50,
    'rare': 20,
    'mythical': 5
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
  if (chosenType === 'gem') {
    typeList = gem_list
  } else if (chosenType === 'swamp') {
    typeList = swamp_list
  } else if (chosenType === 'elemental') {
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

// Randomly select seed rarity

export { seedGenerator }