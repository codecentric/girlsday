
export enum TaskState {
  WAITING,
  BLOCKED,
  RUNNING,
  FINISHED
}

export class Task {
  constructor(public type:string,
              public time:number = 15,
              public running = false,
              public endTime:Date = null,
              public allows:string = '') {
  }

}
