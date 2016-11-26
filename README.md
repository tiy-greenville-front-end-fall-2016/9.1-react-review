## 9 1 review


User.objectId

Recipe.user -> User.objectId
(Pointer to the User class)

1) When we save the Recipe we need to set the pointer
Recipe.user needs to be filled with the correct objectId

This is done by setting the Recipe.user to a Parse Pointer Object:

```js
{'__type': 'Pointer', className: '_User', objectId: 'dkjlj3930u4jfd'}
```

2) Getting Recipes by a particular user.

This is done with a query string on the url of the endpoint:

https://tiny-parse-server.herokuapp.com/classes/Recipe/?where={'user': {'__type': 'Pointer', className: '_User', objectId: 'dkjlj3930u4jfd'}}
