import { RecipeModel } from "../models"
import { Request, Response, NextFunction } from "express"

interface Query {
  _id: string
}

const recipeCleaner = (recipe): { name: string; instructions: string; ingredients: string[] } => {
  const { name, instructions, ingredients } = recipe
  const ingredientsInStr: string[] = ingredients.map(eachIng => `${eachIng.amount} ${eachIng.unit} ${eachIng.name}`)
  return { name, instructions, ingredients: ingredientsInStr }
}

export const recipeMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // TODO fetch and return a recipe
  const recipeId: string = req.params.id
  const query: Query = {
    _id: recipeId
  }
  const foundRecipe = await RecipeModel.findOne(query)
  res.send(recipeCleaner(foundRecipe))
}
