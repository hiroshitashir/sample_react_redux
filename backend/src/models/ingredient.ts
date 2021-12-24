import { Schema } from "mongoose"

export interface Ingredient {
  name: string
  unit: string
  amount: number
}

export const IngredientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
})
