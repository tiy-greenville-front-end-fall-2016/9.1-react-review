var React = require('react');
var Backbone = require('backbone');

var models = require('../models/recipe');
var BaseLayout = require('./templates/base.jsx');

var IngredientForm = React.createClass({
    getInitialState: function(){
      return this.props.ingredient.toJSON();
      // {
      //   name: this.props.ingredient.get('name'),
      //   units: this.props.ingredient.get('units'),
      //   amount: this.props.ingredient.get('amount')
      // };

    },

    componentWillReceiveProps: function(newProps){
      this.setState(newProps.ingredient.toJSON());
    },

    handleInputChange: function(e){
      var ingredientField = e.target;


      var newState = {};
      newState[ingredientField.name] = ingredientField.value; // {'amount': 24}
      this.setState(newState);

      this.props.ingredient.set(ingredientField.name, ingredientField.value);
    },
    render: function(){
      return (
        <div>
          <div className="form-group">
            <label className="sr-only" htmlFor="ingredient-amount">Amount</label>
            <input onChange={this.handleInputChange} type="text" className="form-control" name="amount" id="ingredient-amount" placeholder="Amount" value={this.state.amount} />
          </div>
          <div className="form-group">
            <label className="sr-only" htmlFor="ingredient-units">Units</label>
            <input onChange={this.handleInputChange} type="text" className="form-control" name="units" id="ingredient-units" placeholder="Units" value={this.state.units} />
          </div>
          <div className="form-group">
            <label className="sr-only" htmlFor="ingredient-name">Name</label>
            <input onChange={this.handleInputChange} type="text" className="form-control" name="name" id="ingredient-name" placeholder="Name" value={this.state.name} />
          </div>
        </div>
      )
    }
});

var Form = React.createClass({
  getInitialState: function(){
    return this.props.recipe.toJSON();
  },

  componentWillReceiveProps: function(newProps){
    this.setState(newProps.recipe.toJSON());
  },

  handleInputChange: function(e){
    var target = e.target;

    var newState = {};
    newState[target.name] = target.value;

    this.setState(newState);
  },

  handleSubmit: function(e){
    e.preventDefault();
    this.props.saveRecipe(this.state);
  },

  render: function(){
    var recipe = this.props.recipe;
    var heading = recipe.isNew() ? 'Add' : 'Edit';

    var ingredientFormset = recipe.get('ingredients').map(function(ingredient){
      return (
        <IngredientForm key={ingredient.cid} ingredient={ingredient}/>
      )
    });

    return (
      <form onSubmit={this.handleSubmit}>
        <h1>{heading} Recipe</h1>

        <div className="form-group">
          <label htmlFor="name">Recipe Name</label>
          <input onChange={this.handleInputChange} type="text" className="form-control" name="name" id="name" placeholder="Name" value={this.state.name} />
        </div>

        <div className="form-group">
          <label htmlFor="servings">Servings</label>
          <input onChange={this.handleInputChange} type="text" className="form-control" name="servings" id="servings" placeholder="Servings" value={this.state.servings} />
        </div>

        <h2>Ingredients <button type="button" onClick={this.props.addIngredient} className="pull-right btn btn-success">Add Ingredient</button></h2>

        <div className="form-inline">
            {ingredientFormset}
        </div>

        <button type="submit" className="btn btn-default">Save Recipe</button>
      </form>
    );
  }
});

var RecipeAddEditContainer = React.createClass({
  getInitialState: function(){
    return {
      recipe: new models.Recipe()
    };
  },

  componentWillMount: function(){
    this.getRecipe();
  },

  componentWillReceiveProps: function(){
    this.getRecipe();
  },

  getRecipe: function(){
    var recipe = this.state.recipe,
    recipeId = this.props.recipeId;

    // If we're not doing an edit, bail
    if(!recipeId){
      return;
    }

    recipe.set('objectId', recipeId);
    recipe.fetch().then(() => {
      this.setState({recipe: recipe});
    });
  },

  addIngredient: function(){
    var recipe = this.state.recipe;
    var ingredients = recipe.get('ingredients');

    ingredients.add([{}]);

    this.setState({recipe: recipe});
  },

  saveRecipe: function(recipeData){
    var recipe = this.state.recipe;

    // take current recipe state and set it to model
    recipe.set(recipeData);

    recipe.save().then(() => {
      Backbone.history.navigate('recipes/' + recipe.get('objectId') + '/', {trigger: true});
    });
  },

  render: function(){
    return (
      <BaseLayout>
        <Form recipe={this.state.recipe} saveRecipe={this.saveRecipe} addIngredient={this.addIngredient}/>
      </BaseLayout>
    )
  }
});


module.exports = {
  RecipeAddEditContainer: RecipeAddEditContainer
};


/*
// Get Initial State
var ingredients = new IngredientCollection();
var recipe = new Recipe();

// Input Event Handlers
recipe.set('name', 'Pudding');
recipe.set('user', {"__type":"Pointer","className":"User","objectId": user.get('objectId')});
ingredients.add({amount: 1, units: 'cups', name: 'milk'});

recipe.save().then(function(){
  ingredients.each(function(ingredient){
    ingredient.set('recipe', {"__type":"Pointer","className":"Recipe","objectId":recipe.get('objectId')});
    ingredient.save();
  });
});


var user = User.current();

recipe.set('user', {"__type":"Pointer","className":"User","objectId": user.get('objectId')})
recipe.save()
*/
