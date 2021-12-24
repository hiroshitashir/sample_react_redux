import { RecipeModel, Ingredient } from "../models"
import { Request, Response } from "express"

const allIngredients = ["flour", "sugar", "salt", "butter", "milk"]

const escapeRegex = (text): string => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}

interface Query {
  name?: RegExp
  ingredients?: Ingredient[]
}

const recipeCleaner = (recipe): { id: string; name: string } => {
  const { id, name } = recipe
  return { id, name }
}

export const searchMiddleware = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, ingredients } = req.body
  const query: Query = {}
  if (name) {
    query.name = new RegExp(escapeRegex(name), "gi")
  }
  if (ingredients) {
    const whatsLeft = allIngredients.filter((ing) => !ingredients.includes(ing))
    query["ingredients.name"] = { $nin: whatsLeft }
  }
  const foundRecipes = await RecipeModel.find(query)
  const builtRecipes = foundRecipes.map(recipeCleaner)
  res.send(builtRecipes)
}
