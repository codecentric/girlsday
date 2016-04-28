/// <reference path='../../all.d.ts' />

import {List} from "immutable";
import {TaskType} from "../types/taskType";
import {Task} from "../types/task";
import Person from "../types/person";
import * as moment from "moment";

let mom = () => new Person('👩', List.of(
    new Task(TaskType.BRUSH_TEETH, 3),
    new Task(TaskType.TAKE_A_SHOWER, 15),
    new Task(TaskType.PICK_CLOTHES, 10, TaskType.PUT_CLOTHES_ON),
    new Task(TaskType.MAKE_BREAKFAST, 10, TaskType.BREAKFAST),
    new Task(TaskType.GET_DRESSED, 15),
    new Task(TaskType.BREAKFAST, 15),
    new Task(TaskType.FEED_BABY, 15),
    new Task(TaskType.DRESS_BABY, 15),
    new Task(TaskType.DRINK_COFFEE, 10),
    new Task(TaskType.CLEAN_KITCHEN, 5),
    new Task(TaskType.PUT_SHOES_ON, 5),
    new Task(TaskType.DRIVE_TO_SCHOOL, 15)
), moment().hours(5).minutes(45).toDate());

let dad = () => new Person('👨', List.of(
    new Task(TaskType.BRUSH_TEETH, 3),
    new Task(TaskType.TAKE_A_SHOWER, 15),
    new Task(TaskType.GET_DRESSED, 15),
    new Task(TaskType.DIAPER, 10),
    new Task(TaskType.BREAKFAST, 15),
    new Task(TaskType.DRINK_COFFEE, 10),
    new Task(TaskType.READ_NEWSPAPER, 5),
    new Task(TaskType.PUT_SHOES_ON, 5, TaskType.DRIVE_TO_SCHOOL),
    new Task(TaskType.DRIVE_TO_SCHOOL, 15)
), moment().hours(6).minutes(18).toDate());

let daughter = () => new Person('👧', List.of(
    new Task(TaskType.WASH_FACE, 2),
    new Task(TaskType.BRUSH_TEETH, 3),
    new Task(TaskType.PREPARE_FEED_BABY, 15, TaskType.FEED_BABY),
    new Task(TaskType.PUT_CLOTHES_ON, 15),
    new Task(TaskType.BREAKFAST, 15),
    new Task(TaskType.PREPARE_FOR_SCHOOL, 10),
    new Task(TaskType.CLEAN_KITCHEN, 10),
    new Task(TaskType.PUT_SHOES_ON, 10),
    new Task(TaskType.DRIVE_TO_SCHOOL, 15)
), moment().hours(6).minutes(24).toDate());

let son = () => new Person('👶', List.of(
    new Task(TaskType.BRUSH_TEETH, 3),
    new Task(TaskType.WASH_FACE,20),
    new Task(TaskType.PUT_CLOTHES_ON, 15),
    new Task(TaskType.BREAKFAST, 15),
    new Task(TaskType.PREPARE_FOR_SCHOOL, 10),
    new Task(TaskType.PUT_SHOES_ON, 10),
    new Task(TaskType.DRIVE_TO_SCHOOL, 15)
), moment().hours(6).minutes(23).toDate());

export let initialPersonList = () => List.of(mom(), dad(), daughter(), son());
