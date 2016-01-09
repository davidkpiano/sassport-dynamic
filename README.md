# Sassport Dynamic Imports
Import dynamically in Sass using [Sassport](https://github.com/davidkpiano/sassport).

## Quick Start
First, install [Sassport](https://github.com/davidkpiano/sassport) and the Sassport-Dynamic module via NPM:

```bash
npm install sassport sassport-dynamic --save
```

Then, add any dynamic `$variables` that you want to use in your imports to Sassport using `.variables({...})`: 

```js
var sassport = require('sassport');
var sassportDynamic = require('sassport-dynamic');

sassport([ sassportDynamic ])
  .variables({
    '$theme': 'material'
  })
  .render({
    file: 'main.scss'
  }, function(err, result) {
    // output result
  });
```

Any variables that you defined in `.variables()` will now be interpolated with the `!dynamic` loader:

```scss
// main.scss
@import 'themes/#{$theme} !dynamic';
```

This will output the same result as if you had `@import 'themes/material';`.

