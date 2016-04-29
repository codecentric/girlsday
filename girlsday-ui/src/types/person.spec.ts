/// <reference path='../../all.d.ts' />

import Person from "./person";
import {Task} from "./task";
import {List, Map} from "immutable";
import {TaskType} from "./taskType";
import {TaskState} from "./taskState";
import * as moment from "moment";

describe('A Person', () => {
  let startTime = moment().hour(6).toDate();

  describe('has a static method getNumberOfOpenTasks()', () => {
    it('should return the number of open tasks for the given state', (done) => {

      let person1 = new Person('P1', List.of(
        new Task(TaskType.BREAKFAST, 15, '', TaskState.FINISHED),
        new Task(TaskType.WASH_FACE, 15, '', TaskState.RUNNING),
        new Task(TaskType.DRIVE_TO_SCHOOL, 15, '', TaskState.WAITING)
      ), startTime);

      let person2 = new Person('P2', List.of(
        new Task(TaskType.BREAKFAST, 15, '', TaskState.FINISHED),
        new Task(TaskType.WASH_FACE, 15, '', TaskState.BLOCKED),
        new Task(TaskType.DRIVE_TO_SCHOOL, 15, '', TaskState.WAITING)
      ), startTime);

      let person3 = new Person('P3', List.of(
        new Task(TaskType.BREAKFAST, 15, '', TaskState.FINISHED),
        new Task(TaskType.WASH_FACE, 15, '', TaskState.FINISHED),
        new Task(TaskType.DRIVE_TO_SCHOOL, 15, '', TaskState.FINISHED)
      ), startTime);

      const testState = Map({
        persons: List.of(person1, person2, person3)
      });

      let expected = 4;

      let actual = Person.getNumberOfOpenTasks(testState);

      expected.should.equal(actual);

      done();
    });

  });

  describe('has a static method allRunningTasks()', () => {
    it('should return all running tasks for the given list of persons', (done) => {

      let person1 = new Person('P1', List.of(
        new Task(TaskType.BREAKFAST, 15, '', TaskState.FINISHED),
        new Task(TaskType.WASH_FACE, 15, '', TaskState.RUNNING),
        new Task(TaskType.DRIVE_TO_SCHOOL, 15, '', TaskState.WAITING)
      ), startTime);

      let person2 = new Person('P2', List.of(
        new Task(TaskType.BREAKFAST, 15, '', TaskState.RUNNING),
        new Task(TaskType.WASH_FACE, 15, '', TaskState.WAITING),
        new Task(TaskType.DRIVE_TO_SCHOOL, 15, '', TaskState.WAITING)
      ), startTime);

      let person3 = new Person('P3', List.of(
        new Task(TaskType.BREAKFAST, 15, '', TaskState.FINISHED),
        new Task(TaskType.WASH_FACE, 15, '', TaskState.FINISHED),
        new Task(TaskType.DRIVE_TO_SCHOOL, 15, '', TaskState.RUNNING)
      ), startTime);

      const persons = List.of(person1, person2, person3);


      let expected = [TaskType.WASH_FACE, TaskType.BREAKFAST, TaskType.DRIVE_TO_SCHOOL];

      let actual = Person.allRunningTasks(persons);

      expected.should.deep.equal(actual);

      done();
    });

  });

  describe('has a function runningTasks()', () => {
    it('should return all running tasks for the given person', (done) => {

      let person = new Person('P1', List.of(
        new Task(TaskType.BREAKFAST, 15, '', TaskState.FINISHED),
        new Task(TaskType.WASH_FACE, 15, '', TaskState.RUNNING),
        new Task(TaskType.DRIVE_TO_SCHOOL, 15, '', TaskState.WAITING)
      ), startTime);


      let expected = [new Task(TaskType.WASH_FACE, 15, '', TaskState.RUNNING)];

      let actual = person.runningTasks().toArray();

      expected.should.deep.equal(actual);

      done();
    });

  });

  describe('has a function finishedTasks()', () => {
    it('should return all tasks that are running now and should be finished at the given time', (done) => {

      let sixOClock = moment('6', 'H').toDate();

      let runningTask = new Task(TaskType.WASH_FACE, 15, '', TaskState.RUNNING);
      runningTask.endTime = sixOClock;

      let person = new Person('P1', List.of(
        new Task(TaskType.BREAKFAST, 15, '', TaskState.FINISHED),
        runningTask,
        new Task(TaskType.DRIVE_TO_SCHOOL, 15, '', TaskState.WAITING)
      ), sixOClock);


      let expected = [runningTask];

      let actual = person.finishedTasks(sixOClock).toArray();

      expected.should.deep.equal(actual);

      done();
    });

    it('should return all tasks that are running now and should be finished at the given time. Even if the given time is in the future', (done) => {

      let sixOClock = moment('6', 'H').toDate();
      let eightOClock = moment('8', 'H').toDate();

      let runningTask = new Task(TaskType.WASH_FACE, 15, '', TaskState.RUNNING);
      runningTask.endTime = sixOClock;

      let person = new Person('P1', List.of(
        new Task(TaskType.BREAKFAST, 15, '', TaskState.FINISHED),
        runningTask,
        new Task(TaskType.DRIVE_TO_SCHOOL, 15, '', TaskState.WAITING)
      ), sixOClock);

      let expected = [runningTask];

      let actual = person.finishedTasks(eightOClock).toArray();

      expected.should.deep.equal(actual);

      done();
    });

    it('should ignore all tasks that are running now and should not be finished at the given time', (done) => {

      let sixOClock = moment('6', 'H').toDate();
      let eightOClock = moment('8', 'H').toDate();

      let runningTask = new Task(TaskType.WASH_FACE, 15, '', TaskState.RUNNING);
      runningTask.endTime = eightOClock;

      let person = new Person('P1', List.of(
        new Task(TaskType.BREAKFAST, 15, '', TaskState.FINISHED),
        runningTask,
        new Task(TaskType.DRIVE_TO_SCHOOL, 15, '', TaskState.WAITING)
      ), sixOClock);


      let expected = [];

      let actual = person.finishedTasks(sixOClock).toArray();

      expected.should.deep.equal(actual);

      done();
    });

  });

  describe('has a function nextTask()', () => {
    it('should return the next task which is BLOCKED', (done) => {

      let expected = new Task(TaskType.WASH_FACE, 15, '', TaskState.BLOCKED);

      let person = new Person('P1', List.of(
        new Task(TaskType.BREAKFAST, 15, '', TaskState.FINISHED),
        expected,
        new Task(TaskType.DRIVE_TO_SCHOOL, 15, '', TaskState.WAITING)
      ), startTime);

      let actual = person.nextTask();

      expected.should.deep.equal(actual);

      done();
    });

    it('should return the next task which is WAITING', (done) => {

      let expected = new Task(TaskType.WASH_FACE, 15, '', TaskState.WAITING);

      let person = new Person('P1', List.of(
        new Task(TaskType.BREAKFAST, 15, '', TaskState.FINISHED),
        expected,
        new Task(TaskType.DRIVE_TO_SCHOOL, 15, '', TaskState.WAITING)
      ), startTime);

      let actual = person.nextTask();

      expected.should.deep.equal(actual);

      done();
    });

  });


  describe('has a function updateRunningTasks()', () => {
    it('should update all finished tasks and set their state to FINISHED', (done) => {

      let sixOClock = moment('6', 'H').toDate();
      let finishedTask = new Task(TaskType.BREAKFAST, 15, '', TaskState.FINISHED);

      let runningTask = new Task(TaskType.WASH_FACE, 15, '', TaskState.RUNNING);
      runningTask.endTime = sixOClock;

      let waitingTask = new Task(TaskType.DRIVE_TO_SCHOOL, 15, '', TaskState.WAITING);

      let person = new Person('P1', List.of(
        finishedTask,
        runningTask,
        waitingTask
      ), sixOClock);

      let formerRunningTask = new Task(TaskType.WASH_FACE, 15, '', TaskState.FINISHED);
      formerRunningTask.endTime = sixOClock;


      let expected = [finishedTask,
        formerRunningTask,
        waitingTask];

      let actual = person.updateRunningTasks(sixOClock).toArray();

      expected.should.deep.equal(actual);

      done();
    });

  });

  describe('has a function numberOfOpenTasks()', () => {
    it('should return the number of tasks which are not FINISHED for the given person', (done) => {

      let person = new Person('P1', List.of(
        new Task(TaskType.BREAKFAST, 15, '', TaskState.FINISHED),
        new Task(TaskType.WASH_FACE, 15, '', TaskState.RUNNING),
        new Task(TaskType.DRIVE_TO_SCHOOL, 15, '', TaskState.WAITING)
      ), startTime);

      let expected = 2;

      let actual = person.numberOfOpenTasks();

      expected.should.deep.equal(actual);

      done();
    });
  });

  describe('has a function isAwake()', () => {
    it('should return true if the person is awake at the given time', (done) => {

      let person = new Person('P1', List.of(
        new Task(TaskType.BREAKFAST, 15, '', TaskState.FINISHED),
        new Task(TaskType.WASH_FACE, 15, '', TaskState.RUNNING),
        new Task(TaskType.DRIVE_TO_SCHOOL, 15, '', TaskState.WAITING)
      ), startTime);


      let expected = true;

      let actual = person.isAwake(startTime);

      expected.should.equal(actual);

      done();
    });

    it('should return false if the person is not awake at the given time', (done) => {

      let eightOClock = moment().hours(8).toDate();

      let person = new Person('P1', List.of(
        new Task(TaskType.BREAKFAST, 15, '', TaskState.FINISHED),
        new Task(TaskType.WASH_FACE, 15, '', TaskState.RUNNING),
        new Task(TaskType.DRIVE_TO_SCHOOL, 15, '', TaskState.WAITING)
      ), eightOClock);


      let expected = false;

      let actual = person.isAwake(startTime);

      expected.should.equal(actual);

      done();
    });

  });

});
