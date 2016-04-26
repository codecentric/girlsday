/// <reference path='../../all.d.ts' />

import {List} from "immutable";
import {TaskType} from "../types/taskType";
import {Task} from "../types/task";
import Person from "../types/person";

let mom = () => new Person('👩', List.of(
  new Task(TaskType.WASH_FACE),
  new Task(TaskType.BRUSH_TEETH, 3),
  new Task(TaskType.MAKE_BREAKFAST, 20, TaskType.BREAKFAST),
  new Task(TaskType.BREAKFAST, 15),
  new Task(TaskType.DRINK_COFFEE, 5),
  new Task(TaskType.DRIVE_TO_SCHOOL, 15)
));

let dad = () => new Person('👨', List.of(
  new Task(TaskType.WASH_FACE),
  new Task(TaskType.BRUSH_TEETH, 3),
  new Task(TaskType.BREAKFAST, 15),
  new Task(TaskType.DRINK_COFFEE, 5),
  new Task(TaskType.CLEAN_KITCHEN, 15, TaskType.DRIVE_TO_SCHOOL),
  new Task(TaskType.DRIVE_TO_SCHOOL, 15)
));

let daughter = () => new Person('👧', List.of(
  new Task(TaskType.WASH_FACE),
  new Task(TaskType.BRUSH_TEETH, 3),
  new Task(TaskType.BREAKFAST, 15),
  new Task(TaskType.PREPARE_FOR_SCHOOL, 10),
  new Task(TaskType.DRIVE_TO_SCHOOL, 15)
));

let son = () => new Person('👶', List.of(
  new Task(TaskType.WASH_FACE),
  new Task(TaskType.BRUSH_TEETH, 3),
  new Task(TaskType.BREAKFAST, 15),
  new Task(TaskType.DRIVE_TO_SCHOOL, 15)
));

export let initialPersonList = () => List.of(mom(), dad(), daughter(), son());
