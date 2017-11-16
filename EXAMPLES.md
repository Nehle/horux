# examples

## merging
Using `compose` and `next`, we can let our reducers only return the keys they
have modified, instead of the entire new state.

```javascript
import {compose} from "horux";
import reducer from "./reducer";

const mergeNext = (state, action, next) => Object.assign(state, next(state))
return compose([
  mergeNext,
  reducer
]);
```


## versioning
In this scenario, we might have several async actions being fired
near-simultaneously. Using two extra reducers in the compose chain, we can
maintain a `version` property of the state, and reject any actions that aren't
being fired from an up-to-date state.

```javascript
import {filter, withDefault, compose} from "horux";
import reducer from "./reducer";

const verifyVersion = filter((state, action) => state.version === action.expectedVersion);
const bumpVersion = (state) => {...state, version: state.version + 1};
const defaultState = {version: 0}

return compose([
  withDefault(defaultState),
  verifyVersion,
  reducer,
  bumpVersion
]);
```

## undoing
Using `compose`, we can create a proxy reducer that saves the state, and simply
returns to an older state if the `UNDO_ACTION` is supplied

```javascript
import {compose} from "horux";
import reducer from "./reducer";

const undoable = (state, action, next) = {
  let latestState;
  let undoState;
  if(action.type === "UNDO_ACTION") {
   return undoState;
  }
  undoState = latestState;
  latestState = next(state);
  return latestState;
}

return compose([
  undoable,
  reducer;
]);
```
