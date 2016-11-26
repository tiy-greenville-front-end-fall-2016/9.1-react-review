var React = require('react');

var User = require('../models/user').User;
var models = require('../models/recipe');
var BaseLayout = require('./templates/base.jsx');

var ListItem = React.createClass({
  render: function(){
    var recipe = this.props.recipe;
    return (
      <a href={'#recipes/' + recipe.get('objectId') + '/'} className="list-group-item">{recipe.get('name')}</a>
    )
  }
});

var List = React.createClass({
  render: function(){
    var recipeList = this.props.recipes.map(function(recipe){
      return <ListItem key={recipe.cid} recipe={recipe}/>
    });

    return (
      <div className="col-md-9">
        <p className="lead">Recipes</p>
        <div className="list-group">
            {recipeList}
        </div>
      </div>
    )
  }
});

var RecipeListContainer = React.createClass({
  getInitialState: function(){
    return {
      recipeCollection: new models.RecipeCollection()
    };
  },

  componentWillMount: function(){
    var recipeCollection = this.state.recipeCollection;
    //.parseWhere('user', 'User', User.current().get('objectId'))
    recipeCollection.fetch().then(() => {
      this.setState({recipeCollection: recipeCollection});
    });
  },

  render: function(){
    return (
      <BaseLayout>
        <List recipes={this.state.recipeCollection}/>
      </BaseLayout>
    )
  }
});

var MyRecipeListContainer = React.createClass({
  getInitialState: function(){
    return {
      recipeCollection: new models.RecipeCollection()
    };
  },

  componentWillMount: function(){
    var self = this;
    var recipeCollection = new models.RecipeCollection();
    var user = localStorage.getItem('user');
    recipeCollection.objectId = user.objectId;
    recipeCollection.parseWhere('user', '_User', User.current().get('objectId'))

    recipeCollection.fetch().then(function(){
      self.setState({'recipeCollection': recipeCollection});
    });





    // Existing code
    // var recipeCollection = this.state.recipeCollection;
    // var user = User.current();
    //
    // console.log(user);
    //
    // recipeCollection.parseWhere('user', '_User', user.get('objectId')).fetch().then(() => {
    //   this.setState({recipeCollection: recipeCollection});
    // });
  },

  render: function(){
    return (
      <BaseLayout>
        <List recipes={this.state.recipeCollection}/>
      </BaseLayout>
    )
  }
});

module.exports = {
  RecipeListContainer: RecipeListContainer,
  MyRecipeListContainer: MyRecipeListContainer
};
