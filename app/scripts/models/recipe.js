var Backbone = require('backbone');

var ParseModel = Backbone.Model.extend({
  idAttribute: 'objectId',
  save: function(key, val, options){
    delete this.attributes.createdAt;
    delete this.attributes.updatedAt;

    return Backbone.Model.prototype.save.apply(this, arguments);
  },
  setPointer: function(field, className, objectId){
    var pointer = {
      '__type': 'Pointer',
      'className': className,
      'objectId': objectId
    };

    this.set(field, pointer);

    return this;
  }
});

var ParseCollection = Backbone.Collection.extend({
  whereClauses: [],
  parseWhere: function(field, className, objectId){

    this.whereClauses.push({
      field: field,
      className: className,
      objectId: objectId,
      '__type': 'Pointer'
    });

    return this;
  },
  url: function(){
    var url = this.baseUrl;

    if(this.whereClause.length > 0){
      var field = this.whereClause.field;
      delete this.whereClause.field;
      url += '?where={"' + field + '":' + JSON.stringify(this.whereClause) + '}';
      this.whereClauses = [];
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
    servings: 0,
    ingredients: new IngredientCollection()
  },

  // urlRoot: 'https://megatron42.herokuapp.com/classes/Recipe',
  urlRoot: 'https://megatron42.herokuapp.com/classes/RecipeReview',

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

var RecipeCollection = Backbone.Collection.extend({
  model: Recipe,
  url: function(){
    console.log(this.objectId);
    var querystring = '?where={"user": ' +
                      '{"__type": "Pointer", "className": "_User", "objectId": "' +
                      this.objectId + '"}}';
    return 'https://megatron42.herokuapp.com/classes/RecipeReview/' + querystring;
  }
});


module.exports = {
  Recipe: Recipe,
  RecipeCollection: RecipeCollection,
  Ingredient: Ingredient,
  IngredientCollection: IngredientCollection
};
