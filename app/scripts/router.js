var Backbone = require('backbone');
var React = require('react');
var ReactDOM = require('react-dom');

var setupParse = require('./parseUtilities').setupParse;
var AdjustRecipeContainer = require('./components/adjustRecipe.jsx').AdjustRecipeContainer;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index'
  },
  initialize: function(){
    setupParse('tiygvl', 'slumber');
  },
  index: function(){
    ReactDOM.render(
      React.createElement(AdjustRecipeContainer),
      document.getElementById('app')
    );
  }
});

var router = new AppRouter();

module.exports = router;
