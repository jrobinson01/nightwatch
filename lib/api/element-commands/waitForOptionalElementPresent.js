var util = require('util');
var WaitForElement = require('./_waitForElement.js');

/**
 * Waits a given time in milliseconds for an element to be present in the page before performing any other commands or assertions.
 *
 * If the element fails to be present in the specified amount of time, the test fails. You can change this by setting `abortOnFailure` to `false`.
 *
 * You can change the polling interval by defining a `waitForConditionPollInterval` property (in milliseconds) in as a global property in your `nightwatch.json` or in your external globals file.
 *
 * Similarly, a default timeout can be specified as a global `waitForConditionTimeout` property (in milliseconds).
 *
 * ```
 * this.demoTest = function (browser) {
 *   browser.WaitForOptionalElementPresent('body', 1000);
 *   // with callback
 *   browser.WaitForOptionalElementPresent('body', 1000, function() {
 *     // do something while we're here
 *   });
 *   // custom Spanish message
 *   browser.WaitForOptionalElementPresent('body', 1000, 'elemento %s no era presente en %d ms');
 *   // many combinations possible - the message is always the last argument
 *   browser.WaitForOptionalElementPresent('body', 1000, function() {}, 'elemento %s no era presente en %d ms');
 * };
 * ```
 *
 * @method waitForOptionalElementPresent
 * @param {string} selector The selector (CSS / Xpath) used to locate the element.
 * @param {number} time The number of milliseconds to wait. The runner performs repeated checks every 500 ms.
 * @param {function} [callback] Optional callback function to be called when the command finishes.
 * @param {string} [message] Optional message to be shown in the output; the message supports two placeholders: %s for current selector and %d for the time (e.g. Element %s was not in the page for %d ms).
 * @api commands
 */
function WaitForOptionalElementPresent() {
  WaitForElement.call(this);
  this.expectedValue = 'found';
}

util.inherits(WaitForOptionalElementPresent, WaitForElement);

WaitForOptionalElementPresent.prototype.elementFound = function(result, now) {
  var defaultMsg = 'Element <%s> was present after %d milliseconds.';
  return this.pass(result, defaultMsg, now - this.startTimer);
};

WaitForOptionalElementPresent.prototype.elementNotFound = function(result, now) {
  if (now - this.startTimer < this.ms) {
    // element wasn't found, schedule another check
    this.reschedule();
    return this;
  }
  this.pass({value:false}, 'Optional element <%s> was not found after %d milliseconds.', now - this.startTimer);
};

module.exports = WaitForOptionalElementPresent;
