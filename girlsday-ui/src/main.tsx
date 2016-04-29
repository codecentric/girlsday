/// <reference path='../all.d.ts' />

import store from "./store/store";
import * as React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import * as moment from "moment";
import {ActionType} from "./store/actionType";
import {createTickAction, createStopAction, createStartAction} from "./store/actionCreators";
import Person from "./types/person";
import App from "./components/App";
import {config} from "./config/config";


class Main{
  constructor(public store, public config){}

  run(){
    this.store.subscribe(() => {
      let state = this.store.getState();

      let numberOfOpenActions = Person.getNumberOfOpenTasks(state);

      if (numberOfOpenActions > 0) {

        switch (state.get('lastAction')) {
          case ActionType.RESET:
          {
            break;
          }
          case ActionType.TICK:
          {
            this.store.dispatch(createStopAction());
            break;
          }
          case ActionType.STOP_ACTION:
          {
            this.store.dispatch(createStartAction());
            break;
          }
          case ActionType.START_ACTION:
          {
            setTimeout(() => {
              this.store.dispatch(createTickAction(1));
            }, this.config.minuteInMs);
            break;
          }
        }
      } else {
        console.log(`${moment(state.get('time')).format('HH:mm')}: all done`);
      }
    });
  }
}

new Main(store, config).run();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
