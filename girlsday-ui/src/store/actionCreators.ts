/// <reference path='../../all.d.ts' />
import {ActionType} from "./actionType";
import {Task} from "../types/task";
import Person from "../types/person";
import {List} from "immutable";

/**
 * generates a TICK action.
 *
 * After every TICK solved tasks will be set to FINISHED and new tasks will be started for every person
 *
 * @param time .. the time, that passes after the tick in seconds
 * @returns {{type: string, time: number}}
 */
export let createTickAction = (time:number = 1) => {
  return {
    type: ActionType.TICK,
    time: time
  };
};

/**
 * generates a RESET action.
 *
 * after every RESET the state is resetted.
 *
 * @returns {{type: string}}
 */
export let createResetAction = () => {
  return {
    type: ActionType.RESET
  };
};

/**
 * generates a STOP action
 *
 * this causes a check of every running task: if the task is completed, the task will be updated
 *
 * @returns {{type: string}}
 */
export let createStopAction = () => {
  return {type: ActionType.STOP_ACTION};
};

/**
 * generates a START action
 *
 * this causes a check of every person: if no task is in progress, the next task will be started.
 * There are additional requirements that are explained in the reducer (store.ts)
 *
 * @returns {{type: string}}
 */
export let createStartAction = () => {
  return {
    type: ActionType.START_ACTION
  };
};

/**
 * creates an UPDATE_LIST action
 *
 * this updates the given person and assigns the given list of taasks to the person.
 *
 * @param person - to be updated
 * @param tasks - tasks that will be assigned to the person
 * @returns {{type: string, person: Person, tasks: List<Task>}}
 */
export let createUpdateListAction = (person:Person, tasks:List<Task>) => {
  return {
    type: ActionType.UPDATE_LIST,
    person: person,
    tasks: tasks
  };
};
