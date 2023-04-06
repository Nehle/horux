# horux

Horux (**h**igher **or**der red**ux**) is a simple utility belt library for building and composing redux reducers using higher order functions.

for examples, see [EXAMPLES.md](EXAMPLES.md)

## installation

From command line, call `yarn add horux` or `npm install --save horux`

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
import { compose, withDefault, cloneState, mapByType } from "horux";
const someReducer = compose([
    withDefault(DEFAULT_STATE)),
    cloneState,
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


### `compose(reducers)`
Creates a reducer that generates the state by calling the supplied reducers in order, with the output of the previous reducer as the input for the next, without changing the action. You can also accept a reference to the next reducer as a third `next` parameter. If accepted, `compose` will not automatically continue, instead you have to manually continue the chain by calling `next(nextState)` to call the next reducer with the new state and the original action.

```js
import { compose } from "horux";
const add = (state, action) => state + action.value;
const addAndContinue = (state, action, next) => next(state + action.value);
const stop = (state, action, next) => state;
const reducer = compose([
  add, // This reducer does not care for `next`, so compose continues
  addAndContinue, // This reducer explicitly calls `next`, so compose continues
  stop, // This reducer takes `next`, but doesn't call it, so the composition stops here
  add // Never called
]);
reducer(1, {value: 2}) //5
```

### `withDefault(defaultState)`
Returns a reducer that returns the supplied `defaultState` if the `state` it's supplied is `undefined`

```js
import { withDefault } from "horux";
const reducer = withDefault(2);
reducer(); //2
reducer(1); //1
```

### `cloneState`
Returns a deep clone of the supplied state. It is literally just an alias for
`JSON.parse(JSON.stringify(state))`, which is by far the fastest way to perform that operation.
However, it only works with plain objects (and arrays of them), and does not work with object instances,
functions, regexes et cetera. If something like that is required, consider either implementing your own
clone function that is built to clone your specific state as quickly as possible, or use something
like `lodash.cloneDeep`, but be aware of the performance implications

### `mapByType(reducerMap)`
Return a reducer that maps action types to specific reducer functions, and returns the result
(or the original state if the map does not contain the key)

```js
import { mapByType } from "horux";
const reducer = mapByType({
  'ACTION_ONE': (state, action) => action.value,
  'ACTION_TWO': () => 2
});
reducer('', {type: 'ACTION_ONE', value: 'hello'}); //'hello'
reducer('', {type: 'ACTION_TWO'}); //2
reducer('state', {type: 'ACTION_THREE'}) //'state'
```

### `mergeStates(reducer)`
Merges the keys returned by the reducer into the current state instead of replacing it entirely

```js
import { mergeStates } from "horux";
const animal = (state, action) => {noise: action.noise, feet: action.feet};
const reducer = mergeStates(animal);
reducer({name: "duck", noise: "quack"}, {noise: "moo", feet: 4}); //{name: "duck", noise: "moo", feet: 4}
```

### `nextIf(predicate)`

Meant to be used with `compose`. Creates a reducer that will only call `next` if the supplied predicate (called with `state` and `action`) returns truthy. Otherwise stops the chain with the value it was supplied.

```js
import { compose, nextIf } from "horux";
const add = (state, action) => state + action.value;
const onlyIfEven = nextIf(state, action) => (action.value % 2 === 0);

const reducer = compose([
  onlyIfEven,
  add
]);

reducer(1, {value: 1}) //1
reducer(1, {value: 2}) //3
```

### `nextIfIfType(allowedTypes)`

Meant to by used with `compose`. A special case of the `nextIf` method that only proceeds if the action `type` field matches a value in the supplied array.

```js
import { compose, nextIfType } from "horux";
const add = (state, action) => state + action.value;
const onlyIfAdd = nextIfType(["ADD_VALUE"])

const reducer = compose([
  onlyIfAdd,
  add
]);

reducer(1, {value: 1, type: "SUBTRACT_VALUE"}) //1
reducer(1, {value: 2, type: "ADD_VALUE"}) //3
```

## license
See [LICENSE.md](./LICENSE.md)
