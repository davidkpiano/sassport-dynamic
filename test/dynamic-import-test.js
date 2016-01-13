import assert from 'assert';
import sassport from 'sassport';
import dynamicLoader from '../dist/index.js';

describe('Sassport dynamic import loader', () => {
  it('should parse an import through Sass before importing the file', (done) => {
    sassport([ dynamicLoader ])
      .globals({
        '$test-foo': 'foo',
        '$test-bar': 'bar'
      })
      .render({
        data: `
          @import 'test/fixtures/#{$test-foo} !dynamic';
          @import 'test/fixtures/#{$test-bar} !dynamic';
        `,
        outputStyle: 'compressed'
      }, (err, result) => {
        err && console.error(err);

        done(assert.equal(result.css.toString(), '.foo{test:foo}.bar{test:bar}\n'));
      });
  });

  it('should parse an import through Sass before importing the file with multiple variables', (done) => {
    sassport([ dynamicLoader ])
      .globals({
        '$test-foo': 'foo',
        '$test-bar': 'bar'
      })
      .render({
        data: `
          @import 'test/fixtures/#{$test-foo}#{$test-bar} !dynamic';
        `,
        outputStyle: 'compressed'
      }, (err, result) => {
        err && console.error(err);

        done(assert.equal(result.css.toString(), '.foobar{test:foobar}\n'));
      });
  });
});

