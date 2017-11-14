# Examples

## Merging results
Using `compose` and `next`, we can let our reducers only return
the keys they have modified, instead of the entire new state.

```javascript
import {compose} from "horux";
import reducer from "./reducer";

const mergeNext = (state, action, next) => Object.assign(state, next(state))
return compose([
  mergeNext,
  reducer
]);
```


## Versioning your state
Let's say you have conflicting actions coming into your state, 
and you want to avoid conflicts by making sure that whenever an 
action fires, they were from the most up-to-date version of the 
state.

To solve this, you could se a `version` property of the state,
and then have the actions supply that version. If the version
check fails, you can simply ignore it. With the`compose`
method, we can actually write this very simply

```javascript
import {linkIf, withDefault, compose} from "horux";
import reducer from "./reducer";

const verifyVersion = linkIf((state, action) => state.version === action.expectedVersion);
const bumpVersion = (state) => {...state, version: state.version + 1};
const defaultState = {version: 0}
return compose([
  withDefault(defaultState),
  verifyVersion,
  reducer,
  bumpVersion
]);
```

## Undoing an action
Let's say we want to have a functionality to undo an action. Again,
since `compose` actually returns data from `next`, we can simply leverage
that to create a new reducer in the chain that has that responsibility.
Here we simply keep track of the state two actions back, and return to that if 
the `undo` action comes in

```javascript
import {compose} from "horux";
import reducer from "./reducer";

const undoable = (state, action, next) = {
  let latestState;
  let undoState;
  if(action.type !== "UNDO_ACTION") {
   undoState = latestState;
   latestState = next(state);
   return latestState;
  }
  return undoState;
}

return compose([
  undoable,
  reducer;
]);
```
