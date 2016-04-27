/// <reference path='../../all.d.ts' />

import {List} from "immutable";
import {TaskType} from "../types/taskType";
import {Task} from "../types/task";
import Person from "../types/person";

let mom = () => new Person('👩', List.of(
  new Task(TaskType.BRUSH_TEETH, 3),
  new Task(TaskType.TAKE_A_SHOWER, 15),
  new Task(TaskType.GET_DRESSED, 15),
  new Task(TaskType.PICK_CLOTHES, 5, TaskType.PUT_CLOTHES_ON),
  new Task(TaskType.MAKE_BREAKFAST, 20, TaskType.BREAKFAST),
  new Task(TaskType.BREAKFAST, 15),
  new Task(TaskType.DIAPER, 15),
  new Task(TaskType.PREPARE_FEED_BABY, 15, TaskType.FEED_BABY),
  new Task(TaskType.FEED_BABY, 15),
  new Task(TaskType.DRESS_BABY, 15),
  new Task(TaskType.DRINK_COFFEE, 5),
  new Task(TaskType.DRIVE_TO_SCHOOL, 15)
));

let dad = () => new Person('👨', List.of(
  new Task(TaskType.BRUSH_TEETH, 3),
  new Task(TaskType.TAKE_A_SHOWER, 15),
  new Task(TaskType.GET_DRESSED, 15),
  new Task(TaskType.BREAKFAST, 15),
  new Task(TaskType.DRINK_COFFEE, 5),
  new Task(TaskType.READ_NEWSPAPER, 5),
  new Task(TaskType.CLEAN_KITCHEN, 15, TaskType.DRIVE_TO_SCHOOL),
  new Task(TaskType.PUT_SHOES_ON, 15),
  new Task(TaskType.DRIVE_TO_SCHOOL, 15)
));

let daughter = () => new Person('👧', List.of(
  new Task(TaskType.WASH_FACE),
  new Task(TaskType.BRUSH_TEETH, 3),
  new Task(TaskType.BREAKFAST, 15),
  new Task(TaskType.PUT_CLOTHES_ON, 15),
  new Task(TaskType.PUT_SHOES_ON, 15),
  new Task(TaskType.PREPARE_FOR_SCHOOL, 10),
  new Task(TaskType.DRIVE_TO_SCHOOL, 15)
));

let son = () => new Person('👶', List.of(
  new Task(TaskType.WASH_FACE),
  new Task(TaskType.BRUSH_TEETH, 3),
  new Task(TaskType.BREAKFAST, 15),
  new Task(TaskType.PUT_CLOTHES_ON, 15),
  new Task(TaskType.PUT_SHOES_ON, 15),
  new Task(TaskType.DRIVE_TO_SCHOOL, 15)
));

export let initialPersonList = () => List.of(mom(), dad(), daughter(), son());
