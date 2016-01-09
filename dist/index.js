'use strict';

var _sassport = require('sassport');

var _sassport2 = _interopRequireDefault(_sassport);

var _nodeSass = require('node-sass');

var _nodeSass2 = _interopRequireDefault(_nodeSass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dynamicImportModule = _sassport2.default.module('reference').loaders({
  'dynamic': function dynamic(_, options, done) {
    var contents = options.context._exportMeta.contents.join('');

    var parsedFilePath = undefined;

    _nodeSass2.default.renderSync({
      data: contents + ('$_: ___(#{' + options.absPath + '});'),
      functions: {
        '___($value)': function ___$value(value) {
          parsedFilePath = value.getValue();

          return value;
        }
      }
    });

    return {
      file: parsedFilePath
    };
  }
});

module.exports = dynamicImportModule;