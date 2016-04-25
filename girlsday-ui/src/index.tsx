import store, {Person} from "./store";
import * as React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {App} from "./components/App";
import * as moment from "moment";

store.subscribe(() => {
  let state = store.getState();

  let numberOfOpenActions = state.get('persons')
    .map((person:Person) => {
      return person.tasks.size;
    })
    .reduce((a:number, b:number) => {
      return a + b;
    }, 0);

  if (numberOfOpenActions > 0) {

    switch (state.get('lastAction')) {
      case 'RESET':
      {
        break;
      }
      case 'TICK':
      {
        store.dispatch({type: 'STOP_ACTIONS'});
        break;
      }
      case 'STOP_ACTIONS':
      {
        store.dispatch({type: 'START_ACTIONS'});
        break;
      }
      case 'START_ACTIONS':
      {
        setTimeout(() => {
          store.dispatch({type: 'TICK', time: 1});
        }, 200);
        break;
      }
    }
  } else {
    console.log(`${moment(state.get('time')).format('HH:mm')}: all done`);
  }
});


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
