import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter, useParams, Route, Routes } from 'react-router-dom';
import thunkMiddleware from "redux-thunk"
import { createStore, applyMiddleware } from "redux"
//import { hot } from "react-hot-loader"
import Home from "./Containers/Home"
import Recipe from "./Containers/Recipe"
import reducers from "./reducers"

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

const WrappedRecipe = (props) => {
  // Pass URL params as props to component Recipe
  // https://stackoverflow.com/questions/69967745/react-router-v6-access-a-url-parameter
  const params = useParams()
  return (
    <Recipe {...props} params={params} />
  )
}

const WrappedApp = (props) => {
  // TODO: useSearchParams to save values across refresh
  // https://reactrouterdotcom.fly.dev/docs/en/v6/getting-started/tutorial#search-params

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route exact path="/:recipeId" element={<WrappedRecipe />} />
    
          <Route
            path="*"
            element={
              <main style={{ padding: '1rem' }}>
                <p>No route match</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}



//const HotApp = hot(module)(WrappedApp)

ReactDOM.render(
  <WrappedApp />, 
  document.getElementById("home"))
