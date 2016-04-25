import {List} from "immutable";
import {Task} from "./task";

export default class Person {
  constructor(public name:string, public tasks:List<Task>) {
  }

  static getNumberOfOpenTasks = (state) => {
    return state.get('persons')
      .map((person:Person) => person.tasks.size)
      .reduce((a:number, b:number) => a + b, 0);
  };

  static allRunningTasks(persons:List<Person>) {
    return persons
      .map((person:Person) =>
        person.tasks.filter((task:Task) => task.running === true).toArray()).toArray()
      .reduce((a, b) => a.concat(b), [])
      .map((task:Task) => task.type);
  }

}
