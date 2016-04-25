import {Map, List} from "immutable";
import * as moment from "moment";
import {TaskType} from "../types/taskType";
import {persons} from "./persons";

const sixOClock = moment("6", "H").toDate();

export const initialState = Map({
  // blocked tasks is a list of tasks that needs another task to unlock it. (MAKE_BREAKFAST => BREAKFAST)
  blockedTasks: List.of(TaskType.BREAKFAST, TaskType.DRIVE_TO_SCHOOL),
  // tasks that can be executed by more than one person at the same time
  parallelTasks: List.of(TaskType.BREAKFAST, TaskType.DRIVE_TO_SCHOOL),
  // the current time
  time: sixOClock,
  // all persons, that are part of the simulation
  persons: persons,
  // the last action. needed to determine the next action
  lastAction: 'TICK',
  // the log, which will be displayed in UI.
  log: List<string>()
});
