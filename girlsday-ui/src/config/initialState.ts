/// <reference path='../../all.d.ts' />

import {Map, List} from "immutable";
import * as moment from "moment";
import {TaskType} from "../types/taskType";
import {ActionType} from "../store/actionType";
import {initialPersonList} from "./persons";

const sixOClock = moment('6', 'H').toDate();

export let generateInitialState = () => Map({
  // blocked tasks is a list of tasks that needs another task to unlock it. (MAKE_BREAKFAST => BREAKFAST)
  blockedTasks: List.of(TaskType.BREAKFAST, TaskType.DRIVE_TO_SCHOOL, TaskType.PUT_CLOTHES_ON, TaskType.FEED_BABY),
  // tasks that can be executed by more than one person at the same time
  parallelTasks: List.of(TaskType.BREAKFAST, TaskType.DRINK_COFFEE, TaskType.DRIVE_TO_SCHOOL),
  // the current time
  time: sixOClock,
  // all persons, that are part of the simulation
  persons: initialPersonList(),
  // the last action. needed to determine the next action
  lastAction: ActionType.TICK,
  // the log, which will be displayed in UI.
  log: List<string>()
});
