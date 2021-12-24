import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { HomeWrapper } from "./styles"
import Input from "@material-ui/core/Input"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Divider from "@material-ui/core/Divider"
import Button from "@material-ui/core/Button"
import LinearProgress from "@material-ui/core/LinearProgress"
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import * as actions from "../../actions"
import Recipe from "../Recipe"

const ingredientList = ["flour", "sugar", "salt", "butter", "milk"]

class Home extends Component {
  constructor(props) {
    super(props)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleIngredient = this.handleIngredient.bind(this)
    this.fetchSearch = this.fetchSearch.bind(this)
    this.handleSearchBlur = this.handleSearchBlur.bind(this)

    this.urlSearchParams = new URLSearchParams(window.location.search)
    this.state = {
      //term: this.urlSearchParams.get('term') || "",
      //ingredients: this.urlSearchParams.get('ingredient') || ["milk"],
      term: "",
      ingredients: ["milk"],
    }
  }
  fetchSearch() {
    // TODO: something is missing here for fetching
    this.props.clearRecipe()
    this.props.searchRecipes(this.state.term, this.state.ingredients)
  }
  fetchRecipe(id) {
    this.props.getRecipe(id)
  }
  handleSearch(event) {
    const term = event.target.value
    this.setState({ term })
  }
  handleSearchBlur(event) {
    /*
    TODO:
    Updating window.location.search below causes to call constructor again,
    which reset this.state with term: "".
    Find a way to update url without resetting this.state

    const term = event.target.value

    // Add event.target.value to URLSearchParam term
    // so that the value can survive browser refresh()
    this.urlSearchParams.set('term', term)
    window.location.search = this.urlSearchParams.toString()
    */
  }
  handleIngredient(ingredient, event) {
    const { ingredients } = { ...this.state }
    if (event.target.checked) {
      ingredients.push(ingredient)
      /*
      if (this.urlSearchParams.get('ingredient').indexOf(ingredient) === -1) {
        this.urlSearchParams.append('ingredient', ingredient)
      }
      */
    } else {
      const foundIngredient = ingredients.indexOf(ingredient)
      ingredients.splice(foundIngredient, 1)
      //this.urlSearchParams.delete('ingredient', ingredient)
    }
    this.setState({ ingredients })

    // TODO
    // Add event.target.value to URLSearchParam ingredients
    // so that the values can survive browser refresh()
    //window.location.search = this.urlSearchParams.toString()
  }
  render() {
    const { term, ingredients } = this.state
    const { recipes, isLoading } = this.props
    return (
      <HomeWrapper>
        <Input
          autoFocus={true}
          fullWidth={true}
          onChange={this.handleSearch}
          onBlur={this.handleSearchBlur}
          value={term}
        />
        <div>
          <h3>Ingredients on hand</h3>
          {ingredientList.map((ingredient) => (
            <FormControlLabel
              key={ingredient}
              control={
                <Checkbox
                  checked={ingredients.includes(ingredient)}
                  onChange={this.handleIngredient.bind(this, ingredient)}
                  value={ingredient}
                />
              }
              label={ingredient}
            />
          ))}
        </div>
        <Button onClick={this.fetchSearch}>search</Button>
        <Divider />
        {recipes && (
          <List>
            {recipes.map((recipe) => (
              <ListItem key={recipe.id}>
                <Link href="#" onClick={() => this.fetchRecipe(recipe.id)}>
                  <ListItemText primary={recipe.name} />
                </Link>&nbsp;
                (

                  {/*
                  TODO: Make route work with /recipe/:recipeId.
                  Currently, it only works with /:recipeId
                  <Link href={`/recipe/${recipe.id}`}>
                    Visit Page
                  </Link>
                  */}
                  <Link href={`/${recipe.id}`}>
                    Visit Page
                  </Link>
                )
              </ListItem>
            ))}
          </List>
        )}
        {isLoading && <LinearProgress />}
        <Divider />
        {/*
          TODO: Add a recipe component here.
          I'm expecting you to have it return null or a component based on the redux state, not passing any props from here
          I want to see how you wire up a component with connect and build actions.
        */}
        <Recipe />
      </HomeWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  const { search } = state
  return { ...search }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      searchRecipes: actions.searchRecipes,
      getRecipe: actions.getRecipe,
      clearRecipe: actions.clearRecipe,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Home)
