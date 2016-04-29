export let addTimeAssertions = (chai:any) => {
  chai.Assertion.addChainableMethod('equalTime', function (time) {
    var expected = time.getTime(),
      actual = this._obj.getTime();

    return this.assert(
      actual == expected,
      'expected ' + this._obj + ' to equal ' + time,
      'expected ' + this._obj + ' to not equal ' + time
    );
  });

  chai.Assertion.addChainableMethod('equalDate', function (date) {
    var expectedDate = date.toDateString(),
      actualDate = this._obj.toDateString();

    return this.assert(
      expectedDate === actualDate,
      'expected ' + actualDate + ' to equal' + expectedDate,
      'expected ' + actualDate + ' to not equal' + expectedDate
    )
  });
};
