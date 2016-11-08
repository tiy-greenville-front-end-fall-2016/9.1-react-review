var Backbone = require('backbone');

var ParseModel = Backbone.Model.extend({
  idAttribute: 'objectId',
  save: function(key, val, options){
    delete this.attributes.createdAt;
    delete this.attributes.updatedAt;

    return Backbone.Model.prototype.save.apply(this, arguments);
  }
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

var Ingredient = ParseModel.extend({
  defaults: {
    name: '',
    amount: 0,
    units: '',
  },
});

var IngredientCollection = ParseCollection.extend({
  model: Ingredient,
  baseUrl: 'https://megatron42.herokuapp.com/classes/Ingredient'
});

var Recipe = ParseModel.extend({
  defaults: {
    ingredients: new IngredientCollection()
  },

  urlRoot: 'https://megatron42.herokuapp.com/classes/Recipe',

  save: function(key, val, options){
    // Convert ingredients collection to array for parse
    this.set('ingredients', this.get('ingredients').toJSON());

    return ParseModel.prototype.save.apply(this, arguments);
  },

  parse: function(data){
    // Convert ingredients array from parse to collection
    data.ingredients = new IngredientCollection(data.ingredients);
    return data;
  }
});

var RecipeCollection = ParseCollection.extend({
  model: Recipe,
  url: 'https://megatron42.herokuapp.com/classes/Recipe'
});


module.exports = {
  Recipe: Recipe,
  RecipeCollection: RecipeCollection,
  Ingredient: Ingredient,
  IngredientCollection: IngredientCollection
};
