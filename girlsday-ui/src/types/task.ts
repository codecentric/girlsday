/// <reference path='../../all.d.ts' />

import {TaskState} from "./taskState";

/**
 * a task that can be processed.
 *
 */
export class Task {

  /**
   * the Date, the task is done.
   * @type {Date}
   */
  public endTime:Date = null

  /**
   *
   * @param type - needed to compare similar tasks.
   * @param time - the time needed to fulfill the task
   * @param allows - tasks that can be solved AFTER this task is done
   * @param taskState - the current state of the task. Initial value: WAITING
   */
  constructor(public type:string,
              public time:number = 15,
              public allows:string = '',
              public taskState:TaskState = TaskState.WAITING) {
  }
}
