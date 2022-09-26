import { seedList } from "../../Screen/Map/Seeds/Seeds";

let priceList = []

// Push name, price, potential and chances of seed
for (let i=0; i < seedList.length; i++) {
  // Create new seed object with name, price, potential and chances
  let seed = { name: seedList[i].name, image: seedList[i].image, originalPrice: seedList[i].price, price: seedList[i].price, risePotential: seedList[i].risePotential, fallPotential: seedList[i].fallPotential, riseChance: seedList[i].riseChance, previousPrice: seedList[i].price, priceChange: 0, priceChangePercentage: 0}
  priceList.push(seed)
}

// Function to get random chance
function rollChance(max) {
  return Math.floor(Math.random() * max);
}

// Run this for each new day to set 
function priceListSetter(priceList) {
  priceList.forEach(priceGenerator)
  return priceList
}

// Function to run price generator for each individual seed
function priceGenerator(seed) {
  // Run randomiser
  let chanceResult = rollChance(100) * 0.01
  if (chanceResult <= seed.riseChance) {
    // Rise
    let risePotential = seed.risePotential * 100
    let risePercent = rollChance(risePotential) * 0.01 // Done like this to get % to 2dp
    let newPrice = 0
    // Check if current price is 0
    if (seed.price === 0) {
      // Increase by 10% of base value amount * percentage rise
      newPrice = Math.floor(0.1 * seed.originalPrice * (1 + risePercent))
    } else {
      // Set new price
      newPrice = Math.floor(seed.price * (1 + risePercent))
    }

    // Set price changes
    seed.priceChange = newPrice - seed.price
    if (seed.price === 0) {
      seed.priceChangePercentage = Math.floor((seed.priceChange / 1) * 100)
    } else {
      seed.priceChangePercentage = Math.floor((seed.priceChange / seed.price) * 100)
    }    seed.previousPrice = seed.price
    seed.price = newPrice

  }
  else {
    // Fall
    let fallPotential = seed.fallPotential * 100
    let fallPercent = rollChance(fallPotential) * 0.01
    // Set new price
    let newPrice = Math.floor(seed.price * (1 - fallPercent))
    // Set price changes
    seed.priceChange = newPrice - seed.price
    // Check if seed price is 0
    if (seed.price === 0) {
      seed.priceChangePercentage = Math.floor((seed.priceChange / 1) * 100)
    } else {
      seed.priceChangePercentage = Math.floor((seed.priceChange / seed.price) * 100)
    }
    seed.previousPrice = seed.price
    seed.price = newPrice
  }
  return seed
}

export { priceList, priceListSetter }