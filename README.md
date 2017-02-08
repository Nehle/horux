# higher-order-reducers

A simple utility belt library for building and composing redux reducers using higher order functions.

## installation

From command line, call `yarn add higher-order-reducers` or `npm install --save higher-order-reducers`

## motivation

This project has sprung from the work I've done with redux and more and more complex reducers, where
I've noticed a lot of boilerplate simple repeating itself. Despite the clean and simple philosophies
of redux, I often ran into code like

```js
const someReducer = (state = DEFAULT_STATE, action) {
  switch(action.type) {
    case TYPE1:
    case TYPE2:
      // Some specific logic here
    case TYPE3:
      // other logic
    default:
      return state;
  }
}
```
Sometimes with so many `case` calls that `eslint` would complain about the complexity of the "simple"
reducer.

So, inspired by how `recompose` uses higher-level-components to elegantly compose react components,
I started experimenting with trying to extract some functional patterns from the above code. The result
is the groundwork of this library. In the specific case above, it would be rewritten as

```js
import { chain, always, withDefault, filterByType, mapByType } from "higher-order-reducers";
const someReducer = chain([
    always(withDefault(DEFAULT_STATE)),
    filterByType([TYPE1, TYPE2, TYPE3]),
    always(clone),
    mapByType({
      TYPE1: () => {},
      TYPE2: () => {},
      TYPE3: () => {}
    })
]);
```

Is that better? I'm not sure. I think it's prettier, but it might be slower. Regardless I felt that
this was a fun project to share with the world, if anybody cares. I will probably continue to code
like this until somebody proves to me that it's objectively worse than the alternative.

## functions

### `withDefault(defaultState)`
Returns a reducer that returns the supplied `defaultState` if the `state` it's supplied is `undefined`

```js
import {withDefault} from "higher-order-reducers";
const reducer = withDefault(2);
reducer(); //2
reducer(1); //1
```

### `clone`
Simply returns a clone of the supplied state by calling `JSON.stringify` and then `JSON.parse` on the
result

### `mapByType(reducerMap)`
Return a reducer that maps action types to specific reducer functions, and returns the result
(or the original state if the map does not contain the key)

```js
import { mapByType } from "higher-order-reducers";
const reducer = mapByType({
  'ACTION_ONE': (state, action) => action.value,
  'ACTION_TWO': () => 2
});
reducer('', {type: 'ACTION_ONE', value: 'hello'}); //'hello'
reducer('', {type: 'ACTION_TWO'}); //2
reducer('state', {type: 'ACTION_THREE'}) //'state'
```

### `merge(reducer)`
Merges the keys returned by the reducer into the current state instead of replacing it entirely

```js
const animal = (state, action) => {noise: action.noise, feet: action.feet};
const reducer = merge(animal);
reducer({name: "duck", noise: "quack"}, {noise: "moo", feet: 4}); //{name: "duck", noise: "moo", feet: 4}
```

### `compose(reducers)`
Creates a reducer that generates the state by calling the supplied reducers in order, with the output of the previous reducer as the input for the next, without changing the action.

```js
import { compose } from "higher-order-reducers";
const add = (state, action) => state + action.value;
const reducer = compose([
  add,
  add,
  add
]);
reducer(1, {value: 2}) //7
```

### `chain(reducers)`
Creates a reducer that starts calling the supplied reducer with the supplied state and action, but an additional `next` parameter, that, when called, will call the next reducer in order with the supplied state and the original action. If `next` is not called by a reducer, the chain will stop.

```js
import { chain } from "higher-order-reducers";
const addAndContinue = (state, action, next) => next(state + action.value);
const stop = (state) => state;
const reducer = chain([
  addAndContinue,
  addAndContinue,
  stop, //next is not called here, chain will stop
  addAndContinue
]);
reducer(1, {value: 2}) //5
```

### `always(reducer)`
Meant to be used with `chain`, simply converts the reducer to chainable by always calling `next` with its result.

```js
import { chain, always } from "higher-order-reducers";
const add = (state, action) => state + action.value;
const reducer = compose([
  always(add),
  always(add),
  always(add)
]);
reducer(1, {value: 2}) //7
```

### `filter(predicate)`
Meant to be used with `chain`. Creates a reducer that will only call `next` if the supplied predicate (called with `state` and `action`) returns truthy. Otherwise stops the chain with the value it was supplied.

```js
import { chain, filter } from "higher-order-reducers";
const add = (state, action) => state + action.value;
const onlyIfEven = filter(state, action) => (action.value % 2 === 0);

const reducer = chain([
  onlyIfEven,
  add
]);

reducer(1, {value: 1}) //1
reducer(1, {value: 2}) //3
```

### `filterByType(allowedTypes)`
Meant to by used with `chain`. A special case of the `filter` method that only proceeds if the action `type` field matches a value in the supplied array.

```js
import { chain, filterByType } from "higher-order-reducers";
const add = (state, action) => state + action.value;
const onlyIfAdd = filterByType(["ADD_VALUE"])

const reducer = chain([
  onlyIfAdd,
  add
]);

reducer(1, {value: 1, type: "SUBTRACT_VALUE"}) //1
reducer(1, {value: 2, type: "ADD_VALUE"}) //3
