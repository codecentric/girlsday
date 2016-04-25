import store from "./store/store";
import * as React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {App} from "./components/App";
import * as moment from "moment";
import {ActionType} from "./store/actionType";
import {createTickAction, createStopAction, createStartAction} from "./store/actionCreators";
import Person from "./types/person";

store.subscribe(() => {
  let state = store.getState();

  let numberOfOpenActions = Person.getNumberOfOpenTasks(state);

  if (numberOfOpenActions > 0) {

    switch (state.get('lastAction')) {
      case ActionType.RESET:
      {
        break;
      }
      case ActionType.TICK:
      {
        store.dispatch(createStopAction());
        break;
      }
      case ActionType.STOP_ACTION:
      {
        store.dispatch(createStartAction());
        break;
      }
      case ActionType.START_ACTION:
      {
        setTimeout(() => {
          store.dispatch(createTickAction(1));
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
