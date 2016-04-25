import {List} from "immutable";
import {TaskType} from "../types/taskType";
import {Task} from "../types/task";
import Person from "../types/person";

const mom = new Person('👩', List.of(
  new Task(TaskType.WASH_FACE),
  new Task(TaskType.BRUSH_TEETH, 3),
  new Task(TaskType.MAKE_BREAKFAST, 20, false, null, TaskType.BREAKFAST),
  new Task(TaskType.BREAKFAST, 15),
  new Task(TaskType.DRIVE_TO_SCHOOL, 15, false, null)
));

const dad = new Person('👨', List.of(
  new Task(TaskType.WASH_FACE),
  new Task(TaskType.BRUSH_TEETH, 3),
  new Task(TaskType.BREAKFAST, 15),
  new Task(TaskType.CLEAN_KITCHEN, 15, false, null, TaskType.DRIVE_TO_SCHOOL),
  new Task(TaskType.DRIVE_TO_SCHOOL, 15, false, null)
));

const daughter = new Person('👧', List.of(
  new Task(TaskType.WASH_FACE),
  new Task(TaskType.BRUSH_TEETH, 3),
  new Task(TaskType.BREAKFAST, 15),
  new Task(TaskType.DRIVE_TO_SCHOOL, 15, false, null)
));

const son = new Person('👶', List.of(
  new Task(TaskType.WASH_FACE),
  new Task(TaskType.BRUSH_TEETH, 3),
  new Task(TaskType.BREAKFAST, 15),
  new Task(TaskType.DRIVE_TO_SCHOOL, 15, false, null)
));

export const persons = List.of(mom, dad, daughter, son);
