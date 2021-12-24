/*
  TODO: Create reducer and state updates here for recipe
*/
import { GET_RECIPE, RECEIVE_RECIPE, FAIL_RECIPE } from "../actions"

const initialState = {
  recipe: null,
  isLoading: false,
  error: null,
}

const recipeFetching = (state) => {
  return { ...state, isLoading: true }
}

const recipeFetched = (state, payload) => {
  return { ...state, isLoading: false, recipe: payload }
}

const recipeFailed = (state, payload) => {
  return { ...state, isLoading: false, error: payload }
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_RECIPE:
      return recipeFetching()
    case RECEIVE_RECIPE:
      return recipeFetched(state, payload)
    case FAIL_RECIPE:
      return recipeFailed(state, payload)
    default:
      return state
  }
}
