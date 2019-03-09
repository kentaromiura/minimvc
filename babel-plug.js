'use strict';
var babel = require('@babel/core'),
  presetEnv = require('@babel/preset-env'),
  externalHelpers = require('@babel/plugin-external-helpers'),
  transformClasses = require('@babel/plugin-transform-classes');

module.exports = {
  src: function(module, callback) {
    module.src = babel.transform(module.src, {
      filename: module.name,
      presets: [presetEnv],
      plugins: [externalHelpers, transformClasses],
      retainLines: true
    }).code;
    callback(null, module);
  }
};
