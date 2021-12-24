import { LoremIpsum } from "lorem-ipsum"

export const ingredientList = ["flour", "sugar", "salt", "butter", "milk"]

const instructionIpsum = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
})

const ingredientIpsum = new LoremIpsum({
  words: ingredientList,
})

const unitIpsum = new LoremIpsum({
  words: ["cup", "tsp", "tbsp", "pinch"],
})

interface IngredientValues {
  name: string
  unit: string
  amount: string
}

const createIngredient = (): IngredientValues => {
  const unitAmount = Math.random() * 5
  return {
    name: ingredientIpsum.generateWords(1),
    unit: unitIpsum.generateWords(1),
    amount: `${unitAmount.toFixed(2)}`,
  }
}

const recipeNames = [
  "Classic",
  "Yellow",
  "Chocolate",
  "Frosting",
  "Coconut",
  "Bundt",
  "White",
  "Chocolate-Coconut",
  "Glaze",
  "Cream",
  "Cheese",
  "Pound",
  "German",
  "Chocolate",
  "Homemade",
  "Rum",
  "Peanut",
  "Butter",
  "Cup",
  "Overload",
  "Salted",
  "Caramel",
  "Apple",
  "Snickers",
  "Texas",
  "Sheet",
  "Ultimate",
  "Cookies",
  "Cream",
  "Oreo",
  "Cake",
  "Apple-Cinnamon",
  "Banana",
  "Berrylicious",
  "Blueberry",
  "Chocolate",
  "Chip",
  "Cornbread",
  "Honey",
  "Morning",
  "Glory",
  "Pumpkin",
  "Cream",
  "Cheese",
  "Pecan",
  "Streusel",
  "Triple",
  "Chocolate",
  "Chunk",
  "Zucchini-Chocolate",
  "Chip",
  "Muffins",
]

const recipeIpsum = new LoremIpsum({
  words: recipeNames,
})

export const builtRecipes = recipeNames.map((name) => {
  let numIngredients = Math.ceil(Math.random() * 10)
  const ingredients = []
  do {
    ingredients.push(createIngredient())
    numIngredients--
  } while (numIngredients > 0)
  return {
    name: `${name} ${recipeIpsum.generateWords(
      Math.ceil(Math.random() * 4) + 2
    )}`,
    instructions: instructionIpsum.generateParagraphs(3),
    ingredients,
  }
})
