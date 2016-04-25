import {ActionType} from "./actionType";
import {Task} from "../types/task";
import Person from "../types/person";
import List = Immutable.List;

export let createTickAction = (time:number = 1) => {
  return {
    type: ActionType.TICK,
    time: time
  }
};
export let createResetAction = () => {
  return {
    type: ActionType.RESET
  }
};
export let createStopAction = () => {
  return {type: ActionType.STOP_ACTION}
};
export let createStartAction = () => {
  return {
    type: ActionType.START_ACTION
  }
};
export let createUpdateList = (person:Person, tasks:List<Task>) => {
  return {
    type: ActionType.UPDATE_LIST,
    person: person,
    tasks: tasks
  }
};
