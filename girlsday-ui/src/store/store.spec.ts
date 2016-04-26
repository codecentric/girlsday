/// <reference path='../../all.d.ts' />

import {createTickAction, createResetAction} from './actionCreators';
import {reducer} from './store';
import * as moment from 'moment';
import {ActionType} from './actionType';
import {initialPersonList} from '../config/persons';
import {generateInitialState} from '../config/initialState';
import {addTimeAssertions} from "../util/assertUtil";

addTimeAssertions(chai);

xdescribe('A store:', () => {


  describe('on RESET', () => {
    it('should reset the state and set lastAction to RESET', (done) => {

      const expectedState = generateInitialState()
        .set('persons', initialPersonList())
        .set('lastAction', ActionType.RESET);

      const actualState = reducer(generateInitialState(), createResetAction());

      actualState.should.deep.eqls(expectedState);


      done();

    });
  });

  describe('on TICK', () => {

    it('should increase the time', (done) => {

      const minutesToAdd = 1;
      let initialTime = generateInitialState().get('time');

      const expectedState = generateInitialState()
        .set('time', moment(initialTime).add(minutesToAdd, 'm').toDate());

      const actualState = reducer(generateInitialState(), createTickAction(minutesToAdd));

      actualState.toJS().should.deep.equal(expectedState.toJS());

      done();
    });
  });
});
