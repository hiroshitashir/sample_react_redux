// TODO Create a connected component to render a fetched recipe
import React, { Component } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { RecipeWrapper } from "./styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import LinearProgress from "@material-ui/core/LinearProgress"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Typography from "@material-ui/core/Typography"
import * as actions from "../../actions"


class Recipe extends Component {
  constructor(props) {
    super(props)

    if (props && props.params && props.params.recipeId) {
      this.props.getRecipe(props.params.recipeId)
    }
  }

  render() {
    /*
    TODO: Get URL param recipeId and call this.props.getRecipe(recipeId).

    const { recipeId } = this.props.match.params;
    const search = this.props.location.search;
    const recipeId = new URLSearchParams(search).get("recipeId");
    this.props.getRecipe(recipeId)
    */

    const { recipe, isLoading } = this.props
    return (
      <RecipeWrapper>
        {recipe && (
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {recipe.name}
              </Typography>
              <List>
                {recipe.ingredients.map((ingredient) => (
                  <ListItem key={ingredient.id}>
                    <ListItemText primary={ingredient} />
                  </ListItem>
                ))}
              </List>
              <Typography variant="body2">
                {recipe.instructions}
              </Typography>
            </CardContent>
          </Card>
        )}
        {isLoading && <LinearProgress />}
      </RecipeWrapper>
    )
  }
}

const mapStateToProps = (state, ownProps = {}) => {
  const { recipe } = state
  return { ...recipe, ...ownProps }
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

export default connect(mapStateToProps, mapDispatchToProps)(Recipe)
