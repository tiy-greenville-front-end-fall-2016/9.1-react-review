var React = require('react');

var models = require('../models/recipe');

var AdjustmentForm = React.createClass({
  getInitialState: function(){
    return {
      qty: this.props.qty
    };
  },
  handleQty: function(e){
    this.setState({qty: e.target.value});
    this.props.adjustQtys(e.target.value);
  },
  handleSubmit: function(e){
    e.preventDefault();
    this.props.adjustQtys(this.state.qty);
  },
  render: function(){
    return (
      <form onSubmit={this.handleSubmit}>
        Qty: <input onChange={this.handleQty} type="text" value={this.state.qty} />
        <input type="submit" value="Adjust Qty"/>
      </form>
    )
  }
});

var IngredientList = React.createClass({
  render: function(){
    var factor = this.props.factor;

    var ingredientListItems = this.props.ingredients.map(function(ingredient){
      // var amount = new Fraction(ingredient.get('amount') * factor);
      return (
        <li key={ingredient.cid} className="list-group-item">
          {ingredient.get('amount') * factor} {ingredient.get('units')} {ingredient.get('name')}
        </li>
      )
    });

    return (
      <ul className="list-group">
        {ingredientListItems}
      </ul>
    )
  }
});


var AdjustRecipeContainer = React.createClass({
  getInitialState: function(){
    // var recipe  = new models.Recipe();
    // var ingredients = new models.IngredientCollection();
    //
    // // Hard code some data for testing
    // ingredients.add([
    //   {'name': 'flour', 'units': 'cups', 'amount': 6 },
    //   {'name': 'eggs', 'units': 'large', 'amount': 2 },
    // ]);
    //
    // recipe.set({'name': 'Cake', 'servings': 10});
    // recipe.set('ingredients', ingredients);
    //
    // this.initialServings = recipe.get('servings');

    return {
      factor: 1,
      recipe: new models.Recipe()
    };
  },
  componentWillMount: function(){
    var self = this;
    // init recipe list
    var recipeList = new models.RecipeCollection();

    // fetch data from server
    recipeList.fetch().then(function(){
      // get a recipe
      var cakeRecipe = recipeList.get('ObE210xGzT');

      // Convert ingredients to collection
      var ingredients = new models.IngredientCollection();
      ingredients.add(cakeRecipe.get('ingredients'));
      cakeRecipe.set('ingredients', ingredients);

      this.initialServings = cakeRecipe.get('servings')
      self.setState({recipe: cakeRecipe});


    //   // get ingredients for recipe
    //   var cakeIngredients = new models.IngredientCollection();
    //   cakeIngredients.parseWhere('recipe', 'Recipe', cakeRecipe.get('objectId')).fetch().then(function(){
    //     console.log(JSON.stringify(cakeIngredients.toJSON()));
    //     cakeRecipe.set('ingredients', cakeIngredients);
    //
    //     console.log(cakeRecipe);
    //   });
    });
  },
  adjustQtys: function(newServings){
    var self = this;
    var newFactor = newServings / this.initialServings;

    this.state.recipe.set('servings', newServings);

    this.setState({recipe: this.state.recipe, factor: newFactor});
  },
  render: function(){
    return (
      <div>
        <AdjustmentForm qty={this.state.recipe.get('servings')} adjustQtys={this.adjustQtys}/>
        <IngredientList factor={this.state.factor} ingredients={this.state.recipe.get('ingredients')} />
      </div>
    )
  }
});

module.exports = {
  AdjustRecipeContainer: AdjustRecipeContainer
};
