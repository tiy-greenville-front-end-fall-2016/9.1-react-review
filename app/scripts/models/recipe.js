var Backbone = require('backbone');

var ParseModel = Backbone.Model.extend({
  idAttribute: 'objectId'
});

var ParseCollection = Backbone.Collection.extend({
  whereClause: {field: '', className: '', objectId: ''},
  parseWhere: function(field, className, objectId){
    this.whereClause = {
      field: field,
      className: className,
      objectId: objectId,
      '__type': 'Pointer'
    };

    return this;
  },
  url: function(){
    var url = this.baseUrl;

    if(this.whereClause.field){
      var field = this.whereClause.field;
      delete this.whereClause.field;
      url += '?where={"' + field + '":' + JSON.stringify(this.whereClause) + '}';
    }

    return url;
  },
  parse: function(data){
    return data.results;
  }
});

var Recipe = ParseModel.extend({
  defaults: {
    ingredients: []
  }
});

var RecipeCollection = ParseCollection.extend({
  model: Recipe,
  url: 'https://megatron42.herokuapp.com/classes/Recipe'
});

var Ingredient = ParseModel.extend({

});

var IngredientCollection = ParseCollection.extend({
  model: Ingredient,
  baseUrl: 'https://megatron42.herokuapp.com/classes/Ingredient'
});

module.exports = {
  Recipe: Recipe,
  RecipeCollection: RecipeCollection,
  Ingredient: Ingredient,
  IngredientCollection: IngredientCollection
};
