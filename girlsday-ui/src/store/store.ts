/// <reference path="../../typings/main.d.ts" />

import * as React from "react";
import {List} from "immutable";
import {createStore} from "redux";
import * as moment from "moment";
import {initialState} from "../config/initialState";
import {persons} from "../config/persons";
import Person from "../types/person";
import {Task} from "../types/task";
import {ActionType} from "./actionType";

let reset = (state) => {
  return state.set('persons', persons)
    .set('lastAction', ActionType.RESET);
};

let tickAction = (state, action) => {
  let time = state.get('time');

  // get time and add 'action.time' minutes to it
  let newTime = moment(time).add('m', action.time).toDate();

  return state.set('time', newTime).set('lastAction', ActionType.TICK);
};

let stopAction = (state, action) => {
  // stop all actions that are running and should end now
  let time = state.get('time');
  let persons:List<Person> = <List<Person>>state.get('persons');

  let allowedTasksTypes = persons.map((person:Person) => {
    return person.tasks.filter((task:Task) => {
      return task.running === true && time >= task.endTime;
    }).toArray()
  }).toArray()
    .reduce((a, b) => {
      return a.concat(b);
    }, []).map((task:Task) => {
      return task.allows
    });

  let blockedTasks = <List<string>>state.get('blockedTasks');

  let updatedBlockedTasks = blockedTasks.filter((task:string) => {
    return allowedTasksTypes.indexOf(task) < 0;
  }).toList();

  let updatedPersons:List<Person> = persons.map((person:Person) => {
    let tasksThatShouldNotEnd = person.tasks.filter((task:Task) => {
      return !(task.running === true && time >= task.endTime);
    });

    return new Person(person.name, tasksThatShouldNotEnd.toList());
  }).toList();

  return state.set('lastAction', ActionType.STOP_ACTION)
    .set('blockedTasks', updatedBlockedTasks)
    .set('persons', updatedPersons);
};

let startAction = (state, action) => {
  // start all actions that are running and should end nowstate.set('lastAction', ActionType.START_ACTION);

  let time = state.get('time');
  let persons:List<Person> = <List<Person>>state.get('persons');


  let allRunningTasks:Array<String> = persons.map((person:Person) => {
    return person.tasks.filter((task:Task) => {
      return task.running === true;
    }).toArray()
  }).toArray()
    .reduce((a, b) => {
      return a.concat(b);
    }, []).map((task:Task) => {
      return task.type
    });

  // get persons with no running task
  persons.forEach((person:Person) => {
    let runningTasks = person.tasks.filter((task:Task) => {
      return task.running === true;
    });

    if (runningTasks.size === 0) {
      // get first task that is not running and should start now (or is overdue)
      if (person.tasks.size > 0) {
        let nextAction = person.tasks.get(0);

        // check that nextAction is not blocked

        let blockedTasks = <List<string>>state.get('blockedTasks');
        let parallelTasks = <List<string>>state.get('parallelTasks');

        if (blockedTasks.indexOf(nextAction.type) < 0) {

          if (parallelTasks.indexOf(nextAction.type) > -1
            || allRunningTasks.indexOf(nextAction.type) < 0) {

            console.log(`${moment(time).format('HH:mm')}: ${person.name}  starts ${nextAction.type}.This takes: ${moment(nextAction.time)} minutes.`);

            // update endTime and set task to running
            nextAction.endTime = moment(state.get('time')).add('m', nextAction.time).toDate();
            nextAction.running = true;

            allRunningTasks.push(nextAction.type);
          }
        }
      }
    }
  });
  return state.set('lastAction', ActionType.START_ACTION)
    .set('persons', persons);
};

let updateList = (state, action) => {
  let newPerson = new Person(action.person.name, action.tasks);

  let personList = <List<Person>>state.get('persons');

  let updatedPersonList:List<Person> = personList.update(
    personList.findIndex((person:Person) => {
      return person.name === action.person.name;
    }), (person:Person) => {
      return newPerson;
    });

  return state.set('lastAction', ActionType.UPDATE_LIST)
    .set('persons', updatedPersonList);
};

let reducer = (state = initialState, action:any) => {
  switch (action.type) {
    case ActionType.RESET:
    {
      return reset(state);
    }
    case ActionType.TICK:
    {
      return tickAction(state, action);
    }
    case ActionType.STOP_ACTION:
    {
      return stopAction(state, action);
    }
    case ActionType.START_ACTION:
    {
      return startAction(state, action);
    }
    case ActionType.UPDATE_LIST:
    {
      return updateList(state, action);
    }
    default:
      return state;
  }
};


let store = createStore(reducer);

export default store;
