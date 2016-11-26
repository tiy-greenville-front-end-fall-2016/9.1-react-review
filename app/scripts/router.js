var $ = require('jquery');
var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var setParseHeaders = require('./parseUtilities').setParseHeaders;
var RecipeAddEditContainer = require('./components/recipeForm.jsx').RecipeAddEditContainer;
var RecipeListContainer = require('./components/recipeList.jsx').RecipeListContainer;
var MyRecipeListContainer = require('./components/recipeList.jsx').MyRecipeListContainer;
var RecipeDetailContainer = require('./components/recipeDetail.jsx').RecipeDetailContainer;
var LoginContainer = require('./components/accounts.jsx').LoginContainer;


var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'accounts/': 'accounts',
    'recipes/add/': 'recipeAddEdit',
    'recipes/my/': 'myRecipeList',
    'recipes/:id/edit/': 'recipeAddEdit',
    'recipes/:id/': 'recipeDetail',
    'recipes/': 'recipeList',
  },

  initialize: function(){
    $.ajaxSetup({
      beforeSend: function(xhr){
        setParseHeaders(xhr, 'tiygvl', 'slumber');
      }
    });
  },

  index: function(){
    this.navigate('accounts/', {trigger: true});
  },

  accounts: function(){
    /*
     * This is for the login/signup forms
     */
    ReactDOM.render(
      React.createElement(LoginContainer),
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

  myRecipeList: function(){
    ReactDOM.render(
      React.createElement(MyRecipeListContainer),
      document.getElementById('app')
    );
  }
});

var router = new AppRouter();

module.exports = router;
