var vowFs = require('vow-fs');
var Vow = require('vow');
var JSCSChecker = require('jscs');
var utils = require('util');
var path = require('path');
var reactTools = require('react-tools');

/**
 * Starts Code Style checking process.
 *
 * @name StringChecker
 */
var Checker = function() {
    JSCSChecker.apply(this, arguments);
};

utils.inherits(Checker, JSCSChecker);

/**
 * Checks file provided with a string.
 * @param {String} str
 * @param {String} filename
 * @returns {Errors}
 */
Checker.prototype.checkString = function(str, filename) {
  str = str || 'input';

  var orgLines = str.split(/\r\n|\r|\n/);

  str = reactTools.transform(str);

  var errors = JSCSChecker.prototype.checkString.call(this, str, filename);


  errors._errorList = errors.getErrorList().filter(function (err) {
    // If erroneous line is different from the original one (i.e contains JSX tags) ignore it from the errors
    return errors._file.getLines()[err.line - 1] === orgLines[err.line - 1];

  });

  this._lines = orgLines;

  return errors;
};

module.exports = Checker;
