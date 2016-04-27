/// <reference path='../../all.d.ts' />

import {
  createTickAction,
  createResetAction,
  createStopAction,
  createStartAction,
  createUpdateListAction, createUpdateWakeUpAction
} from "./actionCreators";
import * as moment from 'moment';
import {List} from "immutable";
import {ActionType} from "./actionType";
import Person from "../types/person";
import {TaskType} from "../types/taskType";
import {Task} from "../types/task";
import {sixOClock} from "../config/initialState";

describe('An action creater:', () => {


  describe('for tick', () => {
    it('should create an action of type TICK with time == 1 by default', (done) => {

      const expected = {
        type: ActionType.TICK,
        time: 1
      };

      const actual = createTickAction();

      actual.should.deep.equal(expected);

      done();
    });

    it('should create an action of type TICK with the given time ', (done) => {

      let time = 99;

      const expected = {
        type: ActionType.TICK,
        time: time
      };

      const actual = createTickAction(time);

      actual.should.deep.equal(expected);

      done();
    });
  });

  describe('for reset', () => {
    it('should create an action of type RESET by default', (done) => {

      const expected = {
        type: ActionType.RESET,
      };

      const actual = createResetAction();

      actual.should.deep.equal(expected);

      done();
    });

  });

  describe('for stop', () => {
    it('should create an action of type STOP by default', (done) => {

      const expected = {
        type: ActionType.STOP_ACTION,
      };

      const actual = createStopAction();

      actual.should.deep.equal(expected);

      done();
    });

  });

  describe('for start', () => {
    it('should create an action of type START by default', (done) => {

      const expected = {
        type: ActionType.START_ACTION,
      };

      const actual = createStartAction();

      actual.should.deep.equal(expected);

      done();
    });

  });

  describe('for update', () => {
    it('should create an action of type UPDATE_LIST with the given person and the given tasks by default', (done) => {

      let person = new Person('Test', List.of(new Task(TaskType.BREAKFAST)), sixOClock);
      let tasks = List.of(new Task(TaskType.BREAKFAST), new Task(TaskType.DRINK_COFFEE));

      const expected = {
        type: ActionType.UPDATE_LIST,
        person: person,
        tasks: tasks
      };

      const actual = createUpdateListAction(person, tasks);

      actual.should.deep.equal(expected);

      done();
    });

  });

  describe('for wake up time', () => {
    it('should create an action of type UPDATE_WAKE_UP_TIME with the given person and the given time by default', (done) => {

      let person = new Person('Test', List.of(new Task(TaskType.BREAKFAST)), sixOClock);
      let time = moment().hours(7).minutes(0).toDate();

      const expected = {
        type: ActionType.UPDATE_WAKE_UP_TIME,
        person: person,
        time: time
      };

      const actual = createUpdateWakeUpAction(person, time);

      actual.should.deep.equal(expected);

      done();
    });

  });
});
