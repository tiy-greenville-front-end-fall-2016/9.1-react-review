var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var setupParse = require('./parseUtilities').setupParse;
var RecipeAddEditContainer = require('./components/recipeForm.jsx').RecipeAddEditContainer;
var RecipeListContainer = require('./components/recipeList.jsx').RecipeListContainer;
var RecipeDetailContainer = require('./components/recipeDetail.jsx').RecipeDetailContainer;


var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'recipes/add/': 'recipeAddEdit',
    'recipes/:id/edit/': 'recipeAddEdit',
    'recipes/:id/': 'recipeDetail',
    'recipes/': 'recipeList',
  },

  initialize: function(){
    setupParse('tiygvl', 'slumber');
  },

  index: function(){
    ReactDOM.render(
      React.createElement(AdjustRecipeContainer),
      document.getElementById('app')
    );
  },

  recipeAddEdit: function(recipeId){
    ReactDOM.render(
      React.createElement(RecipeAddEditContainer, {recipeId: recipeId}),
      document.getElementById('app')
    );
  },

  recipeDetail: function(recipeId){
    ReactDOM.render(
      React.createElement(RecipeDetailContainer, {recipeId: recipeId}),
      document.getElementById('app')
    );
  },

  recipeList: function(){
    ReactDOM.render(
      React.createElement(RecipeListContainer),
      document.getElementById('app')
    );
  },
});

var router = new AppRouter();

module.exports = router;
