class Seed {
  constructor(name, type, rarity, image, price, daysToGrow, risePotential, fallPotential,chanceToRise) {
    // Name of seed
    this.name = name;
    this.type = type;
    this.rarity = rarity;
    this.image = image;
    this.price = price;
    this.days = daysToGrow;
    this.risePotential = risePotential; // Potential % rise
    this.fallPotential = fallPotential; // Potential % fall
    this.riseChance = chanceToRise; // Chance to rise each day
  }
}

export default Seed