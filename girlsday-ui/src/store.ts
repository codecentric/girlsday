/// <reference path="../typings/main.d.ts" />

import * as React from "react";
import {Map, List} from "immutable";
import {createStore} from "redux";
import * as moment from "moment";

export interface Action {
  type:string;
}

export class Task {
  constructor(public type:string,
              public time:number = 15,
              public running = false,
              public endTime:Date = null,
              public allows:string = '') {
  }
}

interface TimeAction {
  type:string;
  time:number;
}

let createDate = (h:number, m:number = 0):Date => {
  return moment(`${h}:${m}`, 'H:m').toDate();
};

export class Person {
  constructor(public name:string, public tasks:List<Task>) {
  }
}

let sixOClock = moment("6", "H").toDate();

// todo move to config file. make immutable
let initPersons = ():List<Person> => {

  let mom = new Person('👩', List.of(
    new Task('WASH_FACE'),
    new Task('BRUSH_TEETH', 3),
    new Task('MAKE_BREAKFAST', 20, false, null, 'BREAKFAST'),
    new Task('BREAKFAST', 15),
    new Task('DRIVE_TO_SCHOOL', 15, false, null)
  ));

  let dad = new Person('👨', List.of(
    new Task('WASH_FACE'),
    new Task('BRUSH_TEETH', 3),
    new Task('BREAKFAST', 15),
    new Task('CLEAN_KITCHEN', 15, false, null, 'DRIVE_TO_SCHOOL'),
    new Task('DRIVE_TO_SCHOOL', 15, false, null)
  ));

  let daughter = new Person('👧', List.of(
    new Task('WASH_FACE'),
    new Task('BRUSH_TEETH', 3),
    new Task('BREAKFAST', 15),
    new Task('DRIVE_TO_SCHOOL', 15, false, null)
  ));

  let son = new Person('👶', List.of(
    new Task('WASH_FACE'),
    new Task('BRUSH_TEETH', 3),
    new Task('BREAKFAST', 15),
    new Task('DRIVE_TO_SCHOOL', 15, false, null)
  ));

  return List.of(mom, dad, daughter, son);
};

let persons:List<Person> = initPersons();

let initialState = Map({
  blockedTasks: List.of('BREAKFAST', 'DRIVE_TO_SCHOOL'),
  parallelTasks: List.of('BREAKFAST', 'DRIVE_TO_SCHOOL'),
  time: sixOClock,
  persons: persons,
  lastAction: 'TICK'
});

let reducer = (state = initialState, action:any) => {
  switch (action.type) {
    case 'RESET':
    {
      let newState = initialState.set('persons', initPersons());
      return newState.set('lastAction', 'RESET');
    }
    case 'TICK':
    {

      let time = state.get('time');

      // get time and add minutes to it
      let newTime = moment(time).add(action.time, 'm').toDate();

      let stateWithUpdatedTime = state.set('time', newTime);


      return stateWithUpdatedTime.set('lastAction', 'TICK');
    }
    case 'STOP_ACTIONS':
    {
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

      let blockedTasks = <List<string>>state.get('blockedTasks')

      let updatedBlockedTasks = blockedTasks.filter((task:string) => {
        return allowedTasksTypes.indexOf(task) < 0;
      }).toList();

      let updatedPersons:List<Person> = persons.map((person:Person) => {
        let actionsThatShouldNotEnd = person.tasks.filter((task:Task) => {
          return !(task.running === true && time >= task.endTime);
        });

        return new Person(person.name, actionsThatShouldNotEnd.toList());
      }).toList();

      let stateWithUpdatedAction = state.set('lastAction', 'STOP_ACTIONS');
      let stateWithUpdatedBlockedTasks = stateWithUpdatedAction.set('blockedTasks', updatedBlockedTasks);
      return stateWithUpdatedBlockedTasks.set('persons', updatedPersons);

    }
    case 'START_ACTIONS':
    {
      // start all actions that are running and should end nowstate.set('lastAction', 'START_ACTIONS');

      let time = state.get('time');
      let persons:List<Person> = <List<Person>>state.get('persons');


      let allRunningActions:Array<String> = persons.map((person:Person) => {
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
        let runningActions = person.tasks.filter((task:Task) => {
          return task.running === true;
        });

        if (runningActions.size === 0) {
          // get first task that is not running and should start now (or is overdue)
          if (person.tasks.size > 0) {
            let nextAction = person.tasks.get(0);

            // check that nextAction is not blocked

            let blockedTasks = <List<string>>state.get('blockedTasks');
            let parallelTasks = <List<string>>state.get('parallelTasks');

            if (blockedTasks.indexOf(nextAction.type) < 0) {

              if (parallelTasks.indexOf(nextAction.type) > -1
                || allRunningActions.indexOf(nextAction.type) < 0) {

                console.log(`${moment(time).format('HH:mm')}: ${person.name}  starts ${nextAction.type}.This takes: ${moment(nextAction.time)} minutes.`);

                // update endTime and set task to running
                nextAction.endTime = moment(state.get('time')).add('m', nextAction.time).toDate();
                nextAction.running = true;

                allRunningActions.push(nextAction.type);
              }
            }
          }
        }
      });

      let stateWithUpdatedAction = state.set('lastAction', 'START_ACTIONS');

      return stateWithUpdatedAction.set('persons', persons);

    }

    case 'UPDATE_LIST':
    {

      let personToUpdate = action.person;
      let newActionsList = action.tasks;

      let newPerson = new Person(action.person.name, newActionsList);

      let personList = <List<Person>>state.get('persons');

      let updatedPersonList:List<Person> = personList.update(
        personList.findIndex((person:Person) => {
          return person.name === personToUpdate.name;
        }), (person:Person) => {
          return person = newPerson;
        });

      let stateWithUpdatedAction = state.set('lastAction', 'UPDATE_LIST');

      return stateWithUpdatedAction.set('persons', updatedPersonList);
    }
    default:
      return state;
  }
  ;
};


let store = createStore(reducer);

export default store;



