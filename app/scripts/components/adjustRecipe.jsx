var React = require('react');

var models = require('../models/recipe');

var AdjustmentForm = React.createClass({
  getInitialState: function(){
    return {
      qty: this.props.recipe.get('servings')
    };
  },

  componentWillReceiveProps: function(nextProps){
    this.setState({qty: nextProps.recipe.get('servings')});
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
      <form onSubmit={this.handleSubmit} className="form-inline well">
        <div className="form-group">
          Qty: <input onChange={this.handleQty} type="text" value={this.state.qty} />
          <input type="submit" value="Adjust Qty"/>
        </div>
      </form>
    )
  }
});

var IngredientList = React.createClass({
  render: function(){
    var factor = this.props.factor;

    var ingredientListItems = this.props.ingredients.map(function(ingredient){
      // Format the amount
      var adjustedAmount = ingredient.get('amount') * factor;
      var amount = parseInt(adjustedAmount) === adjustedAmount ? adjustedAmount : adjustedAmount.toFixed(2);

      return (
        <li key={ingredient.cid} className="list-group-item">
          <input type="checkbox" /> {amount} {ingredient.get('units')} {ingredient.get('name')}
        </li>
      )
    });

    return (
      <ul className="list-group">
        {ingredientListItems}
      </ul>
    );
  }
});


var AdjustRecipeContainer = React.createClass({
  getInitialState: function(){
    return {
      factor: 1
    };
  },

  // componentWillReceiveProps: function(nextProps){
  //   this.setState({servings: nextProps.recipe.get('servings')});
  // },

  adjustQtys: function(newServings){
    var recipe = this.props.recipe;
    var newFactor = (newServings / recipe.get('servings')) || 1;

    this.setState({factor: newFactor});
  },

  render: function(){
    var ingredients = this.props.recipe.get('ingredients');

    return (
      <div>
        <AdjustmentForm recipe={this.props.recipe} adjustQtys={this.adjustQtys}/>

        <p className="lead">Ingredients</p>

        <IngredientList factor={this.state.factor} ingredients={ingredients} />
      </div>
    );
  }
});

module.exports = {
  AdjustRecipeContainer: AdjustRecipeContainer
};


// componentWillMount: function(){
//   var self = this;
//   // init recipe list
//   var recipeList = new models.RecipeCollection();
//
//   // fetch data from server
//   recipeList.fetch().then(function(){
//     // get a recipe
//     var cakeRecipe = recipeList.get('ObE210xGzT');
//
//     // Convert ingredients to collection
//     var ingredients = new models.IngredientCollection();
//     ingredients.add(cakeRecipe.get('ingredients'));
//     cakeRecipe.set('ingredients', ingredients);
//
//     this.initialServings = recipe.get('servings')
//     self.setState({recipe: cakeRecipe});
//
//
//   //   // get ingredients for recipe
//   //   var cakeIngredients = new models.IngredientCollection();
//   //   cakeIngredients.parseWhere('recipe', 'Recipe', cakeRecipe.get('objectId')).fetch().then(function(){
//   //     console.log(JSON.stringify(cakeIngredients.toJSON()));
//   //     cakeRecipe.set('ingredients', cakeIngredients);
//   //
//   //     console.log(cakeRecipe);
//   //   });
//   });
// },
