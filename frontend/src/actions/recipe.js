/* TODO: create recipe fetch actions, creators, and constants
  API: use /api/recipe/:id as a get request to fetch the recipe info
*/
export const GET_RECIPE = "GET_RECIPE"
export const RECEIVE_RECIPE = "RECEIVE_RECIPE"
export const FAIL_RECIPE = "FAIL_RECIPE"

const fetchingRecipe = () => ({
  type: GET_RECIPE,
})

const fetchedRecipe = (payload) => ({
  type: RECEIVE_RECIPE,
  payload,
})

const failedRecipe = (payload) => ({
  type: FAIL_RECIPE,
  payload,
})

export const executeRecipe = async (id) => {
  const response = await fetch(`/api/recipe/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
  const searchResults = await response.json()
  return searchResults
}

export const getRecipe = (id) => {
  return (dispatch) => {
    dispatch(fetchingRecipe())
    return executeRecipe(id)
      .then((res) => dispatch(fetchedRecipe(res)))
      .catch((err) => dispatch(failedRecipe(err)))
  }
}

export const clearRecipe = () => {
  return (dispatch) => {
    return dispatch(fetchedRecipe(null))
  }
}
