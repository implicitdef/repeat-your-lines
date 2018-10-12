import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { reducer } from './module';
import * as thunks from './thunks';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

store.dispatch(thunks.init());

window.addEventListener('keyup', function(e) {
  if (e.key === ' ') {
    store.dispatch(thunks.onHumanPlayed());
    e.preventDefault();
  }
});

export default store;
