import sassport from 'sassport';
import sass from 'node-sass';

const dynamicImportModule = sassport.module('reference')
  .loaders({
    'dynamic': (_, options, done) => {
      let contents = options.context._exportMeta.contents.join('');

      let parsedFilePath;

      sass.renderSync({
        data: contents + `$_: ___(#{${options.absPath}});`,
        functions: {
          '___($value)': (value) => {
            parsedFilePath = value.getValue();

            return value;
          }
        }
      });

      return {
        file: parsedFilePath
      }
    }
  });

module.exports = dynamicImportModule;
