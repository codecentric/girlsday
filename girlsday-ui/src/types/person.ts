/// <reference path='../../all.d.ts' />

import {List} from "immutable";
import {Task} from "./task";
import {TaskState} from "./taskState";

export default class Person {
  constructor(public name: string, public tasks: List<Task>, public wakeUp: Date) {
  }
  
  static getNumberOfOpenTasks = (state) => {
    return state.get('persons')
        .map((person: Person) => person.numberOfOpenTasks())
        .reduce((a: number, b: number) => a + b, 0);
  };
  
  static allRunningTasks(persons: List<Person>): Array<string> {
    return persons
        .map((person: Person) =>
            person.tasks.filter((task: Task) => task.taskState === TaskState.RUNNING).toArray()).toArray()
        .reduce((a, b) => a.concat(b), [])
        .map((task: Task) => task.type);
  }
  
  runningTasks = () => {
    return this.tasks.filter((task: Task) => {
      return task.taskState === TaskState.RUNNING;
    });
  };
  
  isAwake = (time: Date): boolean => {
    return time >= this.wakeUp;
  };
  
  finishedTasks = (time: Date) => {
    return this.tasks.filter((task: Task) => {
      return task.taskState === TaskState.RUNNING && time >= task.endTime;
    });
  };
  
  nextTask = (): Task => {
    return this.tasks.find((task: Task) => {
      return task.taskState === TaskState.WAITING || task.taskState === TaskState.BLOCKED;
    })
  };
  
  updateRunningTasks = (time: Date) => {
    return this.tasks.map((task: Task) => {
      if (task.taskState === TaskState.RUNNING && time >= task.endTime) {
        task.taskState = TaskState.FINISHED;
      }
      return task;
    })
  };
  
  numberOfOpenTasks = (): number => {
    return this.tasks.filter((task: Task) => {
      return task.taskState !== TaskState.FINISHED;
    }).size
  };
  
  private static leftpad(num: number): String {
    return num > 9 ? '' + num : '0' + num;
  }
  
  totalTime = (): String => {
    let time = 0;
    this.tasks.map((task: Task) => {
      time += task.time;
    });
    return Math.floor(time / 60) + ':' + Person.leftpad(time % 60);
  };
}
