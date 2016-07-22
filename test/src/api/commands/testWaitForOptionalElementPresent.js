var assert = require('assert');
var Nightwatch = require('../../../lib/nightwatch.js');
var MochaTest = require('../../../lib/mochatest.js');

module.exports = {
  'waitForOptionalElementPresent' : {
    beforeEach: function (done) {
      MochaTest.addBefore(done);
    },

    afterEach: function (done) {
      MochaTest.addAfter(done);
    },

    'client.waitForOptionalElementPresent() success': function (done) {
      var api = Nightwatch.api();

      api.waitForOptionalElementPresent('#weblogin', 100, function callback(result, instance) {
        assert.equal(instance.expectedValue, 'found');
        assert.equal(result.status, 0);
        assert.equal(result.value[0].ELEMENT, '0');
        done();
      });

      Nightwatch.start();
    },

    'client.waitForOptionalElementPresent() failure with custom message': function (done) {
      var api = Nightwatch.api();
      api.globals.waitForConditionPollInterval = 10;
      api.waitForOptionalElementPresent('.weblogin', 15, function callback(result, instance) {
        assert.equal(instance.message, 'Element .weblogin found in 15 milliseconds');
        assert.equal(result.value, false);
        done();
      }, 'Element %s found in %d milliseconds');

      Nightwatch.start();
    },

    'client.waitForOptionalElementPresent() failure': function (done) {
      var api = Nightwatch.api();

      api.globals.waitForConditionPollInterval = 10;

      api.waitForOptionalElementPresent('.weblogin', 15, function callback(result) {
        assert.equal(result.value, false);
        done();
      });

      Nightwatch.start();
    }
  }
};
