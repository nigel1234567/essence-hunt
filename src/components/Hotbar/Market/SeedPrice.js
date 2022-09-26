import { seedList } from "../../Screen/Map/Seeds/Seeds";

let priceList = []

// Push name, price, potential and chances of seed
for (let i=0; i < seedList.length; i++) {
  // Create new seed object with name, price, potential and chances
  let seed = { name: seedList[i].name, price: seedList[i].price, risePotential: seedList[i].risePotential, fallPotential: seedList[i].fallPotential, riseChance: seedList[i].riseChance}
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
    // Set new price
    let newPrice = Math.floor(seed.price * (1 + risePercent))
    seed.price = newPrice
  }
  else {
    // Fall
    let fallPotential = seed.fallPotential * 100
    let fallPercent = rollChance(fallPotential) * 0.01
    // Set new price
    let newPrice = Math.floor(seed.price * (1 + fallPercent))
    seed.price = newPrice
  }
  return seed
}

export { priceList, priceListSetter }