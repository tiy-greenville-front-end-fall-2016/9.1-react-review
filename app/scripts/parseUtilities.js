var $ = require('jquery');
var Backbone = require('backbone');


function setParseHeaders(xhr, appId, apiKey){
  xhr.setRequestHeader("X-Parse-Application-Id", appId);
  xhr.setRequestHeader("X-Parse-REST-API-Key", apiKey);
}

var ParseUser = Backbone.Model.extend({
  auth: function(){
    var sessionId = this.sessionToken;

    $.ajaxSetup({
      beforeSend: function(xhr){
        setParseHeaders(xhr, 'tiygvl', 'slumber'); // DO NOT DO THIS

        if(sessionId){
          xhr.setRequestHeader("X-Parse-Session-Token", sessionId);
        }
      }
    });
  },

}, {
  login: function(username, password, callbackObj){
    //callbackObj.success and callbackObj.error
    $.post('/login/', {username: username, password: password}).then(function(response){
      var user = new User(response);
      user.auth();
      localStorage.setItem('user', JSON.stringify(user.toJSON()));
      callbackObj.success(user, response);
    });
  },
  signUp: function(username, password, callback){
    //callbackObj.success and callbackObj.error
    var user = new User({username: username, password: password});
    user.save().then(function(){
      user.auth();
      localStorage.setItem('user', JSON.stringify(user.toJSON()));
      callback(user);
    });
  },
  current: function(){
    var userData = localStorage.getItem('user');

    if(!userData || !JSON.parse(userData).token){
      return undefined;
    }

    return new User(JSON.parse(userData));
  }
});

module.exports = {
  ParseUser: ParseUser,
  setParseHeaders: setParseHeaders
};
