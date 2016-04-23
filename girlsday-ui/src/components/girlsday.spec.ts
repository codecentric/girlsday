import {BaseRequestOptions} from 'angular2/http';
import {Injector} from 'angular2/core';
import {GirlsDay} from './girlsday';

var injector = Injector.resolveAndCreate([
  BaseRequestOptions,
  GirlsDay
]);

describe('GirlsDay', function () {
  describe('given the application is started', () => {
    it('should load', () => {
      let search = injector.get(GirlsDay);
      expect(search).not.toBeNull();
    });
  });
});
