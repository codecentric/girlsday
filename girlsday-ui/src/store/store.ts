/// <reference path='../../all.d.ts' />

import * as React from "react";
import {List} from "immutable";
import {createStore} from "redux";
import * as moment from "moment";
import {generateInitialState} from "../config/initialState";
import {initialPersonList} from "../config/persons";
import Person from "../types/person";
import {Task} from "../types/task";
import {ActionType} from "./actionType";
import {TaskState} from "../types/taskState";

let reset = () => {
  return generateInitialState()
    .set('persons', initialPersonList())
    .set('lastAction', ActionType.RESET);
};

let tickAction = (state, action) => {
  let time = state.get('time');

  // get time and add 'action.time' minutes to it
  let newTime = moment(time).add(action.time, 'm').toDate();

  return state
    .set('time', newTime)
    .set('lastAction', ActionType.TICK);
};

let stopAction = (state) => {
  // stop all actions that are running and should end now
  let time:Date = state.get('time');
  let persons:List<Person> = <List<Person>>state.get('persons');

  let allowedTasksTypes = persons.map((person:Person) => {
    return person.finishedTasks(time).toArray();
  }).toArray()
    .reduce((a, b) => {
      return a.concat(b);
    }, []).map((task:Task) => {
      return task.allows;
    });

  let blockedTasks:List<string> = state.get('blockedTasks');

  let updatedBlockedTasks = blockedTasks.filter((task:string) => {
    return allowedTasksTypes.indexOf(task) < 0;
  }).toList();

  let updatedPersons:List<Person> = persons.map((person:Person) => {
    let updatedTasksList:List<Task> = person.updateRunningTasks(time).toList();

    return new Person(person.name, updatedTasksList, person.wakeUp);
  }).toList();

  return state
    .set('lastAction', ActionType.STOP_ACTION)
    .set('blockedTasks', updatedBlockedTasks)
    .set('persons', updatedPersons);
};

let startAction = (state) => {
  // start all actions that are running and should end nowstate.set('lastAction', ActionType.START_ACTION);

  let time = state.get('time');
  let persons:List<Person> = <List<Person>>state.get('persons');


  let allRunningTasks:Array<String> = persons.map((person:Person) => {
    return person.runningTasks().toArray();
  }).toArray()
    .reduce((a, b) => {
      return a.concat(b);
    }, []).map((task:Task) => {
      return task.type;
    });

  let log:Array<string> = [];

  // get persons with no running task
  persons.forEach((person:Person) => {
    let runningTasks = person.runningTasks();

    // get first task that is not running and should start now (or is overdue)
    if (runningTasks.size === 0 && person.numberOfOpenTasks() > 0 && person.isAwake(time)) {
      let nextTask = person.nextTask();

      // check that nextAction is not blocked

      let blockedTasks:List<string> = state.get('blockedTasks');
      let parallelTasks:List<string> = state.get('parallelTasks');

      if (nextTask && blockedTasks.indexOf(nextTask.type) < 0 && (parallelTasks.indexOf(nextTask.type) > -1
        || allRunningTasks.indexOf(nextTask.type) < 0)) {

        let logMessage:string = `${moment(time).format('HH:mm')}: ${person.name}  startet mit "${nextTask.type}".
            Diese Aufgabe dauert ${moment(nextTask.time)} Minuten.`;

        log.push(logMessage);

        // update endTime and set task to running
        nextTask.endTime = moment(state.get('time')).add(nextTask.time, 'm').toDate();
        nextTask.taskState = TaskState.RUNNING;

        allRunningTasks.push(nextTask.type);
      } else {
        let logMessage:string = `<strong>${moment(time).format('HH:mm')}: ${person.name}  kann nicht mit "${nextTask.type}" starten.</strong>`;
        log.push(logMessage);
        nextTask.taskState = TaskState.BLOCKED;
      }

    }

  });

  let stateWithNewLog;
  if (log.length > 0) {
    let oldLogList:Array<string> = state.get('log');
    let newLog = [].concat(oldLogList, log);
    stateWithNewLog = state.set('log', newLog);
  } else {
    stateWithNewLog = state;
  }


  return stateWithNewLog
    .set('lastAction', ActionType.START_ACTION)
    .set('persons', persons)

};

let updateList = (state, action) => {
  let newPerson = new Person(action.person.name, action.tasks, action.person.wakeUp);

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


let updateWakeUpTime = (state, action) => {
  let newPerson = new Person(action.person.name, action.person.tasks, action.time);

  let personList = <List<Person>>state.get('persons');

  let updatedPersonList:List<Person> = personList.update(
    personList.findIndex((person:Person) => {
      return person.name === action.person.name;
    }), (person:Person) => {
      return newPerson;
    });

  return state.set('lastAction', ActionType.UPDATE_WAKE_UP_TIME)
    .set('persons', updatedPersonList);
};

export let reducer = (state = generateInitialState(), action:any) => {
  switch (action.type) {
    case ActionType.RESET:
    {
      return reset();
    }
    case ActionType.TICK:
    {
      return tickAction(state, action);
    }
    case ActionType.STOP_ACTION:
    {
      return stopAction(state);
    }
    case ActionType.START_ACTION:
    {
      return startAction(state);
    }
    case ActionType.UPDATE_LIST:
    {
      return updateList(state, action);
    }
    case ActionType.UPDATE_WAKE_UP_TIME:
    {
      return updateWakeUpTime(state, action);
    }
    default:
      return state;
  }
};


let store = createStore(reducer);

export default store;
